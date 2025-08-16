// finishes-list.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators ,ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService, ApiResponse, Finish, ProcessStep } from '../../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-finishes-list',
  standalone: true,
  imports:[CommonModule,ReactiveFormsModule],

  template: `
    <div class="finishes-container">
      <!-- العناوين الرئيسية -->
      <div class="header-section">
        <h1>إدارة التشطيبات</h1>
        <div class="header-actions">
          <button class="btn-primary" (click)="navigateToCreate()">
            إضافة تشطيب جديد
          </button>
          <button class="btn-save" (click)="saveAllChanges()" [disabled]="saving">
            {{ saving ? 'جاري الحفظ...' : 'حفظ جميع التغييرات' }}
          </button>
        </div>
      </div>

      <div *ngIf="loading" class="loading">
        <p>جاري التحميل...</p>
      </div>

      <form [formGroup]="mainForm" *ngIf="!loading && apiData" class="main-form">
        <!-- الصور الرئيسية -->
        <div class="section">
          <h2>الصور الرئيسية</h2>
          <div class="main-images-grid">
            <div class="image-upload-item" *ngFor="let imageControl of mainImagesControls; let i = index">
              <label class="image-label">الصورة الرئيسية {{ i + 1 }}</label>
              <div class="image-upload-container">
                <div class="current-image" *ngIf="getMainImageValue(i)">
                  <img [src]="getMainImageValue(i)" [alt]="'صورة رئيسية ' + (i + 1)">
                  <button type="button" class="btn-remove-image" (click)="removeMainImage(i)">×</button>
                </div>
                <div class="upload-area" [class.has-image]="getMainImageValue(i)">
                  <input type="file" [id]="'main-image-' + i" accept="image/*" 
                         (change)="onMainImageSelected($event, i)" class="file-input">
                  <label [for]="'main-image-' + i" class="upload-label">
                    <span *ngIf="!getMainImageValue(i)">اختر صورة جديدة</span>
                    <span *ngIf="getMainImageValue(i)">تغيير الصورة</span>
                  </label>
                </div>
                <input type="url" 
                       [formControlName]="getMainImageControlName(i)"
                       placeholder="أو أدخل رابط الصورة"
                       class="url-input">
              </div>
            </div>
          </div>
        </div>

        <!-- مراحل العملية -->
        <div class="section">
          <h2>مراحل العمل</h2>
          <div formArrayName="process">
            <div class="process-item" *ngFor="let processControl of processArray.controls; let i = index" 
                 [formGroupName]="i">
              <div class="process-header">
                <h4>المرحلة {{ i + 1 }}</h4>
                <button type="button" class="btn-remove" (click)="removeProcess(i)">حذف المرحلة</button>
              </div>
              
              <div class="process-form">
                <div class="form-row">
                  <div class="form-group">
                    <label>اسم المرحلة</label>
                    <input type="text" formControlName="name" class="form-control" 
                           placeholder="أدخل اسم المرحلة">
                  </div>
                  <div class="form-group">
                    <label>وصف المرحلة</label>
                    <textarea formControlName="description" class="form-control" 
                              rows="2" placeholder="أدخل وصف المرحلة"></textarea>
                  </div>
                </div>
                
                <div class="icon-upload">
                  <label>أيقونة المرحلة</label>
                  <div class="icon-container">
                    <div class="current-icon" *ngIf="getProcessIconValue(i)">
                      <img [src]="getProcessIconValue(i)" alt="أيقونة المرحلة">
                      <button type="button" class="btn-remove-image" (click)="removeProcessIcon(i)">×</button>
                    </div>
                    <div class="upload-area small" [class.has-image]="getProcessIconValue(i)">
                      <input type="file" [id]="'process-icon-' + i" accept="image/*" 
                             (change)="onProcessIconSelected($event, i)" class="file-input">
                      <label [for]="'process-icon-' + i" class="upload-label">
                        <span *ngIf="!getProcessIconValue(i)">اختر أيقونة</span>
                        <span *ngIf="getProcessIconValue(i)">تغيير الأيقونة</span>
                      </label>
                    </div>
                    <input type="url" formControlName="icon_image" 
                           placeholder="أو أدخل رابط الأيقونة" class="url-input">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button type="button" class="btn-add" (click)="addProcess()">إضافة مرحلة جديدة</button>
        </div>

        <!-- أنواع التشطيبات -->
        <div class="section">
          <h2>أنواع التشطيبات</h2>
          <div formArrayName="finishies">
            <div class="finish-item" *ngFor="let finishControl of finishiesArray.controls; let i = index" 
                 [formGroupName]="i">
              <div class="finish-header">
                <h4>{{ getFinishNameValue(i) || 'تشطيب جديد' }}</h4>
                <button type="button" class="btn-remove" (click)="removeFinish(i)">حذف التشطيب</button>
              </div>
              
              <div class="finish-form">
                <div class="form-row">
                  <div class="form-group">
                    <label>اسم التشطيب</label>
                    <input type="text" formControlName="name" class="form-control" 
                           placeholder="أدخل اسم التشطيب">
                  </div>
                </div>
                
                <!-- صورة التشطيب -->
                <div class="image-upload">
                  <label>صورة التشطيب</label>
                  <div class="image-container">
                    <div class="current-image" *ngIf="getFinishImageValue(i)">
                      <img [src]="getFinishImageValue(i)" alt="صورة التشطيب">
                      <button type="button" class="btn-remove-image" (click)="removeFinishImage(i)">×</button>
                    </div>
                    <div class="upload-area" [class.has-image]="getFinishImageValue(i)">
                      <input type="file" [id]="'finish-image-' + i" accept="image/*" 
                             (change)="onFinishImageSelected($event, i)" class="file-input">
                      <label [for]="'finish-image-' + i" class="upload-label">
                        <span *ngIf="!getFinishImageValue(i)">اختر صورة</span>
                        <span *ngIf="getFinishImageValue(i)">تغيير الصورة</span>
                      </label>
                    </div>
                    <input type="url" formControlName="image" 
                           placeholder="أو أدخل رابط الصورة" class="url-input">
                  </div>
                </div>
                
                <!-- خصائص التشطيب -->
                <div class="properties-section">
                  <label>خصائص التشطيب</label>
                  <div formArrayName="properties">
                    <div class="property-item" *ngFor="let propertyControl of getPropertiesArray(i).controls; let j = index">
                      <input type="text" [formControlName]="j" class="form-control" 
                             placeholder="أدخل خاصية">
                      <button type="button" class="btn-remove-small" (click)="removeProperty(i, j)">حذف</button>
                    </div>
                  </div>
                  <button type="button" class="btn-add-small" (click)="addProperty(i)">إضافة خاصية</button>
                </div>
              </div>
            </div>
          </div>
          <button type="button" class="btn-add" (click)="addFinish()">إضافة تشطيب جديد</button>
        </div>
      </form>

      <!-- رسالة عدم وجود بيانات -->
      <div class="no-data" *ngIf="!apiData && !loading">
        <p>لا توجد بيانات متاحة حالياً</p>
      </div>
    </div>
  `,
  styles: [`
    .finishes-container {
      padding: 20px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .header-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      flex-wrap: wrap;
      gap: 15px;
    }

    .header-section h1 {
      color: #333;
      font-size: 2rem;
      margin: 0;
    }

    .header-actions {
      display: flex;
      gap: 10px;
    }

    .btn-primary, .btn-save {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s;
    }

    .btn-primary {
      background-color: #007bff;
      color: white;
    }

    .btn-primary:hover {
      background-color: #0056b3;
    }

    .btn-save {
      background-color: #28a745;
      color: white;
    }

    .btn-save:hover {
      background-color: #218838;
    }

    .btn-save:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }

    .main-form {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .section {
      padding: 30px;
      border-bottom: 1px solid #eee;
    }

    .section:last-child {
      border-bottom: none;
    }

    .section h2 {
      color: #333;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #007bff;
    }

    /* الصور الرئيسية */
    .main-images-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }

    .image-upload-item {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 15px;
      background: #fafafa;
    }

    .image-label {
      display: block;
      font-weight: bold;
      margin-bottom: 10px;
      color: #333;
    }

    .current-image {
      position: relative;
      margin-bottom: 10px;
    }

    .current-image img {
      width: 100%;
      height: 150px;
      object-fit: cover;
      border-radius: 6px;
      border: 1px solid #ddd;
    }

    .btn-remove-image {
      position: absolute;
      top: 5px;
      right: 5px;
      background: rgba(220, 53, 69, 0.9);
      color: white;
      border: none;
      border-radius: 50%;
      width: 25px;
      height: 25px;
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
    }

    .upload-area {
      border: 2px dashed #ddd;
      border-radius: 6px;
      text-align: center;
      padding: 20px;
      margin-bottom: 10px;
      transition: all 0.3s;
    }

    .upload-area.has-image {
      padding: 10px;
    }

    .upload-area:hover {
      border-color: #007bff;
      background-color: #f8f9fa;
    }

    .file-input {
      display: none;
    }

    .upload-label {
      display: inline-block;
      padding: 8px 16px;
      background-color: #007bff;
      color: white;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .upload-label:hover {
      background-color: #0056b3;
    }

    .url-input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }

    /* مراحل العملية */
    .process-item {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
      background: #f9f9f9;
    }

    .process-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }

    .process-header h4 {
      margin: 0;
      color: #007bff;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 15px;
      margin-bottom: 15px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
    }

    .form-group label {
      margin-bottom: 5px;
      font-weight: bold;
      color: #333;
    }

    .form-control {
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }

    .form-control:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
    }

    .icon-upload {
      margin-top: 10px;
    }

    .icon-container {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .upload-area.small {
      padding: 10px;
      min-width: 120px;
    }

    .current-icon img {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 4px;
    }

    /* أنواع التشطيبات */
    .finish-item {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
      background: #f9f9f9;
    }

    .finish-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }

    .finish-header h4 {
      margin: 0;
      color: #28a745;
    }

    .image-upload, .properties-section {
      margin-top: 15px;
    }

    .property-item {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
      align-items: center;
    }

    .property-item .form-control {
      flex: 1;
    }

    /* الأزرار */
    .btn-add {
      background-color: #28a745;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 10px;
    }

    .btn-add:hover {
      background-color: #218838;
    }

    .btn-add-small {
      background-color: #17a2b8;
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
    }

    .btn-remove {
      background-color: #dc3545;
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
    }

    .btn-remove-small {
      background-color: #dc3545;
      color: white;
      border: none;
      padding: 4px 8px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      white-space: nowrap;
    }

    .loading, .no-data {
      text-align: center;
      padding: 40px;
      color: #666;
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
      
      .main-images-grid {
        grid-template-columns: 1fr;
      }
      
      .header-section {
        flex-direction: column;
        align-items: stretch;
      }
      
      .header-actions {
        justify-content: center;
      }
    }
  `]
})
export class FinishesListComponent implements OnInit {
  mainForm: FormGroup;
  apiData: ApiResponse | null = null;
  loading = true;
  saving = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.mainForm = this.createMainForm();
  }

  ngOnInit(): void {
    this.loadFinishes();
  }

  createMainForm(): FormGroup {
    return this.fb.group({
      main_image: [''],
      main_image_2: [''],
      main_image_3: [''],
      main_image_4: [''],
      process: this.fb.array([]),
      finishies: this.fb.array([])
    });
  }

  get mainImagesControls(): string[] {
    return ['main_image', 'main_image_2', 'main_image_3', 'main_image_4'];
  }

  get processArray(): FormArray {
    return this.mainForm.get('process') as FormArray;
  }

  get finishiesArray(): FormArray {
    return this.mainForm.get('finishies') as FormArray;
  }

  loadFinishes(): void {
    this.loading = true;
    this.apiService.getFinishes().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.apiData = data[0];
          this.populateForm(this.apiData);
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('خطأ في تحميل البيانات:', error);
        this.loading = false;
      }
    });
  }

  populateForm(data: ApiResponse): void {
    // ملء الصور الرئيسية
    this.mainForm.patchValue({
      main_image: data.main_image || '',
      main_image_2: data.main_image_2 || '',
      main_image_3: data.main_image_3 || '',
      main_image_4: data.main_image_4 || ''
    });

    // ملء مراحل العملية
    const processArray = this.processArray;
    processArray.clear();
    data.process.forEach(process => {
      processArray.push(this.createProcessGroup(process));
    });

    // ملء التشطيبات
    const finishiesArray = this.finishiesArray;
    finishiesArray.clear();
    data.finishies.forEach(finish => {
      finishiesArray.push(this.createFinishGroup(finish));
    });
  }

  createProcessGroup(process: ProcessStep): FormGroup {
    return this.fb.group({
      _id: [process._id || ''],
      name: [process.name || '', Validators.required],
      description: [process.description || ''],
      icon_image: [process.icon_image || '']
    });
  }

  createFinishGroup(finish: Finish): FormGroup {
    const propertiesArray = this.fb.array(
      finish.properties.map(prop => this.fb.control(prop))
    );

    return this.fb.group({
      _id: [finish._id || ''],
      name: [finish.name || '', Validators.required],
      image: [finish.image || ''],
      properties: propertiesArray
    });
  }

  // Helper methods للوصول للقيم
  getMainImageControlName(index: number): string {
    return this.mainImagesControls[index];
  }

  getMainImageValue(index: number): string {
    return this.mainForm.get(this.mainImagesControls[index])?.value || '';
  }

  getProcessIconValue(index: number): string {
    return this.processArray.at(index)?.get('icon_image')?.value || '';
  }

  getFinishNameValue(index: number): string {
    return this.finishiesArray.at(index)?.get('name')?.value || '';
  }

  getFinishImageValue(index: number): string {
    return this.finishiesArray.at(index)?.get('image')?.value || '';
  }

  getPropertiesArray(finishIndex: number): FormArray {
    return this.finishiesArray.at(finishIndex)?.get('properties') as FormArray;
  }

  // Image handling methods
  onMainImageSelected(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      this.uploadImage(file, (url) => {
        this.mainForm.get(this.mainImagesControls[index])?.setValue(url);
      });
    }
  }

  onProcessIconSelected(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      this.uploadImage(file, (url) => {
        this.processArray.at(index)?.get('icon_image')?.setValue(url);
      });
    }
  }

  onFinishImageSelected(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      this.uploadImage(file, (url) => {
        this.finishiesArray.at(index)?.get('image')?.setValue(url);
      });
    }
  }

  uploadImage(file: File, callback: (url: string) => void): void {
    // يمكنك تخصيص هذه الطريقة حسب API الخاص برفع الصور
    const formData = new FormData();
    formData.append('image', file);
    
    // مثال لرفع الصورة - يجب تعديل هذا حسب API الخاص بك
    this.apiService.uploadImage(formData).subscribe({
      next: (response) => {
        if (response && response.imageUrl) {
          callback(response.imageUrl);
        }
      },
      error: (error) => {
        console.error('خطأ في رفع الصورة:', error);
        // يمكنك عرض رسالة خطأ للمستخدم
      }
    });
  }

  // Remove methods
  removeMainImage(index: number): void {
    this.mainForm.get(this.mainImagesControls[index])?.setValue('');
  }

  removeProcessIcon(index: number): void {
    this.processArray.at(index)?.get('icon_image')?.setValue('');
  }

  removeFinishImage(index: number): void {
    this.finishiesArray.at(index)?.get('image')?.setValue('');
  }

  // Add/Remove methods
  addProcess(): void {
    this.processArray.push(this.createProcessGroup({
      name: '',
      description: '',
      icon_image: ''
    }));
  }

  removeProcess(index: number): void {
    this.processArray.removeAt(index);
  }

  addFinish(): void {
    this.finishiesArray.push(this.createFinishGroup({
      name: '',
      image: '',
      properties: ['']
    }));
  }

  removeFinish(index: number): void {
    this.finishiesArray.removeAt(index);
  }

  addProperty(finishIndex: number): void {
    this.getPropertiesArray(finishIndex).push(this.fb.control(''));
  }

  removeProperty(finishIndex: number, propertyIndex: number): void {
    const propertiesArray = this.getPropertiesArray(finishIndex);
    if (propertiesArray.length > 1) {
      propertiesArray.removeAt(propertyIndex);
    }
  }

  saveAllChanges(): void {
    if (this.mainForm.valid) {
      this.saving = true;
      const formValue = this.mainForm.value;

      // إعداد البيانات للإرسال
      const updateData = {
        main_image: formValue.main_image,
        main_image_2: formValue.main_image_2,
        main_image_3: formValue.main_image_3,
        main_image_4: formValue.main_image_4,
        process: formValue.process.map((p: any) => ({
          _id: p._id,
          name: p.name,
          description: p.description,
          icon_image: p.icon_image
        })),
        finishies: formValue.finishies.map((f: any) => ({
          _id: f._id,
          name: f.name,
          image: f.image,
          properties: f.properties.filter((prop: string) => prop.trim() !== '')
        }))
      };

      // يجب إنشاء API endpoint لحفظ جميع البيانات مرة واحدة
      this.apiService.updateAllFinishesData(updateData).subscribe({
        next: (response) => {
          console.log('تم حفظ التغييرات بنجاح:', response);
          this.saving = false;
          alert('تم حفظ جميع التغييرات بنجاح!');
        },
        error: (error) => {
          console.error('خطأ في حفظ التغييرات:', error);
          this.saving = false;
          alert('حدث خطأ أثناء حفظ التغييرات. يرجى المحاولة مرة أخرى.');
        }
      });
    } else {
      alert('يرجى التأكد من صحة جميع البيانات المدخلة.');
    }
  }

  navigateToCreate(): void {
    this.router.navigate(['/finishes/create']);
  }
}
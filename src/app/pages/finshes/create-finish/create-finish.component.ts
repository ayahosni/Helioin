// create-finish.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService,Finish } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({

  selector: 'app-create-finish',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  template: `
    <div class="create-finish-container">
      <div class="header">
        <h1>إضافة تشطيب جديد</h1>
        <button type="button" class="btn-back" (click)="goBack()">رجوع</button>
      </div>

      <form [formGroup]="finishForm" (ngSubmit)="onSubmit()" class="finish-form">
        <div class="form-group">
          <label for="name">اسم التشطيب *</label>
          <input 
            type="text" 
            id="name" 
            formControlName="name"
            class="form-control"
            [class.error]="isFieldInvalid('name')"
            placeholder="أدخل اسم التشطيب">
          <div class="error-message" *ngIf="isFieldInvalid('name')">
            اسم التشطيب مطلوب
          </div>
        </div>

        <div class="form-group">
          <label for="image">رابط الصورة *</label>
          <input 
            type="url" 
            id="image" 
            formControlName="image"
            class="form-control"
            [class.error]="isFieldInvalid('image')"
            placeholder="https://example.com/image.jpg">
          <div class="error-message" *ngIf="isFieldInvalid('image')">
            رابط الصورة مطلوب ويجب أن يكون رابط صحيح
          </div>
        </div>

        <!-- معاينة الصورة -->
        <div class="image-preview" *ngIf="finishForm.get('image')?.value">
          <img [src]="finishForm.get('image')?.value" alt="معاينة" (error)="onImageError()">
        </div>

        <div class="form-group">
          <label>الخصائص</label>
          <div formArrayName="properties">
            <div class="property-item" *ngFor="let property of propertiesArray.controls; let i = index">
              <input 
                type="text" 
                [formControlName]="i"
                class="form-control"
                placeholder="أدخل خاصية">
              <button type="button" class="btn-remove" (click)="removeProperty(i)">
                حذف
              </button>
            </div>
          </div>
          <button type="button" class="btn-add" (click)="addProperty()">
            إضافة خاصية
          </button>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-submit" [disabled]="!finishForm.valid || submitting">
            {{ submitting ? 'جاري الحفظ...' : 'حفظ التشطيب' }}
          </button>
          <button type="button" class="btn-cancel" (click)="goBack()">
            إلغاء
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .create-finish-container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }

    .header h1 {
      color: #333;
      font-size: 1.8rem;
    }

    .btn-back {
      background-color: #6c757d;
      color: white;
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
    }

    .btn-back:hover {
      background-color: #5a6268;
    }

    .finish-form {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
      color: #333;
    }

    .form-control {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
      box-sizing: border-box;
    }

    .form-control:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
    }

    .form-control.error {
      border-color: #dc3545;
    }

    .error-message {
      color: #dc3545;
      font-size: 14px;
      margin-top: 5px;
    }

    .image-preview {
      margin-bottom: 20px;
      text-align: center;
    }

    .image-preview img {
      max-width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 8px;
      border: 1px solid #ddd;
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

    .btn-remove {
      background-color: #dc3545;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 4px;
      cursor: pointer;
      white-space: nowrap;
    }

    .btn-remove:hover {
      background-color: #c82333;
    }

    .btn-add {
      background-color: #28a745;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 10px;
    }

    .btn-add:hover {
      background-color: #218838;
    }

    .form-actions {
      display: flex;
      gap: 15px;
      justify-content: flex-end;
      margin-top: 30px;
    }

    .btn-submit {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }

    .btn-submit:hover {
      background-color: #0056b3;
    }

    .btn-submit:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }

    .btn-cancel {
      background-color: #6c757d;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }

    .btn-cancel:hover {
      background-color: #5a6268;
    }
  `]
})
export class CreateFinishComponent implements OnInit {
  finishForm: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.finishForm = this.createForm();
  }

  ngOnInit(): void {
    // إضافة خاصية واحدة افتراضية
    this.addProperty();
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      image: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
      properties: this.fb.array([])
    });
  }

  get propertiesArray(): FormArray {
    return this.finishForm.get('properties') as FormArray;
  }

  addProperty(): void {
    this.propertiesArray.push(this.fb.control(''));
  }

  removeProperty(index: number): void {
    if (this.propertiesArray.length > 1) {
      this.propertiesArray.removeAt(index);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.finishForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onImageError(): void {
    console.log('خطأ في تحميل الصورة');
  }

  onSubmit(): void {
    if (this.finishForm.valid) {
      this.submitting = true;
      
      const formValue = this.finishForm.value;
      const finishData: Omit<Finish, '_id'> = {
        name: formValue.name.trim(),
        image: formValue.image.trim(),
        properties: formValue.properties.filter((prop: string) => prop.trim() !== '')
      };

      this.apiService.createFinish(finishData).subscribe({
        next: (response) => {
          console.log('تم إنشاء التشطيب بنجاح:', response);
          this.router.navigate(['/finishes']);
        },
        error: (error) => {
          console.error('خطأ في إنشاء التشطيب:', error);
          this.submitting = false;
          alert('حدث خطأ أثناء حفظ التشطيب. يرجى المحاولة مرة أخرى.');
        }
      });
    } else {
      // تحديد الحقول غير الصحيحة
      Object.keys(this.finishForm.controls).forEach(key => {
        const control = this.finishForm.get(key);
        if (control && control.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/finishes']);
  }
}
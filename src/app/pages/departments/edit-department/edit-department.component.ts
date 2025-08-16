import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-department',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css']
})
export class EditDepartmentComponent implements OnInit {
  id!: string;
  department: any = {};

  // للصور الجديدة
  selectedFiles: File[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.loadDepartment();
  }

  loadDepartment() {
    // جلب بيانات العقار من API
    this.apiService.getDepartmentById(this.id).subscribe(
      (res: any) => {
        this.department = res;
      },
      (err) => console.error(err)
    );
  }

  onFileChange(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  updateDepartment(form: NgForm) {
    if (form.invalid) return;

    const formData = new FormData();
    Object.keys(this.department).forEach(key => {
      if (this.department[key] != null) {
        formData.append(key, this.department[key]);
      }
    });

    // إضافة الصور الجديدة
    this.selectedFiles.forEach(file => formData.append('images', file));

    this.apiService.editDepartment(this.id, formData).subscribe(
      res => {
        alert('تم تحديث العقار بنجاح!');
        this.router.navigate(['/departments']);
      },
      err => {
        console.error(err);
        alert('حدث خطأ أثناء التحديث.');
      }
    );
  }
}

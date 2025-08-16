import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-create-department',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.css']
})
export class CreateDepartmentComponent implements OnInit {
  title = '';
  description = '';
  price!: number;
  area!: number;
  rooms!: number;
  bathrooms!: number;
  type = 'sale';

  // بيانات جديدة بناء على نموذج الباك
  status_of_sale = '';
  location = '';
  designer = '';
  installment = '';
  note = '';
  features: string[] = [];
  available_dates: string[] = [];

  images: File[] = [];

  constructor(
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    // لا يوجد شيء يخص الأحياء
  }

  onFileChange(event: any) {
    this.images = Array.from(event.target.files);
  }

  addFeature(feature: string) {
    if (feature && !this.features.includes(feature)) {
      this.features.push(feature);
    }
  }

  removeFeature(index: number) {
    this.features.splice(index, 1);
  }

  addAvailableDate(date: string) {
    if (date && !this.available_dates.includes(date)) {
      this.available_dates.push(date);
    }
  }

  removeAvailableDate(index: number) {
    this.available_dates.splice(index, 1);
  }

  createDepartment() {
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('status_of_sale', this.status_of_sale);
    formData.append('price', this.price.toString());
    formData.append('number_of_bathrooms', this.bathrooms.toString());
    formData.append('number_of_bedrooms', this.rooms.toString());
    formData.append('space', this.area.toString());
    formData.append('type', this.type);
    formData.append('location', this.location);
    formData.append('designer', this.designer);
    formData.append('installment', this.installment);
    formData.append('note', this.note);

    formData.append('features', JSON.stringify(this.features));
    this.available_dates.forEach(date => {
      formData.append('available_dates', date);
    });

    // الصور (4 صور كحد أقصى)
    for (let i = 0; i < this.images.length && i < 4; i++) {
      formData.append(`image_${i + 1}`, this.images[i]);
    }

    this.api.createDepartment(formData).subscribe({
      next: () => {
        alert('Department Created!');
        this.router.navigate(['/departments']);
      },
      error: (err) => {
        console.error('Error creating department:', err);
        alert('Error creating department: ' + (err.error?.message || err.message));
      }
    });
  }
}

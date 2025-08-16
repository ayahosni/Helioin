import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-partner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-partner.component.html',
  styleUrls: ['./create-partner.component.css']
})
export class CreatePartnerComponent {
  name = '';
  description = '';
  imageFile: File | null = null;

  constructor(private apiService: ApiService, private router: Router) {}

  onFileChange(event: any) {
    this.imageFile = event.target.files[0];
  }

  createPartner() {
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('description', this.description);
    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    this.apiService.createPartner(formData).subscribe({
      next: () => {
        alert('تم إضافة الشريك بنجاح');
        this.router.navigate(['/partners']);
      },
      error: (err) => alert(err.error?.message || 'خطأ أثناء الإضافة')
    });
  }
}

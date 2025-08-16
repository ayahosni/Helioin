import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-realestate-forms-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './realestate-forms-list.component.html',
  styleUrls: ['./realestate-forms-list.component.css']
})
export class RealestateFormsListComponent implements OnInit {
  forms: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadForms();
  }

  loadForms() {
    this.api.getAllRealestateForms().subscribe({
      next: (data) => this.forms = data,
      error: (err) => console.error(err)
    });
  }

  deleteForm(id: string) {
    if (confirm('هل أنت متأكد أنك تريد حذف هذا الطلب؟')) {
      this.api.deleteRealestateForm(id).subscribe({
        next: () => this.forms = this.forms.filter(f => f._id !== id),
        error: (err) => console.error(err)
      });
    }
  }

  getImageUrl(image: string) {
    if (!image) return '';
    if (image.startsWith('http') || image.startsWith('https')) return image;
    const match = image.match(/\/uploads\/.+$/);
    return match ? match[0] : '';
  }
}

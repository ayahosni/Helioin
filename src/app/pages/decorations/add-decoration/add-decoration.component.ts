import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-decoration',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-decoration.component.html',
  styleUrls: ['./add-decoration.component.css']
})
export class AddDecorationComponent {
  name = '';
  description = '';
  category = '';
  files: { [key: string]: File } = {};

  constructor(private api: ApiService, private router: Router) {}

  onFileChange(event: any, field: string) {
    if (event.target.files.length > 0) {
      this.files[field] = event.target.files[0];
    }
  }

  createDecoration() {
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('category', this.category);

    if (this.files['image_1']) formData.append('image_1', this.files['image_1']);
    if (this.files['image_2']) formData.append('image_2', this.files['image_2']);
    if (this.files['image_3']) formData.append('image_3', this.files['image_3']);

    this.api.createDecoration(formData).subscribe({
      next: () => this.router.navigate(['/decorations']),
      error: (err) => console.error(err)
    });
  }
}

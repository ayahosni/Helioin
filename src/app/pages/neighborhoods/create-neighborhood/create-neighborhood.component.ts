import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone:true,
  imports:[CommonModule, FormsModule],
  selector: 'app-create-neighborhood',
  templateUrl: './create-neighborhood.component.html',
  styleUrls: ['./create-neighborhood.component.css']
})
export class CreateNeighborhoodComponent {
  titel = '';
  description = '';
  features = [];
  images: File[] = [];
    neighborhood_id = '';


  constructor(private api: ApiService, private router: Router) {}

  onFileSelected(event: any) {
    this.images = Array.from(event.target.files);
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.titel);
    formData.append('description', this.description);
    formData.append('location', this.features.join(', '));
    this.images.forEach(file => formData.append('images', file));

    this.api.createNeighborhood(formData).subscribe({
      next: () => {
        alert('✅ Neighborhood created successfully!');
        this.router.navigate(['/neighborhoods']);
      },
      error: err => alert('❌ Error: ' + err.message)
    });
  }
}

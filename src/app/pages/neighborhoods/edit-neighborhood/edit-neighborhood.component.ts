import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-edit-neighborhood',
  templateUrl: './edit-neighborhood.component.html'
})
export class EditNeighborhoodComponent implements OnInit {
  id!: string;
  name = '';
  description = '';
  location = '';
  images: File[] = [];

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.api.getNeighborhoodById(this.id).subscribe(data => {
      this.name = data.name;
      this.description = data.description;
      this.location = data.location;
    });
  }

  onFileSelected(event: any) {
    this.images = Array.from(event.target.files);
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('location', this.location);
    this.images.forEach(file => formData.append('images', file));

    this.api.editNeighborhood(this.id, formData).subscribe({
      next: () => {
        alert('✅ Neighborhood updated!');
        this.router.navigate(['/neighborhoods']);
      },
      error: err => alert('❌ Error: ' + err.message)
    });
  }
}

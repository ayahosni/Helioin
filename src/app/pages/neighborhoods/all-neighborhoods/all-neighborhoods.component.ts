import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  standalone: true,
  imports: [CommonModule,RouterLink],
  selector: 'app-all-neighborhoods',
  templateUrl: './all-neighborhoods.component.html'
})
export class AllNeighborhoodsComponent implements OnInit {
  neighborhoods: any[] = [];
  loading = true;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadNeighborhoods();
  }

  loadNeighborhoods() {
    this.api.getAllNeighborhoods().subscribe({
      next: data => {
        this.neighborhoods = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('❌ Failed to load neighborhoods');
      }
    });
  }

  deleteNeighborhood(id: string) {
    if (confirm('Are you sure you want to delete this neighborhood?')) {
      this.api.deleteNeighborhood(id).subscribe(() => {
        this.loadNeighborhoods();
      });
    }
  }
}

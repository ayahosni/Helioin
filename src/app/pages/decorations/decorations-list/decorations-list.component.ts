import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-decorations-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './decorations-list.component.html',
  styleUrls: ['./decorations-list.component.css']
})
export class DecorationsListComponent implements OnInit {
  decorations: any[] = [];

  constructor(private api: ApiService, public router: Router) {}

  ngOnInit() {
    this.loadDecorations();
  }

  loadDecorations() {
    this.api.getAllDecorations().subscribe({
      next: (data) => this.decorations = data,
      error: (err) => console.error(err)
    });
  }

  deleteDecoration(id: string) {
    if (confirm('هل أنت متأكد أنك تريد حذف هذا الديكور؟')) {
      this.api.deleteDecoration(id).subscribe({
        next: () => this.decorations = this.decorations.filter(d => d._id !== id),
        error: (err) => console.error(err)
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

interface StatItem {
  key: string;
  value: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats: StatItem[] = [];
  loading: boolean = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats() {
    this.apiService.getAllStats().subscribe({
      next: (data) => {
        // تحويل object إلى array مع type-safe
        this.stats = Object.keys(data).map(key => ({
          key: key,
          value: Number(data[key])
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching stats', err);
        this.loading = false;
      }
    });
  }
}

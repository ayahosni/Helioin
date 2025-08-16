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

  // خريطة تحويل الـ keys للعربي
  keyMap: { [key: string]: string } = {
    departments: 'الأقسام',
    requests: 'الطلبات',
    partners: 'الشركاء',
    finishes: 'التشطيبات',
    contacts: 'جهات الاتصال',
    decorations: 'الديكورات',
    formsRealestate: 'نماذج طلب لعرض العقارات',
    formDecorations: 'نماذج  طلب لعمل الديكورات',
    finishForms: 'نماذج طلب لعمل التشطيب',
    bookings: ' الحجوزات لمعاينة عقار'
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats() {
    this.apiService.getAllStats().subscribe({
      next: (data) => {
        // تحويل object إلى array مع ترجمة المفاتيح للعربي
        this.stats = Object.keys(data).map(key => ({
          key: this.keyMap[key] || key, // لو مالقيتش ترجمة خلي الاسم الأصلي
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

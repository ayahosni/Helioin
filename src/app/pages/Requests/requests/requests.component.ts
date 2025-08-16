import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  requests: any[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.fetchRequests();
  }

  fetchRequests() {
    this.isLoading = true;
    this.apiService.getAllRequests().subscribe({
      next: (res) => {
        this.requests = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'خطأ أثناء جلب الطلبات';
        this.isLoading = false;
      }
    });
  }

  goToEdit(id: string) {
    this.router.navigate(['/requests/edit', id]);
  }

  deleteRequest(id: string) {
    if (confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
      this.apiService.deleteRequest(id).subscribe({
        next: () => this.fetchRequests(),
        error: (err) => alert(err.error?.message || 'خطأ أثناء الحذف')
      });
    }
  }
}

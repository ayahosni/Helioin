import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-partners',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './all-partners.component.html',
  styleUrls: ['./all-partners.component.css']
})
export class AllPartnersComponent implements OnInit {
  partners: any[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadPartners();
  }

  loadPartners() {
    this.isLoading = true;
    this.apiService.getAllPartners().subscribe({
      next: (res) => {
        this.partners = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'خطأ في جلب الشركاء';
        this.isLoading = false;
      }
    });
  }

  goToEdit(id: string) {
    this.router.navigate(['/partners/edit', id]);
  }

  deletePartner(id: string) {
    if (confirm('هل أنت متأكد من الحذف؟')) {
      this.apiService.deletePartner(id).subscribe({
        next: () => this.loadPartners(),
        error: (err) => alert(err.error?.message || 'خطأ أثناء الحذف')
      });
    }
  }
}

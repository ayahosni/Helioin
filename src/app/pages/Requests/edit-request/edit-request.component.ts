import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-edit-request',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-request.component.html',
  styleUrls: ['./edit-request.component.css']
})
export class EditRequestComponent implements OnInit {
  request: any = null;
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getRequestById(id).subscribe({
        next: (res) => {
          this.request = res;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'حدث خطأ أثناء تحميل بيانات الطلب.';
          this.isLoading = false;
        }
      });
    }
  }

  onSubmit(): void {
    this.apiService.editRequest(this.request._id, this.request).subscribe({
      next: () => {
        alert('تم تحديث الطلب بنجاح!');
        this.router.navigate(['/requests']);
      },
      error: () => {
        alert('حدث خطأ أثناء تحديث الطلب.');
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/requests']);
  }
}

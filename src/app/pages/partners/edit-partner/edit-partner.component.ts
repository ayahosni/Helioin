import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-partner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-partner.component.html',
  styleUrls: ['./edit-partner.component.css']
})
export class EditPartnerComponent implements OnInit {
  partnerId = '';
  name = '';
  description = '';
  imageFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.partnerId = this.route.snapshot.paramMap.get('id') || '';
    this.apiService.getAllPartners().subscribe((partners) => {
      const partner = partners.find((p: any) => p._id === this.partnerId);
      if (partner) {
        this.name = partner.name;
        this.description = partner.description;
      }
    });
  }

  onFileChange(event: any) {
    this.imageFile = event.target.files[0];
  }

  updatePartner() {
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('description', this.description);
    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    this.apiService.editPartner(this.partnerId, formData).subscribe({
      next: () => {
        alert('تم تعديل الشريك بنجاح');
        this.router.navigate(['/partners']);
      },
      error: (err) => alert(err.error?.message || 'خطأ أثناء التعديل')
    });
  }
}

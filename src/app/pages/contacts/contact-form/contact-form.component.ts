import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contact: any = {
    gmail: '',
    phone: '',
    location: '',
    facebook_link: '',
    instagram_link: '',
    twitter_link: '',
    linkedin_link: ''
  };

  isEdit = false;
  contactId?: string;

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // الحصول على الـ id من الرابط لمعرفة إذا كان تعديل
    this.contactId = this.route.snapshot.paramMap.get('id') || undefined;
    this.isEdit = !!this.contactId;

    if (this.isEdit && this.contactId) {
      this.api.getContactById(this.contactId).subscribe({
        next: (data) => this.contact = data,
        error: (err) => console.error(err)
      });
    }
  }

  saveContact() {
    if (this.isEdit && this.contactId) {
      // تحديث جهة الاتصال
      this.api.updateContact(this.contactId, this.contact).subscribe({
        next: () => this.router.navigate(['/contacts']),
        error: (err) => console.error(err)
      });
    } else {
      // إنشاء جهة اتصال جديدة
      this.api.createContact(this.contact).subscribe({
        next: () => this.router.navigate(['/contacts']),
        error: (err) => console.error(err)
      });
    }
  }
}

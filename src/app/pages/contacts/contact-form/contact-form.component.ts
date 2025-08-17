import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  @Input() contact: any = {
    gmail: '',
    phone: '',
    location: '',
    facebook_link: '',
    instagram_link: '',
    twitter_link: '',
    linkedin_link: ''
  };
  @Input() isEdit = false;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {}

saveContact() {
  if (this.isEdit && this.contactId) {
    // تمرير contactId مع بيانات الاتصال
    this.api.updateContact(this.contactId, this.contact).subscribe({
      next: () => this.router.navigate(['/contacts']),
      error: (err) => console.error(err)
    });
  } else {
    this.api.createContact(this.contact).subscribe({
      next: () => this.router.navigate(['/contacts']),
      error: (err) => console.error(err)
    });
  }
}

}

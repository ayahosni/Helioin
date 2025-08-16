import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  contact: any = {
    gmail: '',
    phone: '',
    location: '',
    facebook_link: '',
    instagram_link: '',
    twitter_link: '',
    linkedin_link: ''
  };

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const contactId = this.route.snapshot.paramMap.get('id');
    if (contactId) {
      this.api.getContactById(contactId).subscribe({
        next: (data) => this.contact = data,
        error: (err) => console.error(err)
      });
    }
  }

  saveContact() {
    this.api.updateContact(this.contact).subscribe({
      next: () => this.router.navigate(['/contacts']),
      error: (err) => console.error(err)
    });
  }
}

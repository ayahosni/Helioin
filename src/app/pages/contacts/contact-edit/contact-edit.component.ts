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

  contactId: string | null = null;   

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.contactId = this.route.snapshot.paramMap.get('id');
    if (this.contactId) {
      this.api.getContactById(this.contactId).subscribe({
        next: (data) => this.contact = data,
        error: (err) => console.error(err)
      });
    }
  }

saveContact() {
  if (this.contactId) {
    this.api.updateContact(this.contactId, this.contact).subscribe({
      next: () => this.router.navigate(['/contacts']),
      error: (err) => console.error(err)
    });
  }
}


}

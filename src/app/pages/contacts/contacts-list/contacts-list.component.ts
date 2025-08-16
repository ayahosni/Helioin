import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  contacts: any[] = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts() {
    this.api.getAllContacts().subscribe({
      next: (data) => this.contacts = data,
      error: (err) => console.error(err)
    });
  }

  deleteContact(id: string) {
    if (confirm('هل تريد حذف جهة الاتصال؟')) {
      this.api.deleteContact(id).subscribe({
        next: () => this.contacts = this.contacts.filter(c => c._id !== id),
        error: (err) => console.error(err)
      });
    }
  }

  editContact(contact: any) {
    this.router.navigate(['/contacts/edit', contact._id]);
  }
}

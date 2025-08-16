import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  notifications = [
    { _id: 1, message: 'New booking request', createdAt: new Date(), isRead: false },
    { _id: 2, message: 'New user registered', createdAt: new Date(), isRead: true }
  ];
  unreadCount = this.notifications.filter(n => !n.isRead).length;

  notifDropdownOpen = false;
  userDropdownOpen = false;

  toggleNotifications(event: Event) {
    event.stopPropagation();
    this.notifDropdownOpen = !this.notifDropdownOpen;
    this.userDropdownOpen = false;
  }

  toggleUserDropdown(event: Event) {
    event.stopPropagation();
    this.userDropdownOpen = !this.userDropdownOpen;
    this.notifDropdownOpen = false;
  }

  markAsRead(id: number) {
    const notif = this.notifications.find(n => n._id === id);
    if (notif) {
      notif.isRead = true;
      this.unreadCount = this.notifications.filter(n => !n.isRead).length;
    }
  }

  logout() {
    console.log('Logout clicked');
  }
}

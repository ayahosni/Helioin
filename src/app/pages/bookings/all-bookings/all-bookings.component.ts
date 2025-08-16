import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../../app/services/api.service'; // صحح المسار حسب مشروعك
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-all-bookings',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.css']
})
export class AllBookingsComponent implements OnInit {
  bookings: any[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getAllBookings().subscribe({
      next: (res) => {
        // إذا كانت الاستجابة تحتوي مفتاح 'bookings' استخدميه، وإلا افترضي أنها مصفوفة مباشرة
        this.bookings = res.bookings || res;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load bookings.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  deleteBooking(id: string) {
    if (confirm('Are you sure you want to delete this booking?')) {
      this.apiService.deleteBooking(id).subscribe({
        next: () => {
          this.bookings = this.bookings.filter(b => b._id !== id);
          alert('Booking deleted successfully!');
        },
        error: () => {
          alert('Failed to delete booking.');
        }
      });
    }
  }
}

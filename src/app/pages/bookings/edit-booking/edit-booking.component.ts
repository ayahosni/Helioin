import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../app/services/api.service';

@Component({
  selector: 'app-edit-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditBookingComponent implements OnInit {
  booking: any = {};
  departments: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    const bookingId = this.route.snapshot.paramMap.get('id');

    if (bookingId) {
      // تحميل جميع الأقسام
      this.apiService.getAllDepartments().subscribe({
        next: (depts) => this.departments = depts,
        error: () => this.errorMessage = 'Failed to load departments'
      });

      // تحميل بيانات الحجز
      this.apiService.getAllBookings().subscribe({
        next: (res) => {
          this.booking = res.find((b: any) => b._id === bookingId) || {};
          if (!this.booking._id) {
            this.errorMessage = 'Booking not found';
          }
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Failed to load booking data.';
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'Invalid booking ID.';
      this.isLoading = false;
    }
  }

  onDepartmentChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const selectedDept = this.departments.find(d => d._id === select.value);
    this.booking.department_name = selectedDept ? selectedDept.title : '';
  }

  onSubmit() {
    if (!this.booking || !this.booking._id) return;

    const updateData = {
      first_name: this.booking.first_name,
      last_name: this.booking.last_name,
      email: this.booking.email,
      phone: this.booking.phone,
      date: this.booking.date,
      note: this.booking.note,
      department_id: this.booking.department_id,
      department_name: this.booking.department_name,
      number_of_travellers: this.booking.number_of_travellers
    };

    this.apiService.editBooking(this.booking._id, updateData).subscribe({
      next: () => {
        alert('Booking updated successfully!');
        this.router.navigate(['/bookings']);
      },
      error: () => {
        alert('Failed to update booking.');
      }
    });
  }

  onCancel() {
    this.router.navigate(['/bookings']);
  }
}

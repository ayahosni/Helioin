import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../../app/services/api.service'; // ✅

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router, private apiService: ApiService) {}

  onRegister() {
    this.errorMessage = '';

    if (this.name && this.email && this.password) {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password
      };

      this.apiService.registerAdmin(data).subscribe({
        next: () => {
          alert('Account created successfully!');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = err?.error?.message || 'Registration failed. Please try again.';
        }
      });
    } else {
      this.errorMessage = 'All fields are required';
    }
  }
}

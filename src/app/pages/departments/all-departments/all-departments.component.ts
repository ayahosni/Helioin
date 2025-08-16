import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; // ✅ مهم

@Component({
  selector: 'app-all-departments',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './all-departments.component.html'
  , styleUrls: ['./all-departments.component.css']
})
export class AllDepartmentsComponent implements OnInit {
  departments: any[] = [];

  constructor(private api: ApiService, public router: Router) {}

  ngOnInit() {
    this.api.getAllDepartments().subscribe((res: any) => {
      this.departments = res.departments || res;
    });
  }

  deleteDepartment(id: string) {
    if (confirm('Are you sure?')) {
      this.api.deleteDepartment(id).subscribe(() => {
        this.departments = this.departments.filter(d => d._id !== id);
      });
    }
  }
}

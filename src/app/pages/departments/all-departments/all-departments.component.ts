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

 // ngOnInit
ngOnInit() {
  this.api.getAllDepartments().subscribe((res: any) => {
    this.departments = (res.departments || res).map((dep: any) => {
      let availableDates: Date[] = [];

      if (Array.isArray(dep.available_dates)) {
        availableDates = dep.available_dates.flatMap((d: any) => {
          if (typeof d === 'string' && !d.startsWith('[')) {
            return [this.parseDate(d)];
          }
          try {
            const parsed = JSON.parse(d);
            return Array.isArray(parsed)
              ? parsed.map(p => this.parseDate(p))
              : [this.parseDate(parsed)];
          } catch {
            return [];
          }
        });
      }

      return {
        ...dep,
        available_dates: availableDates.filter(d => d instanceof Date && !isNaN(d.getTime()))
      };
    });
  });
}

// دالة صغيرة تنظف وتحول النص لتاريخ
private parseDate(d: string): Date {
  if (!d) return new Date(NaN);

  // إصلاح الغلط +00:003 → +00:00
  const fixed = d.replace('+003', '+00:00');

  return new Date(fixed);
}



  deleteDepartment(id: string) {
    if (confirm('Are you sure?')) {
      this.api.deleteDepartment(id).subscribe(() => {
        this.departments = this.departments.filter(d => d._id !== id);
      });
    }
  }
}

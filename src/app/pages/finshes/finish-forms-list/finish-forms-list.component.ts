import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-finish-forms-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finish-forms-list.component.html',
  styleUrls: ['./finish-forms-list.component.css']
})
export class FinishFormsListComponent implements OnInit {
  finishForms: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.api.getAllFinishForms().subscribe({
      next: (data) => this.finishForms = data,
      error: (err) => console.error(err)
    });
  }

  deleteForm(id: string) {
    if (confirm('هل أنت متأكد أنك تريد حذف هذا العنصر؟')) {
      this.api.deleteFinishForm(id).subscribe({
        next: () => {
          this.finishForms = this.finishForms.filter(f => f._id !== id);
        },
        error: (err) => console.error(err)
      });
    }
  }
}

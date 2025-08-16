import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service'; 
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-form-decorations-list',
  templateUrl: './form-decorations-list.component.html',
  styleUrls: ['./form-decorations-list.component.css']
})
export class FormDecorationsListComponent implements OnInit {
  formDecorations: any[] = [];

  constructor(private apiService: ApiService) {} 

  ngOnInit(): void {
    this.loadFormDecorations();
  } 

  loadFormDecorations() {
  this.apiService.getAllFormDecorations().subscribe(data => { 
    this.formDecorations = data; // هنا نخزن البيانات في المصفوفة اللي ngFor بيقرأ منها
  });
}


  deleteFormDecoration(id: string) {
    if (confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
      this.apiService.deleteFormDecoration(id).subscribe(() => {
        this.formDecorations = this.formDecorations.filter(item => item._id !== id);
      });
    }
  }
}

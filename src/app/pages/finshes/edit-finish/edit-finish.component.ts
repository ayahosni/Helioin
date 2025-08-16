import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-edit-finish',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-finish.component.html',
  styleUrls: ['./edit-finish.component.css']
})
export class EditFinishComponent implements OnInit {
  finish: any = null;
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.api.getFinishById(id).subscribe({
        next: (res) => {
          this.finish = res;
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'حدث خطأ أثناء تحميل بيانات التشطيب.';
          this.isLoading = false;
        }
      });
    }
  }

  onFileChange(event: any, key: string) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.finish[key] = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addFinishy() {
    if (!this.finish.finishies) this.finish.finishies = [];
    this.finish.finishies.push({ name: '', properties: [], image: '' });
  }

  removeFinishy(index: number) {
    this.finish.finishies.splice(index, 1);
  }

  addProcess() {
    if (!this.finish.process) this.finish.process = [];
    this.finish.process.push({ name: '', description: '', icon_image: '' });
  }

  removeProcess(index: number) {
    this.finish.process.splice(index, 1);
  }

  onSubmit() {
    this.api.updateFinish(this.finish._id, this.finish).subscribe({
      next: () => {
        alert('تم تحديث التشطيب بنجاح!');
        this.router.navigate(['/finishes']);
      },
      error: () => {
        alert('حدث خطأ أثناء تحديث التشطيب.');
      }
    });
  }

  onCancel() {
    this.router.navigate(['/finishes']);
  }
}

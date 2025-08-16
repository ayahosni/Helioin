import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishFormsListComponent } from './finish-forms-list.component';

describe('FinishFormsListComponent', () => {
  let component: FinishFormsListComponent;
  let fixture: ComponentFixture<FinishFormsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishFormsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishFormsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

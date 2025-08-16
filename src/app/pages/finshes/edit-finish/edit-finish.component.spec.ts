import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFinishComponent } from './edit-finish.component';

describe('EditFinishComponent', () => {
  let component: EditFinishComponent;
  let fixture: ComponentFixture<EditFinishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFinishComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFinishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

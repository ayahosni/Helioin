import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDecorationsListComponent } from './form-decorations-list.component';

describe('FormDecorationsListComponent', () => {
  let component: FormDecorationsListComponent;
  let fixture: ComponentFixture<FormDecorationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormDecorationsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormDecorationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

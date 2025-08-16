import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealestateFormsListComponent } from './realestate-forms-list.component';

describe('RealestateFormsListComponent', () => {
  let component: RealestateFormsListComponent;
  let fixture: ComponentFixture<RealestateFormsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealestateFormsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealestateFormsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

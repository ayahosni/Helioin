import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllNeighborhoodsComponent } from './all-neighborhoods.component';

describe('AllNeighborhoodsComponent', () => {
  let component: AllNeighborhoodsComponent;
  let fixture: ComponentFixture<AllNeighborhoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllNeighborhoodsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllNeighborhoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

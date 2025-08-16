import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNeighborhoodComponent } from './create-neighborhood.component';

describe('CreateNeighborhoodComponent', () => {
  let component: CreateNeighborhoodComponent;
  let fixture: ComponentFixture<CreateNeighborhoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNeighborhoodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNeighborhoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

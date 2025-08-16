import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNeighborhoodComponent } from './edit-neighborhood.component';

describe('EditNeighborhoodComponent', () => {
  let component: EditNeighborhoodComponent;
  let fixture: ComponentFixture<EditNeighborhoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditNeighborhoodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNeighborhoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

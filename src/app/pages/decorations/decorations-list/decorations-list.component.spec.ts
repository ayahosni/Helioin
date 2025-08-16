import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecorationsListComponent } from './decorations-list.component';

describe('DecorationsListComponent', () => {
  let component: DecorationsListComponent;
  let fixture: ComponentFixture<DecorationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecorationsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecorationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

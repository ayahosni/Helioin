import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishesListComponent } from './finishes-list.component';

describe('FinishesListComponent', () => {
  let component: FinishesListComponent;
  let fixture: ComponentFixture<FinishesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

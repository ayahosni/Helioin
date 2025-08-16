import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDecorationComponent } from './add-decoration.component';

describe('AddDecorationComponent', () => {
  let component: AddDecorationComponent;
  let fixture: ComponentFixture<AddDecorationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDecorationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDecorationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

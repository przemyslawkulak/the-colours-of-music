import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscModalFieldComponent } from './misc-modal-field.component';

describe('MiscModalFieldComponent', () => {
  let component: MiscModalFieldComponent;
  let fixture: ComponentFixture<MiscModalFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscModalFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscModalFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

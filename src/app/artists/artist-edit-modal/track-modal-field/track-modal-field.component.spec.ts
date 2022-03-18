import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackModalFieldComponent } from './track-modal-field.component';

describe('TrackModalFieldComponent', () => {
  let component: TrackModalFieldComponent;
  let fixture: ComponentFixture<TrackModalFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackModalFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackModalFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

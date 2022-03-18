import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumModalFieldComponent } from './album-modal-field.component';

describe('AlbumModalFieldComponent', () => {
  let component: AlbumModalFieldComponent;
  let fixture: ComponentFixture<AlbumModalFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumModalFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumModalFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

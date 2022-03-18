import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistEditModalComponent } from './artist-edit-modal.component';

describe('ArtistEditModalComponent', () => {
  let component: ArtistEditModalComponent;
  let fixture: ComponentFixture<ArtistEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

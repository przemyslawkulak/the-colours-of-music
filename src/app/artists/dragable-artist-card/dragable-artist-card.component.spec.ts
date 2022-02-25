import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragableArtistCardComponent } from './dragable-artist-card.component';

describe('DragableArtistCardComponent', () => {
  let component: DragableArtistCardComponent;
  let fixture: ComponentFixture<DragableArtistCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragableArtistCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragableArtistCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

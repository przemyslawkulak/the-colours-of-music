import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistSidebarComponent } from './artist-sidebar.component';

describe('ArtistSidebarComponent', () => {
  let component: ArtistSidebarComponent;
  let fixture: ComponentFixture<ArtistSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

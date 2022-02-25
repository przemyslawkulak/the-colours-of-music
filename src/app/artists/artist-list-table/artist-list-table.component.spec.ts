import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistListTableComponent } from './artist-list-table.component';

describe('ArtistListTableComponent', () => {
  let component: ArtistListTableComponent;
  let fixture: ComponentFixture<ArtistListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistListTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

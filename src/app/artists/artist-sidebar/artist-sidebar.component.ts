import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-artist-sidebar',
  templateUrl: './artist-sidebar.component.html',
  styleUrls: ['./artist-sidebar.component.scss'],
})
export class ArtistSidebarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() topFilterControl = new FormControl('Ranked');

  @Input() searchTextControl = new FormControl('');

  @Output() changedArtistListOption: EventEmitter<'table' | 'dnd'> =
    new EventEmitter();

  artistListOption: 'table' | 'dnd' = 'dnd';

  topFilterOptions: string[] = ['Not Ranked', 'Ranked', 'All'];

  clearSearchText() {
    this.searchTextControl.patchValue('');
  }

  changeArtistListOption(event: 'table' | 'dnd') {
    this.changedArtistListOption.emit(event);
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-misc-modal-field',
  templateUrl: './misc-modal-field.component.html',
  styleUrls: ['./misc-modal-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiscModalFieldComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

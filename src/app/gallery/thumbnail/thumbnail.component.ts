import { Component, Input } from '@angular/core';

@Component({
  selector: 'jblog-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.sass']
})
export class ThumbnailComponent {

  @Input() public title: string;

  constructor() { }

}

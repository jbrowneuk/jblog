import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jblog-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.sass']
})
export class AlbumComponent implements OnInit {

  private images: any[];

  constructor() { }

  ngOnInit() {
    this.images = [
      'image a',
      'image b',
      'image c',
      'image d',
      'image e',
      'image f',
      'image g',
      'image h',
      'image i'
    ];
  }

}

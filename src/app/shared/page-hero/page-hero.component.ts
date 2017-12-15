import { Component, Input } from '@angular/core';

interface Parent {
  title: string;
  link: any;
}

@Component({
  selector: 'jblog-page-hero',
  templateUrl: './page-hero.component.html',
  styleUrls: ['./page-hero.component.scss']
})
export class PageHeroComponent {
  @Input() public heading: string;
  @Input() public subheading: string;
  @Input() public parallaxImage: string;
  @Input() parents: Parent[];
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'jblog-page-hero',
  templateUrl: './page-hero.component.html',
  styleUrls: ['./page-hero.component.scss']
})
export class PageHeroComponent {
  @Input() public heading: string;
  @Input() public subheading: string;
  @Input() public parallaxImage: string;
}

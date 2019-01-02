import { Component } from '@angular/core';

@Component({
  selector: 'jblog-load-spinner',
  template: `
    <div class="load-spinner">
      <div class="border"></div>
      <div class="logo">
        <svg><use xlink:href="#sitesheet-logo" /></svg>
      </div>
    </div>
  `
})
export class LoadSpinnerComponent {}

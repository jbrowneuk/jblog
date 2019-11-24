import { Component } from '@angular/core';

@Component({
  selector: 'jblog-text',
  template: `
    <ngx-md class="text-area"><ng-content></ng-content></ngx-md>
  `,
  styleUrls: ['./formatted-text.component.scss']
})
export class FormattedTextComponent {}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'jblog-text',
  template: `
    <ngx-md [data]="text" class="text-area" data-text-area></ngx-md>
  `,
  styleUrls: ['./formatted-text.component.scss']
})
export class FormattedTextComponent {
  @Input() public text = '';
}

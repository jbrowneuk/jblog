import { Component, Input } from '@angular/core';

@Component({
  selector: 'jblog-text',
  template: `
    <markdown [data]="text" class="text-area" data-text-area></markdown>
  `,
  styleUrls: ['./formatted-text.component.scss']
})
export class FormattedTextComponent {
  @Input() public text = '';
}

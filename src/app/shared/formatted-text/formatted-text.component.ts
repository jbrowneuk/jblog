import { Component, Input } from '@angular/core';

@Component({
    selector: 'jblog-text',
    template: `
    <markdown [data]="text" class="text-area" data-text-area></markdown>
  `,
    standalone: false
})
export class FormattedTextComponent {
  @Input() public text = '';
}

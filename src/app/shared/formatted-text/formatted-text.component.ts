import { Component } from '@angular/core';

@Component({
  selector: 'jblog-text',
  template: `
    <ngx-md><ng-content></ng-content></ngx-md>
  `
})
export class FormattedTextComponent {}

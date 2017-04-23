import { Component } from '@angular/core';

/**
 * This component is used to surface an error to the user. It's mainly used for
 * 404 (page not found) errors.
 */
@Component({
  selector: 'jblog-error',
  templateUrl: './error.component.html',
  styleUrls: [
    './error.component.scss',
    '../../shared-sass/content-info-area.scss'
  ]
})
export class ErrorComponent {
}

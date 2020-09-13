import { Component, Input } from '@angular/core';

@Component({
  selector: 'jblog-rating-bar',
  templateUrl: './rating-bar.component.html',
  styleUrls: ['./rating-bar.component.scss']
})
export class RatingBarComponent {
  @Input() public value = 0;
  @Input() public amount = 10;

  public get dotValues(): boolean[] {
    if (this.amount === 0) {
      return [];
    }

    const dotValues = Array<boolean>(this.amount);
    dotValues.fill(true, 0, this.value);
    if (this.value > this.amount) {
      return dotValues;
    }

    dotValues.fill(false, this.value);
    return dotValues;
  }
}

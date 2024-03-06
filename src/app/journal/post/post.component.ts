import { Component, Input } from '@angular/core';

import { PostData } from '../../model/post-data';

@Component({
  selector: 'jblog-post',
  templateUrl: './post.component.html'
})
export class PostComponent {
  @Input() public postData?: PostData;
  @Input() public titleLink?: string;

  /**
   * Returns whether a post is older than a certain number of years
   */
  public isStalePost(): boolean {
    if (!this.postData) {
      return false;
    }

    const years = 2;
    const postDate = new Date(this.postData.date * 1000);
    const comparisonDate = new Date();
    const offsetMsec =
      comparisonDate.getTime() - 1000 * 60 * 60 * 24 * 365 * years;
    comparisonDate.setTime(offsetMsec);
    return postDate < comparisonDate;
  }
}

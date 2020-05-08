import { PostData } from 'src/app/model/post-data';

import { Component, Input } from '@angular/core';

@Component({
  selector: 'jblog-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @Input() public postData: PostData;
  @Input() public titleLink: string;

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

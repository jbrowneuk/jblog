import { Component, HostBinding, Input } from '@angular/core';

import { PostData } from '../../model/post-data';

/**
 * The individual post component that is used to render post data
 */
@Component({
  selector: 'jblog-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  /**
   * Sets the post CSS class for styling
   */
  @HostBinding('class.post') public hostClassPost = true;

  /**
   * The post data to render
   */
  @Input() public data: PostData;

  /**
   * Returns whether a post has tags
   */
  public hasTags(): boolean {
    return this.data && this.data.tags.length > 0;
  }

  /**
   * Returns whether a post is older than a certain number of years
   */
  public ageInYearsGreaterThan(years: number): boolean {
    if (!this.data || years <= 0) {
      return false;
    }

    const postDate = new Date(this.data.date * 1000);
    const comparisonDate = new Date();
    const offsetMsec =
      comparisonDate.getTime() - 1000 * 60 * 60 * 24 * 365 * years;
    comparisonDate.setTime(offsetMsec);
    return postDate < comparisonDate;
  }
}

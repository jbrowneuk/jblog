import { Component, Input } from '@angular/core';

import { PostData } from "../post-data";

@Component({
  selector: 'jblog-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent {

  @Input() public data: PostData;

  private hasTags(): boolean {
    return this.data && this.data.tags.length > 0;
  }

  public ageInYearsGreaterThan(years: number): boolean {
    if (!this.data || years <= 0) {
      return false;
    }

    const postDate = new Date(this.data.date * 1000);
    const comparisonDate = new Date();
    const offsetMsec = comparisonDate.getTime() - 1000*60*60*24*365*years;
    comparisonDate.setTime(offsetMsec);
    return postDate < comparisonDate;
  }

}

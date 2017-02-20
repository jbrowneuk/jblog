import { Component, OnInit }      from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

import { PostComponent }  from "./post.component";
import { PostData }       from "./post-data.class";
import { PostsService }   from "./posts.service";

@Component({
  providers: [ PostsService ],
  selector: "jblog-post-view",
  styleUrls: [ "./post-view.component.sass" ],
  templateUrl: "./post-view.component.html"
})
export class PostViewComponent implements OnInit {
  public postData: PostData;
  public isLoaded: boolean;

  constructor(private postsService: PostsService, private route: ActivatedRoute) {
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let requestedPost = +params["postId"];
      this.getSinglePost(requestedPost);
    });
  }

  public ageInYearsGreaterThan(years: number): boolean {
    if (!this.postData || years <= 0) {
      return false;
    }

    const postDate = new Date(this.postData.date * 1000);
    const comparisonDate = new Date();
    const offsetMsec = comparisonDate.getTime() - 1000*60*60*24*365*years;
    comparisonDate.setTime(offsetMsec);
    return postDate < comparisonDate;
  }

  private getSinglePost(postId: number): void {
    this.isLoaded = false;
    this.postData = null;

    this.postsService.getSinglePost(postId)
      .then(response => this.handlePostResponseSuccess(response))
      .catch(e => this.handlePostResponseFailure(e));
  }

  private handlePostResponseSuccess(data: PostData): void {
    this.postData = data;
    this.isLoaded = true;
  }

  private handlePostResponseFailure(error: any): void {
    console.error("An error occurred", error);
    this.postData = null;
    this.isLoaded = true;
  }
}
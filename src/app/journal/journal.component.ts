import { Component, OnInit }      from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

import { PostComponent }      from "./post.component";
import { PostData }           from "./post-data.class";
import { PostDataContainer }  from "./post-data-container.class";
import { PostsService }       from "./posts.service";

@Component({
  providers: [ PostsService ],
  selector: "jblog-journal",
  templateUrl: "./journal.component.html"
})

export class JournalComponent implements OnInit {
  public title: string = "All posts";
  public posts: PostData[];
  public page: number;
  public totalPages: number;
  public isLoaded: boolean;

  constructor(private postsService: PostsService, private route: ActivatedRoute) {
    this.isLoaded = false;
    this.page = 1;
    this.totalPages = 1;
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let requestedPage = +params["page"];
      this.getPostData(requestedPage);
    });
  }

  public hasPosts(): boolean {
    return this.posts && this.posts.length > 0;
  }

  private getPostData(pageRequest: number) {
    this.isLoaded = false;
    this.posts = [];

    this.postsService.getPostData(pageRequest)
      .then(response => this.handleResponsePostDataSuccess(response))
      .catch(e => this.handleResponsePostDataFailure(e));
  }

  private handleResponsePostDataSuccess(dataContainer: PostDataContainer): void {
    this.page = dataContainer.currentPage;
    this.totalPages = dataContainer.totalPages;
    this.posts = dataContainer.data;
    this.isLoaded = true;
  }

  private handleResponsePostDataFailure(error: any): void {
    console.error("An error occurred", error);
    this.posts = [];
    this.isLoaded = true;
  }
}

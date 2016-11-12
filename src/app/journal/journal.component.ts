import { Component, OnInit } from "@angular/core";

import { PostComponent }      from "./post.component";
import { PostData }           from "./post-data.class";
import { PostDataContainer }  from "./post-data-container.class";
import { PostsService }       from "./posts.service";

@Component({
  selector: "jblog-journal",
  templateUrl: "./journal.component.html",
  providers: [PostsService]
})

export class JournalComponent implements OnInit {
  public title: string = "All posts";
  public posts: PostData[];
  public page: number;
  public totalPages: number;
  public isLoaded: boolean;

  constructor(private postsService: PostsService) {
    this.isLoaded = false;
    this.page = 1;
    this.totalPages = 1;
  }

  ngOnInit(): void {
    this.getPostData();
  }

  public hasPosts(): boolean {
    return this.posts && this.posts.length > 0;
  }

  public hasNextPage(): boolean {
    return this.page < this.totalPages;
  }

  public hasPreviousPage(): boolean {
    return this.page > 1;
  }

  private getPostData() {
    this.postsService.getPostData()
      .then(response => this.handlePostData(response))
      .catch(e => this.posts = []);
  }

  private handlePostData(dataContainer: PostDataContainer): void {
    this.page = dataContainer.currentPage;
    this.totalPages = dataContainer.totalPages;
    this.posts = dataContainer.data;
    this.isLoaded = true;
  }
}

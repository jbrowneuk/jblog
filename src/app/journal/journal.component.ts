import { Component, OnInit } from "@angular/core";

import { PostComponent }  from "./post.component";
import { PostData }       from "./post-data.class";
import { PostsService }   from "./posts.service";

@Component({
  selector: "jblog-journal",
  templateUrl: "./journal.component.html",
  providers: [PostsService]
})

export class JournalComponent implements OnInit {
  public title: string = "All posts";
  public posts: PostData[];
  private isLoaded: boolean;

  constructor(private postsService: PostsService) {
    this.isLoaded = false;
  }

  ngOnInit(): void {
    this.getPostData();
    this.isLoaded = true;
  }

  public hasPosts(): boolean {
    return this.posts && this.posts.length > 0;
  }

  private getPostData() {
    this.postsService.getPosts()
      .then(data => this.posts = data)
      .catch(e => this.posts = []);
  }
}

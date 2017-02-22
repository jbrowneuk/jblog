import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";

import { PostData } from "../post-data";

import { PostService } from '../post.service';

@Component({
  selector: 'jblog-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.sass']
})
export class PostListComponent implements OnInit {

  private title: string = "All posts";
  private posts: PostData[];

  constructor(private postsService: PostService) { }

  ngOnInit() {
    this.postsService.getPostsForPage(1).subscribe(
      x => this.handlePostResponse(x),
      e => console.log('Error: %s', e),
      () => console.log('Completed')
    );
  }

  private handlePostResponse(response: PostData[]): void {
    this.posts = response;
  }

}

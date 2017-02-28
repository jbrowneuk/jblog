import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { PostData, PostDataWrapper } from '../post-data';

import { PostService } from '../post.service';

@Component({
  selector: 'jblog-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.sass']
})
export class PostListComponent implements OnInit {

  public posts: PostData[];
  public title = 'All posts';
  public page: number;
  public totalPages: number;

  constructor(private route: ActivatedRoute, private postsService: PostService) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.posts = []; // Fix for Safari hanging
      const idParam = params['id'];

      if (!idParam || idParam.length === 0) {
        this.page = +params['page'] || 1;
        this.postsService.getPostsForPage(this.page).subscribe(
          x => this.handlePostListResponse(x),
          e => console.log('Error: %s', e)
        );
      } else {
        const id = +idParam;
        this.postsService.getPost(id).subscribe(
          x => this.handlePostResponse(x),
          e => console.log('Error: %s', e)
        );
      }
    });
  }

  private handlePostResponse(response: PostData): void {
    this.posts = [response];
    this.totalPages = 1;
  }

  private handlePostListResponse(response: PostDataWrapper): void {
    this.posts = response.posts;
    this.totalPages = response.totalPages;
  }

}

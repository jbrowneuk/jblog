import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { PostData } from '../post-data';

import { PostService } from '../post.service';

@Component({
  selector: 'jblog-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.sass']
})
export class PostListComponent implements OnInit {

  public posts: PostData[];
  public title = 'All posts';

  constructor(private route: ActivatedRoute, private postsService: PostService) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      const idParam = params['id'];
      if (!idParam || idParam.length === 0) {
        this.postsService.getPostsForPage(1).subscribe(
          x => this.handlePostListResponse(x),
          e => console.log('Error: %s', e),
          () => console.log('Got post list')
        );
      } else {
        const id = +idParam;
        this.postsService.getPost(id).subscribe(
          x => this.handlePostResponse(x),
          e => console.log('Error: %s', e),
          () => console.log('Got post %s', id)
        );
      }
    });
  }

  private handlePostResponse(response: PostData): void {
    this.posts = [response];
  }

  private handlePostListResponse(response: PostData[]): void {
    this.posts = response;
  }

}

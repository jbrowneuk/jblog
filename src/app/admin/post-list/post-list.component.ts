import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';

import { PostDataWrapper } from '../../model/post-data';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'jblog-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  public postData$: Observable<PostDataWrapper>;

  constructor(private postService: PostService) {}

  ngOnInit() {
    const pageNum = 1;
    this.postData$ = this.postService.getPostsForPage(pageNum);
  }
}

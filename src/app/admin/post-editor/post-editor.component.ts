import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PostData } from '../../model/post-data';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'jblog-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss']
})
export class PostEditorComponent implements OnInit {
  public postData$: Observable<PostData>;
  public isEditing: boolean;

  constructor(private route: ActivatedRoute, private postService: PostService) {
    this.isEditing = true;
  }

  ngOnInit() {
    this.postData$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = params.get('id');
        if (!id) {
          return of(this.generateBlankPost());
        }

        return this.postService.getPost(id);
      })
    );
  }

  public toggleMode(): void {
    this.isEditing = !this.isEditing;
  }

  private generateBlankPost(): PostData {
    return {
      postId: 0,
      date: Date.now(),
      modified: null,
      title: '',
      content: '',
      tags: [],
      slug: ''
    };
  }
}

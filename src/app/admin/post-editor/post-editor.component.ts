import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { PostData, PostStatus } from '../../model/post-data';
import { PostService } from '../../services/post.service';
import { PostAdminService } from '../post-admin.service';

@Component({
  selector: 'jblog-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss']
})
export class PostEditorComponent implements OnInit {
  public postData$: Observable<PostData>;
  public isDraft: boolean;
  public isEditing: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private postAdminService: PostAdminService
  ) {
    this.isEditing = true;
    this.isDraft = true;
  }

  ngOnInit() {
    this.postData$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const id = params.get('id');
        if (!id) {
          return of(this.generateBlankPost());
        }

        return this.postService.getPost(id);
      }),
      tap(p => (this.isDraft = p.status === 'draft'))
    );
  }

  public toggleMode(): void {
    this.isEditing = !this.isEditing;
  }

  public onFormSubmit(post: PostData): void {
    // Modify post state – todo: use enum
    post.status = this.isDraft ? PostStatus.Draft : PostStatus.Publish;

    this.postAdminService.sendPost(post).subscribe({
      next: () => this.router.navigate(['../..'], { relativeTo: this.route }),
      error: () => console.error('not success')
    });
  }

  public calculateWordCount(text: string): number {
    return text ? text.match(/\w+/g).length : 0;
  }

  private generateBlankPost(): PostData {
    return {
      postId: -1,
      date: 0,
      modified: null,
      title: '',
      content: '',
      tags: [],
      slug: '',
      status: PostStatus.Draft
    };
  }
}

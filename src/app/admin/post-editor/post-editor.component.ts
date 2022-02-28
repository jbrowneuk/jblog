import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public postData$?: Observable<PostData>;
  public isEditing = true;

  public postForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private postAdminService: PostAdminService
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      slug: ['', Validators.required],
      isDraft: [true]
    });
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
      tap(p => {
        this.postForm.patchValue({
          title: p.title,
          content: p.content,
          slug: p.slug,
          isDraft: p.status === PostStatus.Draft
        });
      })
    );
  }

  public toggleMode(): void {
    this.isEditing = !this.isEditing;
  }

  public onFormSubmit(post: PostData): void {
    const editableData: PostData = { ...post };

    // Update from form
    const isDraft = this.postForm.value.isDraft;
    editableData.title = this.postForm.value.title;
    editableData.content = this.postForm.value.content;
    editableData.slug = this.postForm.value.slug;
    editableData.status = isDraft ? PostStatus.Draft : PostStatus.Publish;

    this.postAdminService.sendPost(editableData).subscribe({
      next: () => this.router.navigate(['../..'], { relativeTo: this.route }),
      error: err => console.error(err.message | err)
    });
  }

  public calculateWordCount(text: string): number {
    if (!text || text === null) {
      return 0;
    }

    const matches = text.match(/\w+/g);
    return matches !== null ? matches.length : 0;
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

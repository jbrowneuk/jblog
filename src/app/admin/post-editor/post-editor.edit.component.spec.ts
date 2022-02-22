import { of } from 'rxjs';
import { IMock, It, Mock } from 'typemoq';

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { PostData, PostStatus } from '../../model/post-data';
import { PostService } from '../../services/post.service';
import { PostAdminService } from '../post-admin.service';
import { PostEditorComponent } from './post-editor.component';

const mockPostData: PostData = {
  postId: 1,
  date: 1577487979,
  modified: null,
  title: 'post title',
  content: 'post textual content',
  tags: [],
  slug: 'post-slug',
  status: PostStatus.Publish,
};

@Component({
  selector: 'jblog-text',
  template: '<ng-content></ng-content>',
})
class MockFormattedTextComponent {}

describe('PostEditorComponent - Edit mode', () => {
  let mockActivatedRoute: ActivatedRouteStub;
  let mockRouter: IMock<Router>;
  let mockPostService: IMock<PostService>;
  let mockPostAdminService: IMock<PostAdminService>;

  let component: PostEditorComponent;
  let fixture: ComponentFixture<PostEditorComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    mockPostService = Mock.ofType<PostService>();

    // Return a copy of the post data so tests can modify
    mockPostService
      .setup((s) => s.getPost(It.isAny()))
      .returns(() => of(Object.assign({}, mockPostData)));

    mockRouter = Mock.ofType<Router>();
    mockPostAdminService = Mock.ofType<PostAdminService>();
  });

  describe('editing posts (with `id` route param)', () => {
    beforeEach(() => {
      mockActivatedRoute = new ActivatedRouteStub({
        id: mockPostData.postId,
      });

      TestBed.configureTestingModule({
        declarations: [MockFormattedTextComponent, PostEditorComponent],
        imports: [RouterTestingModule, ReactiveFormsModule],
        providers: [
          { provide: ActivatedRoute, useValue: mockActivatedRoute },
          { provide: Router, useFactory: () => mockRouter.object },
          { provide: PostService, useFactory: () => mockPostService.object },
          {
            provide: PostAdminService,
            useFactory: () => mockPostAdminService.object,
          },
        ],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(PostEditorComponent);
      component = fixture.componentInstance;
      compiled = fixture.nativeElement;
      fixture.detectChanges();
    });

    it('should have post title', () => {
      const postTitleInput = compiled.querySelector(
        '[data-post-title]'
      ) as HTMLInputElement;
      expect(postTitleInput.value).toBe(mockPostData.title);
    });

    it('should have post content', () => {
      const contentElement = compiled.querySelector(
        '[data-post-content]'
      ) as HTMLTextAreaElement;
      expect(contentElement.value).toBe(mockPostData.content);
    });

    it('should have post identifier', () => {
      const identifierElement = compiled.querySelector(
        '[data-post-identifier]'
      ) as HTMLInputElement;
      expect(identifierElement.value).toBe(mockPostData.slug);
    });

    it('should display matching post status', () => {
      const draftCheckbox = compiled.querySelector(
        '[data-post-draft]'
      ) as HTMLInputElement;
      expect(draftCheckbox.checked).toBe(mockPostData.status === 'draft');
    });

    it('should display word and character count', () => {
      const characterCountElement = compiled.querySelector(
        '[data-post-character-count]'
      ) as HTMLElement;
      const wordCountElement = compiled.querySelector(
        '[data-post-word-count]'
      ) as HTMLElement;

      expect(characterCountElement.innerText.trim()).toBe(
        `${mockPostData.content.length} characters`
      );
      expect(wordCountElement.innerText.trim()).toBe(
        `${mockPostData.content.split(' ').length} words`
      );
    });
  });
});

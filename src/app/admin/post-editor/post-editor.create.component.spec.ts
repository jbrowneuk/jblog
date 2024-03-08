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
  status: PostStatus.Publish
};

@Component({
  selector: 'jblog-text',
  template: '<ng-content></ng-content>'
})
class MockFormattedTextComponent {}

describe('PostEditorComponent - Create mode', () => {
  let mockActivatedRoute: ActivatedRouteStub;
  let mockRouter: IMock<Router>;
  let mockPostService: IMock<PostService>;
  let mockPostAdminService: IMock<PostAdminService>;

  let fixture: ComponentFixture<PostEditorComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    mockPostService = Mock.ofType<PostService>();

    // Return a copy of the post data so tests can modify
    mockPostService
      .setup(s => s.getPost(It.isAny()))
      .returns(() => of(Object.assign({}, mockPostData)));

    mockRouter = Mock.ofType<Router>();
    mockPostAdminService = Mock.ofType<PostAdminService>();
    mockActivatedRoute = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      declarations: [MockFormattedTextComponent, PostEditorComponent],
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useFactory: () => mockRouter.object },
        { provide: PostService, useFactory: () => mockPostService.object },
        {
          provide: PostAdminService,
          useFactory: () => mockPostAdminService.object
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostEditorComponent);
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should not have post title', () => {
    const postTitleInput = compiled.querySelector(
      '[data-post-title]'
    ) as HTMLInputElement;
    expect(postTitleInput.value).toBe('');
  });

  it('should not have post content', () => {
    const contentElement = compiled.querySelector(
      '[data-post-content]'
    ) as HTMLTextAreaElement;
    expect(contentElement.value).toBe('');
  });

  it('should not have post identifier', () => {
    const identifierElement = compiled.querySelector(
      '[data-post-identifier]'
    ) as HTMLInputElement;
    expect(identifierElement.value).toBe('');
  });

  it('should be marked as draft', () => {
    const draftCheckbox = compiled.querySelector(
      '[data-post-draft]'
    ) as HTMLInputElement;
    expect(draftCheckbox.checked).toBeTruthy();
  });
});

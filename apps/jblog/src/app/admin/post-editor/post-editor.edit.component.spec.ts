import { of, take } from 'rxjs';
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
import { PageObjectBase } from '../../lib/testing/page-object.base';

const mockPostData: PostData = Object.freeze({
  postId: 1,
  date: 1577487979,
  modified: null,
  title: 'post title',
  content: 'post textual content',
  tags: [],
  slug: 'post-slug',
  status: PostStatus.Publish
});

@Component({
  selector: 'jblog-text',
  template: '<ng-content></ng-content>'
})
class MockFormattedTextComponent {}

describe('PostEditorComponent - Edit mode', () => {
  let mockActivatedRoute: ActivatedRouteStub;
  let mockRouter: IMock<Router>;
  let mockPostService: IMock<PostService>;
  let mockPostAdminService: IMock<PostAdminService>;

  let fixture: ComponentFixture<PostEditorComponent>;
  let pageObject: PostEditorPageObject;

  beforeEach(() => {
    mockPostService = Mock.ofType<PostService>();
    mockPostService
      .setup(s => s.getPost(It.isAny()))
      .returns(() => of(Object.assign({}, mockPostData)));

    mockRouter = Mock.ofType<Router>();
    mockPostAdminService = Mock.ofType<PostAdminService>();

    mockActivatedRoute = new ActivatedRouteStub({
      id: mockPostData.postId
    });

    return TestBed.configureTestingModule({
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
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(PostEditorComponent);
        pageObject = new PostEditorPageObject(fixture);
        fixture.detectChanges();
      });
  });

  it('should have post title', () => {
    expect(pageObject.postTitleInput.value).toBe(mockPostData.title);
  });

  it('should have post content', () => {
    expect(pageObject.postContentTextarea.value).toBe(mockPostData.content);
  });

  it('should have post identifier', () => {
    expect(pageObject.postIdentifierInput.value).toBe(mockPostData.slug);
  });

  it('should display matching post status', () => {
    expect(pageObject.postDraftInput.checked).toBe(
      mockPostData.status === 'draft'
    );
  });

  it('should have word count', done => {
    fixture.componentInstance.wordCount$.pipe(take(1)).subscribe({
      next: count => {
        expect(count).toBe(mockPostData.content.split(' ').length);
        done();
      }
    });

    pageObject.postContentTextarea.value = mockPostData.content;
    pageObject.postContentTextarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  });
});

class PostEditorPageObject extends PageObjectBase<PostEditorComponent> {
  public get postTitleInput(): HTMLInputElement {
    return this.select('[data-post-title]');
  }

  public get postIdentifierInput(): HTMLInputElement {
    return this.select('[data-post-identifier]');
  }

  public get postDraftInput(): HTMLInputElement {
    return this.select('[data-post-draft]');
  }

  public get postContentTextarea(): HTMLTextAreaElement {
    return this.select('[data-post-content]');
  }
}

import { of, throwError } from 'rxjs';
import { IMock, It, Mock, Times } from 'typemoq';

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { PageObjectBase } from '../../lib/testing/page-object.base';
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

describe('PostEditorComponent - Submit form', () => {
  let mockActivatedRoute: ActivatedRouteStub;
  let mockRouter: IMock<Router>;
  let mockPostService: IMock<PostService>;
  let mockPostAdminService: IMock<PostAdminService>;

  let component: PostEditorComponent;
  let fixture: ComponentFixture<PostEditorComponent>;
  let compiled: HTMLElement;
  let submitButton: HTMLButtonElement;
  let pageObject: PostEditorObject;

  beforeEach(() => {
    mockPostService = Mock.ofType<PostService>();

    // Return a copy of the post data so tests can modify
    mockPostService
      .setup(s => s.getPost(It.isAny()))
      .returns(() => of(Object.assign({}, mockPostData)));

    mockRouter = Mock.ofType<Router>();
    mockPostAdminService = Mock.ofType<PostAdminService>();

    mockActivatedRoute = new ActivatedRouteStub({
      id: mockPostData.postId
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
          useFactory: () => mockPostAdminService.object
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostEditorComponent);
    pageObject = new PostEditorObject(fixture);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();

    submitButton = compiled.querySelector(
      '[data-form-submit]'
    ) as HTMLButtonElement;
  });

  it('should send post data using post admin service', () => {
    mockPostAdminService
      .setup(s => s.sendPost(It.isAny()))
      .returns(() => of(null));

    submitButton.click();

    mockPostAdminService.verify(
      s => s.sendPost(It.isValue(mockPostData)),
      Times.once()
    );
    expect().nothing();
  });

  it('should redirect if post submission successful', done => {
    mockPostAdminService
      .setup(s => s.sendPost(It.isAny()))
      .returns(() => of(null));

    submitButton.click();

    setTimeout(() => {
      mockRouter.verify(
        r => r.navigate(It.isValue(['../..']), It.isAny()),
        Times.once()
      );
      expect().nothing();
      done();
    });
  });

  it('should not redirect if post submission failed', done => {
    mockPostAdminService
      .setup(s => s.sendPost(It.isAny()))
      .returns(() => throwError(() => new Error('failed')));

    submitButton.click();

    setTimeout(() => {
      mockRouter.verify(r => r.navigate(It.isAny(), It.isAny()), Times.never());
      expect().nothing();
      done();
    });
  });

  it('should update draft status when submitting', () => {
    const simplePostData = { ...mockPostData, status: PostStatus.Draft };
    const expectedPostData = { ...mockPostData, status: PostStatus.Publish };

    mockPostAdminService
      .setup(s => s.sendPost(It.isAny()))
      .returns(() => of(null));

    pageObject.draftCheck.checked = simplePostData.status !== PostStatus.Draft;
    pageObject.draftCheck.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    component.onFormSubmit(simplePostData);

    mockPostAdminService.verify(
      s => s.sendPost(It.isObjectWith(expectedPostData)),
      Times.once()
    );

    expect().nothing();
  });
});

class PostEditorObject extends PageObjectBase<PostEditorComponent> {
  get draftCheck() {
    return this.select<HTMLInputElement>('[data-post-draft]');
  }
}

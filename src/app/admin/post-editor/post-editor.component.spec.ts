import { of, throwError } from 'rxjs';
import { IMock, It, Mock, Times } from 'typemoq';

import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { PostData } from '../../model/post-data';
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
  status: 'publish'
};

@Component({
  selector: 'jblog-text',
  template: '<ng-content></ng-content>'
})
class MockFormattedTextComponent {}

describe('PostEditorComponent', () => {
  let mockActivatedRoute: ActivatedRouteStub;
  let mockRouter: IMock<Router>;
  let mockPostService: IMock<PostService>;
  let mockPostAdminService: IMock<PostAdminService>;

  let component: PostEditorComponent;
  let fixture: ComponentFixture<PostEditorComponent>;
  let compiled: HTMLElement;

  beforeAll(() => {
    mockPostService = Mock.ofType<PostService>();

    // Return a copy of the post data so tests can modify
    mockPostService
      .setup(s => s.getPost(It.isAny()))
      .returns(() => of(Object.assign({}, mockPostData)));
  });

  function createFixture() {
    mockRouter = Mock.ofType<Router>();
    mockPostAdminService = Mock.ofType<PostAdminService>();

    return TestBed.configureTestingModule({
      declarations: [MockFormattedTextComponent, PostEditorComponent],
      imports: [RouterTestingModule, FormsModule],
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
        component = fixture.componentInstance;
        fixture.detectChanges();

        compiled = fixture.nativeElement;
      });
  }

  describe('creation of posts (no `id` route param)', () => {
    beforeEach(async(() => {
      mockActivatedRoute = new ActivatedRouteStub();
      createFixture();
    }));

    it('should not have post title', () => {
      const postTitleInput: HTMLInputElement = compiled.querySelector(
        '[data-post-title]'
      );
      expect(postTitleInput.value).toBe('');
    });

    it('should not have post content', () => {
      const contentElement: HTMLTextAreaElement = compiled.querySelector(
        '[data-post-content]'
      );
      expect(contentElement.value).toBe('');
    });

    it('should not have post identifier', () => {
      const identifierElement: HTMLInputElement = compiled.querySelector(
        '[data-post-identifier]'
      );
      expect(identifierElement.value).toBe('');
    });

    it('should be marked as draft', () => {
      const draftCheckbox: HTMLInputElement = compiled.querySelector(
        '[data-post-draft]'
      );
      expect(draftCheckbox.checked).toBeTruthy();
    });
  });

  describe('editing posts (with `id` route param)', () => {
    beforeEach(async(() => {
      mockActivatedRoute = new ActivatedRouteStub();
      mockActivatedRoute.setParamMap({ id: mockPostData.postId });

      createFixture();
    }));

    it('should have post title', () => {
      const postTitleInput: HTMLInputElement = compiled.querySelector(
        '[data-post-title]'
      );
      expect(postTitleInput.value).toBe(mockPostData.title);
    });

    it('should have post content', () => {
      const contentElement: HTMLTextAreaElement = compiled.querySelector(
        '[data-post-content]'
      );
      expect(contentElement.value).toBe(mockPostData.content);
    });

    it('should have post identifier', () => {
      const identifierElement: HTMLInputElement = compiled.querySelector(
        '[data-post-identifier]'
      );
      expect(identifierElement.value).toBe(mockPostData.slug);
    });

    it('should display matching post status', () => {
      const draftCheckbox: HTMLInputElement = compiled.querySelector(
        '[data-post-draft]'
      );
      expect(draftCheckbox.checked).toBe(mockPostData.status === 'draft');
    });

    it('should display word and character count', () => {
      const characterCountElement: HTMLElement = compiled.querySelector(
        '[data-post-character-count]'
      );
      const wordCountElement: HTMLElement = compiled.querySelector(
        '[data-post-word-count]'
      );

      expect(characterCountElement.innerText.trim()).toBe(
        `${mockPostData.content.length} characters`
      );
      expect(wordCountElement.innerText.trim()).toBe(
        `${mockPostData.content.split(' ').length} words`
      );
    });
  });

  describe('form submission', () => {
    let submitButton: HTMLButtonElement;

    beforeEach(async(() => {
      mockActivatedRoute = new ActivatedRouteStub();
      mockActivatedRoute.setParamMap({ id: mockPostData.postId });

      createFixture().then(() => {
        submitButton = compiled.querySelector('[data-form-submit]');
      });
    }));

    it('should send post data using post admin service', () => {
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
        .returns(() => throwError(new Error('failed')));

      submitButton.click();

      setTimeout(() => {
        mockRouter.verify(
          r => r.navigate(It.isValue(['..']), It.isAny()),
          Times.never()
        );
        expect().nothing();
        done();
      });
    });

    it('should update draft status when submitting', () => {
      const simplePostData = { status: 'draft' } as PostData;
      const expectedPostData = { status: 'publish' } as PostData;

      mockPostAdminService
        .setup(s => s.sendPost(It.isAny()))
        .returns(() => of(null));

      component.isDraft = false;
      component.onFormSubmit(simplePostData);

      mockPostAdminService.verify(
        s => s.sendPost(It.isObjectWith(expectedPostData)),
        Times.once()
      );

      expect().nothing();
    });
  });
});

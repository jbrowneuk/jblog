import { of } from 'rxjs';
import { IMock, It, Mock } from 'typemoq';

import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { PostData } from '../../model/post-data';
import { PostService } from '../../services/post.service';
import { PostEditorComponent } from './post-editor.component';

const mockPostData: PostData = {
  postId: 1,
  date: 1577487979,
  title: 'post title',
  content: 'content',
  tags: [],
  slug: 'post-slug'
};

@Component({
  selector: 'jblog-text',
  template: '<ng-content></ng-content>'
})
class MockFormattedTextComponent {}

describe('PostEditorComponent', () => {
  let mockActivatedRoute: ActivatedRouteStub;
  let mockPostService: IMock<PostService>;

  let component: PostEditorComponent;
  let fixture: ComponentFixture<PostEditorComponent>;
  let compiled: HTMLElement;

  beforeAll(() => {
    mockPostService = Mock.ofType<PostService>();
    mockPostService
      .setup(s => s.getPost(It.isAny()))
      .returns(() => of(mockPostData));
  });

  function createFixture() {
    return TestBed.configureTestingModule({
      declarations: [MockFormattedTextComponent, PostEditorComponent],
      imports: [RouterTestingModule, FormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: PostService, useFactory: () => mockPostService.object }
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

    it('should not be marked as draft', () => {
      const draftCheckbox: HTMLInputElement = compiled.querySelector(
        '[data-post-draft]'
      );
      expect(draftCheckbox.checked).toBeFalsy();
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
  });
});

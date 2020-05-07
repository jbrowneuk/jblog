import { of } from 'rxjs';
import { PageObjectBase } from 'src/app/lib/testing/page-object.base';
import { PostData, PostStatus } from 'src/app/model/post-data';
import { IMock, It, Mock, Times } from 'typemoq';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { JournalFacade } from '../state/journal.facade';
import { PostSingleComponent } from './post-single.component';

const mockPost: PostData = {
  postId: 1,
  date: 1585347583,
  modified: null,
  title: 'mock post',
  content: '',
  tags: [],
  slug: 'mock-post',
  status: PostStatus.Publish
};

class PostSinglePageObject extends PageObjectBase<PostSingleComponent> {
  public get post(): HTMLElement {
    return this.select('[data-post]');
  }

  public get backButton(): HTMLAnchorElement {
    return this.select('[data-back-button]');
  }
}

describe('Post (Single) Component', () => {
  let mockFacade: IMock<JournalFacade>;
  let mockRoute: IMock<ActivatedRoute>;
  let component: PostSingleComponent;
  let fixture: ComponentFixture<PostSingleComponent>;
  let pageObject: PostSinglePageObject;

  beforeEach(async(async () => {
    mockFacade = Mock.ofType<JournalFacade>();
    mockFacade.setup(f => f.postListLoading$).returns(() => of(false));
    mockFacade.setup(f => f.currentPost$).returns(() => of(mockPost));

    mockRoute = Mock.ofType<ActivatedRoute>();
    mockRoute.setup(r => r.params).returns(() => of({ slug: mockPost.slug }));

    await TestBed.configureTestingModule({
      declarations: [PostSingleComponent],
      providers: [
        { provide: JournalFacade, useFactory: () => mockFacade.object },
        { provide: ActivatedRoute, useFactory: () => mockRoute.object }
      ],
      schemas: [RouterTestingModule, CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PostSingleComponent);
    pageObject = new PostSinglePageObject(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should load post from facade on creation', () => {
    expect(component).toBeTruthy();
    mockFacade.verify(
      f => f.loadPostBySlug(It.isValue(mockPost.slug)),
      Times.once()
    );
  });

  it('should display posts', () => {
    const relatedPost = pageObject.post;
    expect(relatedPost).toBeTruthy();
    expect(relatedPost.dataset.post).toBe(`${mockPost.postId}`);
  });
});

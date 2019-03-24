import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { PostData, PostDataWrapper } from '../post-data';

import { PostService } from '../post.service';
import { TitleService } from '../../shared/title.service';

const maximumPostsOnScroll = 16;

/**
 * The post list component that is used to render a list of post data
 */
@Component({
  selector: 'jblog-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  /**
   * The post list
   */
  public posts: PostData[];

  /**
   * List title
   */
  public title = 'All posts';

  /**
   * Current page
   */
  public page: number;

  /**
   * Total number of pages
   */
  public totalPages: number;

  /**
   * The current tag used to filter posts with
   */
  public currentTag: string;

  /**
   * Control variable that changes the display of the page if loading or not
   */
  public isLoading: boolean;

  /**
   * Method to call after the page scrolls a certain amount
   */
  public scrollCallback: () => void;

  /**
   * Control flag to prevent further loading of items on scroll
   */
  public showNavigation: boolean;

  /**
   * Control flag to show a notification when at the end of the infinite scroll
   */
  public reachedEnd: boolean;

  /**
   * The page number that was loaded when the component was initialized.
   * Used as a reference for page-scroll post loading
   */
  public initialPage: number;

  /**
   * Constructor
   */
  constructor(
    private route: ActivatedRoute,
    private postsService: PostService,
    private titleService: TitleService
  ) {
    this.scrollCallback = this.onScrollReached.bind(this);
    this.showNavigation = false;
    this.reachedEnd = false;
  }

  /**
   * On component initialization, load posts
   */
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.onStartLoading();
      this.posts = []; // Fix for Safari hanging
      const idParam = params['id'];

      if (!idParam || idParam.length === 0) {
        this.initialPage = +params['page'] || 1;
        this.currentTag = params['tag'] || null;
        this.page = this.initialPage;
        this.postsService
          .getPostsForPage(this.page, this.currentTag)
          .subscribe(
            x => this.handlePostListResponse(x),
            e => this.handlePostErrorResponse(e),
            () => this.onEndLoading()
          );
      } else {
        const id = +idParam;
        this.postsService
          .getPost(id)
          .subscribe(
            x => this.handlePostResponse(x),
            e => this.handlePostErrorResponse(e),
            () => this.onEndLoading()
          );
      }
    });
  }

  public onScrollReached(): void {
    if (this.showNavigation) {
      return;
    }

    // Sanity check
    if (
      typeof this.page === 'undefined' ||
      typeof this.totalPages === 'undefined'
    ) {
      return;
    }

    if (this.page === this.totalPages) {
      this.reachedEnd = true;
      return;
    }

    // Increment a page
    this.page += 1;

    // Load the next set of posts
    this.onStartLoading();
    this.postsService
      .getPostsForPage(this.page, this.currentTag)
      .subscribe(
        x => this.handlePostListResponse(x),
        e => this.handlePostErrorResponse(e),
        () => this.onEndLoading()
      );
  }

  /**
   * Handle a single post response
   */
  private handlePostResponse(response: PostData): void {
    this.posts = [response];
    this.initialPage = 1;
    this.totalPages = this.initialPage;
    this.titleService.setTitle(response.title);
  }

  /**
   * Handle a post list response
   */
  private handlePostListResponse(response: PostDataWrapper): void {
    this.posts = this.posts.concat(response.posts);
    this.totalPages = response.totalPages;
    this.titleService.setTitle('Journal');

    const maxPostsDisplayed = this.posts.length >= maximumPostsOnScroll;
    const isLastPage = this.page === this.totalPages;
    this.showNavigation = maxPostsDisplayed && !isLastPage;
  }

  /**
   * Handle an error response
   */
  private handlePostErrorResponse(e: Error): void {
    console.log('Error: %s', e);
    this.onEndLoading();
  }

  /**
   * Helper method to call when the page 'starts' loading
   */
  private onStartLoading(): void {
    this.isLoading = true;
  }

  /**
   * Helper method to call when the page 'finishes' loading
   */
  private onEndLoading(): void {
    this.isLoading = false;
  }
}

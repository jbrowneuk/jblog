import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PostDataWrapper } from '../../model/post-data';
import { TitleService } from '../../shared/title.service';
import { JournalFacade } from '../state/journal.facade';

@Component({
    selector: 'jblog-post-list',
    templateUrl: './post-list.component.html',
    standalone: false
})
export class PostListComponent implements OnInit {
  public postData$?: Observable<PostDataWrapper | undefined>;
  public tag: string;

  constructor(
    private postFacade: JournalFacade,
    private route: ActivatedRoute,
    private title: TitleService
  ) {
    this.tag = '';
  }

  public get loading$(): Observable<boolean> {
    return this.postFacade.postListLoading$;
  }

  ngOnInit(): void {
    this.tag = '';
    this.postData$ = this.route.params.pipe(
      switchMap(params => {
        const page = +params['page'] || 1;
        this.tag = params['tag'] || '';
        this.updateTitle(page, this.tag);
        this.postFacade.loadPostList(page, this.tag);
        return this.postFacade.postList$;
      })
    );
  }

  public calculateUrlComponents(): string[] {
    const urlComponents = ['journal'];
    if (this.tag) {
      urlComponents.push('tag', this.tag);
    }

    return urlComponents;
  }

  private updateTitle(page: number, tag: string): void {
    const baseTitle = 'Journal';
    const tagInfo = tag ? `posts tagged ${tag}, ` : '';
    const pageInfo = `page ${page}`;

    this.title.setTitle(`${baseTitle} - ${tagInfo}${pageInfo}`);
  }
}

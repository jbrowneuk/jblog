import { BehaviorSubject } from 'rxjs';

import { Component, OnInit } from '@angular/core';

import { TitleService } from '../../shared/title.service';

/**
 * This component wraps the {@link ProjectsContainerComponent} and adds some
 * information about the projects in general. It contains no real logic, instead
 * delegating tasks etc. to the contained components.
 */
@Component({
    selector: 'jblog-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss'],
    standalone: false
})
export class ProjectListComponent implements OnInit {
  public archiveVisible$: BehaviorSubject<boolean>;

  constructor(private titleService: TitleService) {
    this.archiveVisible$ = new BehaviorSubject(false);
  }

  ngOnInit() {
    this.titleService.setTitle('Code');
  }

  public setArchiveVisible(reqVisibility: boolean): void {
    if (reqVisibility === this.archiveVisible$.value) {
      return;
    }

    this.archiveVisible$.next(reqVisibility);
  }
}

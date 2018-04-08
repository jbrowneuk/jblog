import { Component, OnInit } from '@angular/core';

import { TitleService } from '../../shared/title.service';
import { FeatureToggleService } from '../../shared/feature-toggle.service';
import { FEATURE_TOGGLES } from '../../shared/feature-toggles';

/**
 * The component that renders the top (home) page.
 */
@Component({
  selector: 'jblog-top-page',
  templateUrl: './top-page.component.html',
  styleUrls: [
    './top-page.component.scss'
  ]
})
export class TopPageComponent implements OnInit {
  public hasDetailedProjects: boolean;

  constructor(private titleService: TitleService, private featureToggles: FeatureToggleService) {}

  ngOnInit() {
    this.titleService.resetTitle();
    this.hasDetailedProjects = this.featureToggles.isEnabled(FEATURE_TOGGLES.improvedProjectOutline);
  }
}

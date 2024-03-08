import { MarkdownModule } from 'ngx-markdown';

import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormattedTextComponent } from './formatted-text/formatted-text.component';
import { LineSplittingPipe } from './line-splitting.pipe';
import { LoadSpinnerComponent } from './load-spinner/load-spinner.component';
import { PaginationComponent } from './pagination/pagination.component';
import { RatingBarComponent } from './rating-bar/rating-bar.component';
import { TitleService } from './title.service';
import { TransitionCompleteService } from './transition-complete.service';
import { UnixEpochPipe } from './unix-epoch.pipe';
import { UserMenuComponent } from './user-menu/user-menu.component';

const CORE_COMPONENTS = [
  LineSplittingPipe,
  UnixEpochPipe,
  LoadSpinnerComponent,
  PaginationComponent,
  FormattedTextComponent,
  UserMenuComponent,
  RatingBarComponent
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild([]), MarkdownModule.forRoot()],
  declarations: CORE_COMPONENTS,
  exports: CORE_COMPONENTS
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [TitleService, TransitionCompleteService]
    };
  }
}

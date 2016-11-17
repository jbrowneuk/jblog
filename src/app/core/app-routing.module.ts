import { NgModule }             from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MonthDetailComponent }   from "../calendar/month-detail.component";
import { YearOverviewComponent }  from "../calendar/year-overview.component";
import { AlbumFolderComponent }   from "../gallery/album-folder.component";
import { ImageViewComponent }     from "../gallery/image-view.component";
import { AboutComponent }         from "../home/about.component";
import { HomeComponent }          from "../home/home.component";
import { JournalComponent }       from "../journal/journal.component";
import { PostComponent }          from "../journal/post.component";
import { ProjectListComponent }   from "../projects/project-list.component";

import { ErrorComponent }         from "../shared/error.component";

const routes: Routes = [
  { path: "about",                        component: AboutComponent },
  { path: "art/view/:id",                 component: ImageViewComponent },
  { path: "art/album/:album/page/:page",  component: AlbumFolderComponent },
  { path: "art/album/:album",             component: AlbumFolderComponent },
  { path: "art/page/:page",               component: AlbumFolderComponent },
  { path: "art",                          component: AlbumFolderComponent },
  { path: "calendar/:year/:id",           component: MonthDetailComponent },
  { path: "calendar",                     component: YearOverviewComponent },
  { path: "code",                         component: ProjectListComponent },
  { path: "journal/page/:page",           component: JournalComponent },
  { path: "journal",                      component: JournalComponent },
  { path: "",                             component: HomeComponent, pathMatch: "full" },
  { path: "**",                           component: ErrorComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

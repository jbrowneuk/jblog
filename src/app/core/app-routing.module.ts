import { NgModule }             from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MonthDetailComponent }   from "../calendar/month-detail.component";
import { YearOverviewComponent }  from "../calendar/year-overview.component";
import { AboutComponent }         from "../home/about.component";
import { HomeComponent }          from "../home/home.component";
import { JournalComponent }       from "../journal/journal.component";

import { ErrorComponent }         from "../shared/error.component";

const routes: Routes = [
  { path: "about",              component: AboutComponent },
  { path: "art",                redirectTo: "/calendar" },
  { path: "calendar/:year/:id", component: MonthDetailComponent },
  { path: "calendar",           component: YearOverviewComponent },
  { path: "journal",            component: JournalComponent },
  { path: "",                   component: HomeComponent },
  { path: "**",                 component: ErrorComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

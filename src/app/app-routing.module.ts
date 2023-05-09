import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@components/home/home.component';
import { ResearchInterestComponent } from '@components/research-interest/research-interest.component';
import { WorkInProgressComponent } from '@components/work-in-progress/work-in-progress.component';
import { ThesisProposalsComponent } from '@components/thesis-proposals/thesis-proposals.component';
import { AdminLoginComponent } from '@components/admin-login/admin-login.component';
import { AuthGuard } from './guard/auth.guard';
import { UnauthorizedComponent } from '@components/unauthorized/unauthorized.component';
import { ThesisFormComponent } from '@components/thesis-form/thesis-form.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'research-interest', component: ResearchInterestComponent },
  { path: 'thesis-proposals', children: [
      { path: '', component: ThesisProposalsComponent, canActivate: [AuthGuard] },
      { path: 'thesis-form', component: ThesisFormComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: 'work-in-progress', component: WorkInProgressComponent },
  { path: 'admin', component: AdminLoginComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true, //useHash is mandatory for GitHub pages publishing, otherwise on refresh the user is redirected to 404 page
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 25], // cool option, or ideal option when you have a fixed header on top.
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@components/home/home.component';
import { ResearchInterestComponent } from '@components/research-interest/research-interest.component';
import { WorkInProgressComponent } from '@components/work-in-progress/work-in-progress.component';
import { ThesisProposalsComponent } from '@components/thesis-proposals/thesis-proposals.component';
import { AdminLoginComponent } from '@components/admin-login/admin-login.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'research-interest', component: ResearchInterestComponent, canActivate: [AuthGuard] },
  { path: 'thesis-proposals', component: ThesisProposalsComponent, canActivate: [AuthGuard] },
  { path: 'work-in-progress', component: WorkInProgressComponent },
  { path: 'admin', component: AdminLoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],  //useHash is mandatory for GitHub pages publishing, otherwise on refresh the user is redirected to 404 page
  exports: [RouterModule]
})
export class AppRoutingModule { }

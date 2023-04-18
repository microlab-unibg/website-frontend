import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@components/home/home.component';
import { ResearchInterestComponent } from '@components/research-interest/research-interest.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'research-interest', component: ResearchInterestComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],  //useHash is mandatory for GitHub pages publishing, otherwise on refresh the user is redirected to 404 page
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { FooterComponent } from '@components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from '@components/home/home.component';
import { ResearchInterestComponent } from '@components/research-interest/research-interest.component';
import { WorkInProgressComponent } from '@components/work-in-progress/work-in-progress.component';
import { ThesisProposalsComponent } from '@components/thesis-proposals/thesis-proposals.component';

import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

import { environment } from '@environments/environment';
import { PeopleCarouselComponent } from './components/people-carousel/people-carousel.component';
import { PersonCardComponent } from './components/person-card/person-card.component';
import { ThesisFormComponent } from './components/thesis-form/thesis-form.component';
import { ProjectsComponent } from './components/projects/projects.component';

import { GapsOnIceComponent } from './components/gaps-on-ice/gaps-on-ice.component';
import { GiroEComponent } from './components/giro-e/giro-e.component';
import { ResourcesComponent } from './components/resources/resources.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ResearchInterestComponent,
    WorkInProgressComponent,
    ThesisProposalsComponent,
    AdminLoginComponent,
    UnauthorizedComponent,
    PeopleCarouselComponent,
    PersonCardComponent,
    ThesisFormComponent,
    ProjectsComponent,
    GapsOnIceComponent,
    GiroEComponent,
    ResourcesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    FontAwesomeModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            environment.google_client_id
          )
        }
      ],
      onError: (err: any) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

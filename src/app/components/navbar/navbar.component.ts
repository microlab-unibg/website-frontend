import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserSessionService } from '@services/user-session.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  collapsed = true;
  isLogged = false;


  destroyed$ = new Subject<boolean>();

  currentUser: SocialUser | undefined;

  showUserMenu = false;


  constructor(public userService: UserSessionService) {

  }

  ngOnInit() {
    this.userService.loggedSubject.pipe(takeUntil(this.destroyed$)).subscribe(
      isLogged => {
        this.isLogged = isLogged
      }
    )

    this.userService.currentUser$.pipe(takeUntil(this.destroyed$)).subscribe(
      user => this.currentUser = user
    )
  }

  logout() {
    this.showUserMenu = false;
    this.userService.signOut()
  }



  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }
}

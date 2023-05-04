import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { UserSessionService } from '@services/user-session.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  user: SocialUser = new SocialUser;
  isLogged?= false;

  destroyed$ = new Subject<boolean>();


  constructor(private authService: SocialAuthService, private userService: UserSessionService) { }



  ngOnInit() {

    /* This code is subscribing to the `logged$` observable of the `UserSessionService` and using the
    `takeUntil` operator to unsubscribe when the `destroyed$` subject emits a value. */
    this.userService.loggedSubject.subscribe(
      isLogged => {
        this.isLogged = isLogged

        if (this.isLogged) {
          this.user = this.userService.getCurrentUser()
        }
      }
    )

    this.authService.authState.subscribe((user) => {
      //TODO: manage unauthorized users show proper message
      this.userService.saveUserData(user);
    });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }
}

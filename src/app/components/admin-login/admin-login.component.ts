import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { UserSessionService } from '@services/user-session.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  user: SocialUser = new SocialUser;
  isLogged?= false;

  constructor(private authService: SocialAuthService, private userService: UserSessionService) { }

  ngOnInit() {
    this.isLogged = this.userService.getCurrentUser().name ? true : false;
    if (this.isLogged) {
      this.user = this.userService.getCurrentUser()
      console.log(this.userService.getCurrentUser())
    }
    else {
      this.authService.authState.subscribe((user) => {

        //TODO: manage unauthorized users show proper message
        this.user = user;
        this.isLogged = user != null
        this.userService.saveUserData(user);
      });
    }


  }


  signOut(): void {
    this.authService.signOut();
  }
}

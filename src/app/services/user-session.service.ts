import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {
  constructor() {}

  getCurrentUser(): SocialUser {
    return  Object.assign(new SocialUser, sessionStorage.getItem('user'));
  }

  saveUserData(user: SocialUser) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }


  isAuthorized(user: SocialUser) {
    // TODO: manage sensitive data. Find a way to use secrets on github actions/pages
    console.log(user)
    return true
  }
}

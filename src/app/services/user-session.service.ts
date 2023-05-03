import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService implements OnDestroy {
  destroyed$ = new Subject<boolean>();

  constructor() { }


  getCurrentUser() {
    console.log(localStorage.getItem('user'))
    return Object.assign(new SocialUser, localStorage.getItem('user'));
  }

  saveUserData(user: SocialUser) {
    localStorage.setItem('user', JSON.stringify(user));
  }


  isAuthorized(user: SocialUser) {
    // TODO: manage sensitive data. Find a way to use secrets on github actions/pages
    console.log(user)
    return true
  }

  ngOnDestroy() {
    localStorage.removeItem('user');
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }
}

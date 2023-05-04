import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService implements OnDestroy {
  destroyed$ = new Subject<boolean>();

  public currentUserSubject: BehaviorSubject<SocialUser>;
  public currentUser$: Observable<SocialUser>;

  public loggedSubject: BehaviorSubject<boolean>;
  public logged$: Observable<boolean>;

  private forbiddenPaths = ['/thesis-proposals', '/research-interest']
  private authorized = ['luigi gaioni', 'gianluca traversi', 'massimo manghisoni', 'valerio re', 'elisa riceputi', 'andrea galliani', 'paolo lazzaroni', 'luca ghislotti']



  constructor(public router: Router) {



    let isLogged = false;
    if (this.getCurrentUser().email) {
      isLogged = true
    } else { isLogged = false }

    this.currentUserSubject = new BehaviorSubject<SocialUser>(Object.assign(new SocialUser, JSON.parse(localStorage.getItem('microlab-user')!)));
    this.currentUser$ = this.currentUserSubject.asObservable();

    this.loggedSubject = new BehaviorSubject<boolean>(false)
    this.logged$ = this.loggedSubject.asObservable()
    this.loggedSubject.next(isLogged)

  }


  getCurrentUser() {
    return Object.assign(new SocialUser, JSON.parse(localStorage.getItem('microlab-user') || '{}'));
  }

  saveUserData(user: SocialUser) {
    if (this.authorized.includes(user.name.toLowerCase())) {
      console.log(user.name + ' authorized')
      localStorage.setItem('microlab-user', JSON.stringify(user));
      this.currentUserSubject.next(user)
      this.loggedSubject.next(true)
    }
    else {
      this.loggedSubject.next(false)
      this.router.navigate(['/unauthorized'])


    }

  }


  signOut(): void {
    this.loggedSubject.next(false)
    this.currentUserSubject.next(Object.assign(new SocialUser, JSON.parse('{}')))
    localStorage.removeItem('microlab-user');

    if (this.forbiddenPaths.includes(this.router.url)) {
      this.router.navigate(['/work-in-progress'])

    }
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }
}

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
  private authorized = ['luigi.gaioni@unibg.it', 'gianluca.traversi@unibg.it', 'massimo.manghisoni@unibg.it', 'valerio.re@unibg.it', 'elisa.riceputi@unibg.it', 'andrea.galliani@unibg.it', 'paolo.lazzaroni@unibg.it', 'luca.ghislotti@unibg.it', 'stefano.sanvito@unibg.it']

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
    if (this.authorized.includes(user.email.toLowerCase())) {
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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserSessionService } from '@services/user-session.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {
  isLogged: boolean = false;
  destroyed$ = new Subject<boolean>();

  constructor(private userSession: UserSessionService) { }

  ngOnInit() {
    this.userSession.loggedSubject.pipe(takeUntil(this.destroyed$)).subscribe(isLogged => {
      this.isLogged = isLogged
    })
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }
}

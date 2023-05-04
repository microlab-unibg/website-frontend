import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserSessionService } from '@services/user-session.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-thesis-proposals',
  templateUrl: './thesis-proposals.component.html',
  styleUrls: ['./thesis-proposals.component.css']
})
export class ThesisProposalsComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject<boolean>();

  isLogged = false


  constructor(private userService: UserSessionService) { }
  ngOnInit(): void {
    this.userService.loggedSubject.pipe(takeUntil(this.destroyed$)).subscribe(
      isLogged => {
        this.isLogged = isLogged
      }
    )
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

}

import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { UserSessionService } from '@services/user-session.service';
import { Subject, takeUntil } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { faFilePdf } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-thesis-proposals',
  templateUrl: './thesis-proposals.component.html',
  styleUrls: ['./thesis-proposals.component.css']
})
export class ThesisProposalsComponent implements OnInit, OnDestroy {
  // FontAwesome
  faFilePdf = faFilePdf;

  destroyed$ = new Subject<boolean>();
  isLogged = false

  constructor(private userService: UserSessionService) {
    const aCollection = collection(this.firestore, 'thesis-proposals')
    this.thesis$ = collectionData(aCollection) as Observable<Thesis[]>;
  }
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

  // Setup firestore
  firestore: Firestore = inject(Firestore)
  thesis$: Observable<Thesis[]>;
}
export interface Thesis {
  title: string;
  img: null;
  description: string;
  pdf: null;
}
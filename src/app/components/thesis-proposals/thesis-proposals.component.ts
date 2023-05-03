import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { UserSessionService } from '@services/user-session.service';

@Component({
  selector: 'app-thesis-proposals',
  templateUrl: './thesis-proposals.component.html',
  styleUrls: ['./thesis-proposals.component.css']
})
export class ThesisProposalsComponent implements OnInit {

  user: SocialUser | undefined;

  constructor(private userService: UserSessionService) { }
  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();
  }

}

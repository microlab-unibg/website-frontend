import { Component } from '@angular/core';
import { faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';
import { FacebookService, InitParams } from 'ngx-facebook';

@Component({
  selector: 'app-gaps-on-air',
  templateUrl: './gaps-on-air.component.html',
  styleUrls: ['./gaps-on-air.component.css']
})
export class GapsOnAirComponent {
  // FontAwesome
  faSquareXTwitter = faSquareXTwitter;

  constructor(private fb: FacebookService) {

    const initParams: InitParams = {
      appId: '1234566778',
      xfbml: true,
      version: 'v2.8'
    };

    fb.init(initParams);
  }
}

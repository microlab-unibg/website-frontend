import { Component } from '@angular/core';
import { faResearchgate } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  collapsed = true;

  // FontAwesome
  faResearchgate = faResearchgate;
}

import { Component } from '@angular/core';
import { faResearchgate } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  // FontAwesome
  faResearchgate = faResearchgate;
}

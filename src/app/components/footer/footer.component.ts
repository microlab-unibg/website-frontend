import { Component } from '@angular/core';
import { faResearchgate } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { IconProp } from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  // FontAwesome
  faResearchgate = faResearchgate;
  faEnvelope = faEnvelope;
}

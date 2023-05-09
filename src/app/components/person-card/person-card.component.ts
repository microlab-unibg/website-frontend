import { Component, Input } from '@angular/core';

interface Person {
  fullname?: string;
  role?: string,
  image_link?: string;
  page_link?: string
}

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.css']
})
export class PersonCardComponent {

  @Input('personInfo') personInfo: Person = {};

  onImageClick(link: string | URL | undefined) {
    window.open(link, "_blank");
  }

}



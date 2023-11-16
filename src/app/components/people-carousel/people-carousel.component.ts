import { Component, ViewChild } from '@angular/core';
import { NgbCarousel, NgbCarouselModule, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

interface Person {
  fullname?: string;
  role?: string,
  image_link?: string;
  page_link?: string
}

@Component({
  selector: 'app-people-carousel',
  templateUrl: './people-carousel.component.html',
  styleUrls: ['./people-carousel.component.css']
})

export class PeopleCarouselComponent {
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  people: Person[] = [];

  @ViewChild('carousel', { static: true })
  carousel!: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }

  ngOnInit() {
    this.people = [
      {
        fullname: "Valerio Re",
        role: "Full Professor",
        image_link: "https://didattica-rubrica.unibg.it/sites/default/files/styles/foto_personale/public/foto/18-11-2020/valeriore.jpg?itok=QA8gZjWv",
        page_link: 'https://didattica-rubrica.unibg.it/ugov/person/2126'
      },
      {
        fullname: "Massimo Manghisoni",
        role: "Full Professor",
        image_link: "https://didattica-rubrica.unibg.it/sites/default/files/styles/foto_personale/public/foto/18-11-2020/massimomanghisoni.jpg?itok=cY6M3PJn",
        page_link: 'https://didattica-rubrica.unibg.it/ugov/person/3863'
      },
      {
        fullname: "Gianluca Traversi",
        role: "Associate Professor",
        image_link: "https://didattica-rubrica.unibg.it/sites/default/files/styles/foto_personale/public/foto/17-11-2020/gianlucatraversi_0.jpg?itok=LEpJx9I8",
        page_link: 'https://didattica-rubrica.unibg.it/ugov/person/2025'
      },
      {
        fullname: "Luigi Gaioni",
        role: "Associate Professor",
        image_link: "https://didattica-rubrica.unibg.it/sites/default/files/styles/foto_personale/public/foto/27-01-2022/gaioni_2022_0.png?itok=xwGf3W-p",
        page_link: 'https://didattica-rubrica.unibg.it/ugov/person/1912'
      },
      {
        fullname: "Elisa Riceputi",
        role: "Research Fellow",
        image_link: "https://media.licdn.com/dms/image/C5603AQG7MriSe0NcvQ/profile-displayphoto-shrink_800_800/0/1517027392938?e=2147483647&v=beta&t=HKbO3u5lWMJL1u-W95hDYh2gGz-V1ZB_1IU4ZI7n12k",
        page_link: 'https://didattica-rubrica.unibg.it/ugov/person/23631'
      },
      {
        fullname: "Paolo Lazzaroni",
        role: "Research Fellow",
        image_link: "https://didattica-rubrica.unibg.it/sites/default/files/styles/foto_personale/public/foto/17-11-2020/photo_face_0.jpg?itok=Ub6ffGMR",
        page_link: 'https://didattica-rubrica.unibg.it/ugov/person/52719'
      },
      {
        fullname: "Andrea Galliani",
        role: "Ph.D. Student",
        image_link: "https://didattica-rubrica.unibg.it/sites/default/files/styles/foto_personale/public/foto/27-10-2022/1653337271785.jpg?itok=JvdMnetv",
        page_link: 'https://didattica-rubrica.unibg.it/ugov/person/109144'
      },
      {
        fullname: "Luca Ghislotti",
        role: "Ph.D. Student",
        image_link: "https://didattica-rubrica.unibg.it/sites/default/files/styles/foto_personale/public/foto/26-10-2022/immagine_luca.jpg?itok=wJSpkYJD",
        page_link: 'https://didattica-rubrica.unibg.it/ugov/person/135728'
      },
      {
        fullname: "Stefano Sanvito",
        role: "Ph.D. Student",
        image_link: "https://media.licdn.com/dms/image/D4E03AQEGDZdGY_YK-A/profile-displayphoto-shrink_800_800/0/1629919271919?e=2147483647&v=beta&t=tSad18xPWPOFZet-git9Ts83_yGb38xkmGBvqrujg_U",
        page_link: 'https://didattica-rubrica.unibg.it/ugov/person/127647'
      },
      {
        fullname: "Matteo Verzeroli",
        role: "Ph.D. Student",
        image_link: "https://media.licdn.com/dms/image/D4D03AQEHn_QNGoTd7g/profile-displayphoto-shrink_800_800/0/1697054583090?e=1705536000&v=beta&t=Kf0y_eQXYvCHAZzLm3xhFzrsAnqLsMikuPfxRZy1jUg",
        page_link: 'https://didattica-rubrica.unibg.it/ugov/person/88527'
      },
    ]
  }
}

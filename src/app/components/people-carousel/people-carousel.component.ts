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
        image_link: "https://aisberg.unibg.it/rm/public/picture/img/it.cilea.ga.model.Person/141d8aa1-c8c0-43ad-8788-88ab2401ac5a.fragment",
        page_link: 'https://didattica-rubrica.unibg.it/ugov/person/2126'
      },
      {
        fullname: "Massimo Manghisoni",
        role: "Full Professor",
        image_link: "https://aisberg.unibg.it/rm/public/picture/img/it.cilea.ga.model.Person/27040384-f306-4dd6-93fd-594588393cb7.fragment",
        page_link: 'https://didattica-rubrica.unibg.it/ugov/person/3863'
      },
      {
        fullname: "Gianluca Traversi",
        role: "Associate Professor",
        image_link: "https://aisberg.unibg.it/rm/public/picture/img/it.cilea.ga.model.Person/282701ea-a844-41bd-bb3b-b589d3ca8546.fragment",
        page_link: 'https://didattica-rubrica.unibg.it/ugov/person/2025'
      },
      {
        fullname: "Luigi Gaioni",
        role: "Associate Professor",
        image_link: "https://aisberg.unibg.it/rm/public/picture/img/it.cilea.ga.model.Person/167a02fb-b4c7-4cef-bdc9-385b4aa96661.fragment",
        page_link: 'https://didattica-rubrica.unibg.it/ugov/person/1912'
      },
      {
        fullname: "Elisa Riceputi",
        role: "Research Fellow",
        image_link: "https://aisberg.unibg.it/rm/public/picture/img/it.cilea.ga.model.Person/10d2a921-3499-4958-9bf1-589f7c465bbe.fragment",
        page_link: 'https://didattica-rubrica.unibg.it/ugov/person/23631'
      },
      {
        fullname: "Paolo Lazzaroni",
        role: "Research Fellow",
        image_link: "https://pollostrazon.github.io/assets/img/paolo.jpg?10bfe6da33d5d816f5f86be703ef195c",
        page_link: 'https://pollostrazon.github.io/'
      },
      {
        fullname: "Andrea Galliani",
        role: "Ph.D. Student",
        image_link: "https://agalliani.github.io/propic.webp",
        page_link: 'https://agalliani.github.io/'
      },
      {
        fullname: "Luca Ghislotti",
        role: "Ph.D. Student",
        image_link: "https://lucaghislotti.com/assets/img/luca_pic.jpg?7cbaf38f87421a64466fa40d133eccc4",
        page_link: 'https://lucaghislotti.com/'
      },
      {
        fullname: "Matteo Verzeroli",
        role: "Ph.D. Student",
        image_link: "https://microlab-unibg.it/assets/img/verze_linkedin_profile_pic.jpg",
        page_link: 'https://didattica-rubrica.unibg.it/ugov/person/88527'
      },
    ]
  }
}

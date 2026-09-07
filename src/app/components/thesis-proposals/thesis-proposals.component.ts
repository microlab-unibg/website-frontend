import { Component, OnDestroy, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { UserSessionService } from '@services/user-session.service';
import { SupabaseService } from '@services/supabase.service';
import { Subject, takeUntil } from 'rxjs';

import { faFilePdf, faTrashCan, faPenToSquare, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { Thesis } from '@models/thesis';
import { Router } from '@angular/router';

import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-thesis-proposals',
  templateUrl: './thesis-proposals.component.html',
  styleUrls: ['./thesis-proposals.component.css']
})
export class ThesisProposalsComponent implements OnInit, OnDestroy {
  // FontAwesome
  faFilePdf = faFilePdf;
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  faPlus = faPlus;
  faEnvelope = faEnvelope;

  destroyed$ = new Subject<boolean>();
  isLogged = false;

  thesis: Thesis[];
  filteredThesis: Thesis[];
  doneThesis: Thesis[];

  // Modal options
  ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false
  };

  // for show more/less
  needsShow: boolean[] = [];
  show: boolean[] = [];

  // for filter
  filterSelection: string = 'All';

  constructor(
    private userService: UserSessionService,
    private supabase: SupabaseService,
    private router: Router,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.thesis = [];
    this.filteredThesis = [];
    this.doneThesis = [];
    this.supabase.watchTheses().pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      data.sort(function(t1, t2){
        var d1 = t1.date.split('/').reverse().join(),
            d2 = t2.date.split('/').reverse().join();
        return d1 > d2 ? 1 : (d1 < d2 ? -1 : 0);
      })
      data.sort((t1,t2) => {
        const s1 = t1.status;
        const s2 = t2.status;
        if (!s1 || s1 === 'available') {
          return -1;
        } else if (!s2 || s2 === 'available') {
          return 1;
        } else {
          if (s1 === 'ongoing') {
            return -1;
          } else if (s2 === 'ongoing') {
            return 1;
          } else {
            return 0;
          }
        }
      })
      data.map((t) => t.status = 'status' in t && t.status ? t.status : 'available')
      // for read more/less
      data.forEach((t, idx) => {
        this.needsShow[idx] = t.description.length < 140 ? false : true;
        this.show[idx] = false;
        t.imgUrl = t.imgRef ? this.supabase.getPublicUrl(t.imgRef) : '';
      });
      this.thesis = data;
      this.filteredThesis = this.thesis;
      this.ngZone.run(() => this.cdr.detectChanges());
    });
  }

  ngOnInit(): void {
    this.userService.loggedSubject.pipe(takeUntil(this.destroyed$)).subscribe(
      isLogged => {
        this.isLogged = isLogged;
      }
    )
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/');
    return new Date(+year, +month, +day);
  }

  downloadFromUrl(pdfRef: string) {
    if (pdfRef) {
      this.supabase.downloadBlob(pdfRef)
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          window.open(url);
        })
        .catch(() => {
          return;
        });
    }
  }

  stringToColour(str: string) {
    let hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '0';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      colour += value.toString();
    }
    return colour;
  }

  editThesis(docId: string) {
    this.supabase.getThesis(docId)
      .then((docObj) => {
        if (!docObj) {
          return;
        }
        this.router.navigate(['thesis-proposals/thesis-form'], {
          queryParams: {
            id: docId,
            docObj: JSON.stringify({
              title: docObj.title,
              description: docObj.description,
              imgRef: docObj.imgRef,
              pdfRef: docObj.pdfRef,
              master: docObj.master,
              bachelor: docObj.bachelor,
              status: docObj.status,
              author: docObj.author,
              date: docObj.date,
              email: docObj.email
            })
          }
        });
      });
  }

  deleteThesis(docId: string) {
    this.supabase.getThesis(docId)
      .then(async (docObj) => {
        if (!docObj) {
          return;
        }
        if (docObj.pdfRef) {
          try {
            await this.supabase.deleteFile(docObj.pdfRef);
          } catch {
            console.log("PDF delete unsuccessful.")
          }
        }
        if (docObj.imgRef) {
          try {
            await this.supabase.deleteFile(docObj.imgRef);
          } catch {
            console.log("Img delete unsuccessful.")
          }
        }
        try {
          await this.supabase.deleteThesis(docId);
        } catch {
          console.log("Document delete unsuccessful.")
        }
      });
  }

  filterThesis(type: string) {
    this.filterSelection = type;
    type = type.toLowerCase();
    if (type === "bachelor") {
      this.filteredThesis = this.thesis.filter((t) => {
        return t.bachelor;
      })
    } else if (type === "master") {
      this.filteredThesis = this.thesis.filter((t) => {
        return t.master;
      })
    } else {
      this.filteredThesis = this.thesis;
    }
  }

  openModal(modal: any) {
		this.modalService.open(modal, this.ngbModalOptions).result.then(
			(result) => {
        if (result) {
          this.deleteThesis(result);
        }
      },
			(reason) => { }
		);
	}
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserSessionService } from '@services/user-session.service';
import { SupabaseService } from '@services/supabase.service';
import { Subject, takeUntil } from 'rxjs';

import { faFilePdf, faTrashCan, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { Thesis } from '@models/thesis';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-thesis-form',
  templateUrl: './thesis-form.component.html',
  styleUrls: ['./thesis-form.component.css']
})
export class ThesisFormComponent implements OnInit, OnDestroy {
  // FontAwesome
  faFilePdf = faFilePdf;
  faPenToSquare = faPenToSquare;
  faTrashCan = faTrashCan;
  faPlus = faPlus;

  destroyed$ = new Subject<boolean>();
  isLogged = false

  constructor(
    private userService: UserSessionService,
    private supabase: SupabaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userService.loggedSubject.pipe(takeUntil(this.destroyed$)).subscribe(
      isLogged => {
        this.isLogged = isLogged
      }
    )

    this.route
      .queryParams
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        if ('id' in data) {
          this.thesis.id = data.id;
          const docObj = JSON.parse(data.docObj);
          this.thesis.title = docObj.title;
          this.thesis.description = docObj.description;
          this.thesis.imgRef = docObj.imgRef;
          this.thesis.pdfRef = docObj.pdfRef;
          this.thesis.master = docObj.master;
          this.thesis.bachelor = docObj.bachelor;
          this.thesis.status = docObj.status;
          this.thesis.author = docObj.author;
          this.thesis.date = docObj.date;
          this.thesis.email = docObj.email;
          this.manualValidForm = true;
        } else {
          this.thesis.author = this.user.name;
          this.thesis.email = this.user.email;
        }
      });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  // for template
  // get info from auth
  user = this.userService.getCurrentUser();
  thesis = new Thesis();

  PDFBlob: File | '' = '';
  imgBlob: File | '' = '';
  // for validation
  validPDFFile = false;
  validImgFile = true;
  manualValidForm = false;

  padDate (n: number) {
    return n < 10 ? '0' + n : n;
  }

  async onSubmit() {
    try {
      if (this.imgBlob) {
        this.thesis.imgRef = await this.supabase.uploadFile(this.imgBlob, 'img/');
      }
      if (this.PDFBlob) {
        this.thesis.pdfRef = await this.supabase.uploadFile(this.PDFBlob, 'pdf/');
      }

      var dateobj = new Date();
      var dateString = this.padDate(dateobj.getDate()) + "/"
                 + this.padDate(dateobj.getMonth() + 1) + "/"
                 + dateobj.getFullYear();
      this.thesis.date = dateString;

      if (!this.thesis.id) {
        await this.supabase.insertThesis(this.thesis);
      } else {
        await this.supabase.updateThesis(this.thesis.id, this.thesis);
      }
      this.router.navigate(['/thesis-proposals']);
    } catch (error) {
      console.error('Failed to save thesis proposal', error);
    }
  }

  onPDFChange(event: any) {
    if (event.target.files.length > 0) {
      const selectedPDFFile: File = event.target.files[0];
      if (selectedPDFFile) {
        if (selectedPDFFile.type !== "application/pdf") {
          this.validPDFFile = false;
        } else {
          this.validPDFFile = true;
          this.PDFBlob = selectedPDFFile;
        }
      }
    }
  }

  onImgChange(event: any) {
    if (event.target.files.length > 0) {
    console.log(event.target.files[0]);
      const selectedImgFile: File = event.target.files[0];
      if (selectedImgFile) {
        if (selectedImgFile.type !== "image/png" &&
            selectedImgFile.type !== "image/jpg" &&
            selectedImgFile.type !== "image/jpeg") {
          this.validImgFile = false;
        } else {
          this.validImgFile = true;
          this.imgBlob = selectedImgFile;
        }
      } else {
        this.validImgFile = true;
        this.imgBlob = "";
      }
    }
  }
}

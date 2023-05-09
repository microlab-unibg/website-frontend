import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { UserSessionService } from '@services/user-session.service';
import { Subject, takeUntil } from 'rxjs';
import { Firestore, collection, collectionData, addDoc, CollectionReference, DocumentReference, doc, updateDoc } from '@angular/fire/firestore';
import { Storage, StorageReference, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Observable } from 'rxjs';

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

  constructor(private userService: UserSessionService, private router: Router, private route: ActivatedRoute) {
    this.thesisCollection = collection(this.firestore, 'thesis-proposals')
    this.thesis$ = collectionData(this.thesisCollection) as Observable<Thesis[]>;
  }
  ngOnInit(): void {
    this.userService.loggedSubject.pipe(takeUntil(this.destroyed$)).subscribe(
      isLogged => {
        this.isLogged = isLogged
      }
    )

    const sub = this.route
      .queryParams
      .subscribe((data) => {
        if ('id' in data) {
          this.thesis.id = data.id;
          const docObj = JSON.parse(data.docObj);
          this.thesis.title = docObj.title;
          this.thesis.description = docObj.description;
          this.thesis.imgRef = docObj.imgRef;
          this.thesis.pdfRef = docObj.pdfRef;
          this.thesis.type = docObj.type;
          this.manualValidForm = true;
        }
      });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

  // Setup firestore
  firestore: Firestore = inject(Firestore);
  private readonly storage: Storage = inject(Storage);
  thesis$: Observable<Thesis[]>;
  thesisCollection: CollectionReference;

  // for template
  thesis = new Thesis();
  PDFBlob: any = '';
  imgBlob: any = '';
  // for validation
  validPDFFile = false;
  validImgFile = true;
  manualValidForm = false;

  uploadFile(file: any, parentDir: string): string {
    const storageRef: StorageReference = ref(this.storage, parentDir + file.name);
    uploadBytesResumable(storageRef, file);
    return storageRef.toString();
  }

  onSubmit() {
    // upload img and PDF
    if (this.imgBlob) {
      this.thesis.imgRef = this.uploadFile(this.imgBlob, 'img/');
    }
    if (this.PDFBlob) {
      this.thesis.pdfRef = this.uploadFile(this.PDFBlob, 'pdf/');
    }

    // convert class to plain JS object
    const thesisToUpload = this.thesis.toPlainObj();
    if (!('id' in this.thesis) || this.thesis.id == "") {
      addDoc(this.thesisCollection, thesisToUpload)
        .then((documentReference: DocumentReference) => {
          this.router.navigate(['/thesis-proposal']);
        });
    } else {
      const docRef: DocumentReference = doc(this.firestore, 'thesis-proposals/' + this.thesis.id);
      console.log(this.thesis.pdfRef);
      updateDoc(docRef, {
        title: this.thesis.title,
        description: this.thesis.description,
        imgRef: this.thesis.imgRef,
        pdfRef: this.thesis.pdfRef,
        type: this.thesis.type
      })
      .then(() => {
        this.router.navigate(['/thesis-proposal']);
      });;
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
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { UserSessionService } from '@services/user-session.service';
import { Subject, takeUntil } from 'rxjs';
import { CollectionReference, DocumentReference, DocumentSnapshot, Firestore, collection, collectionData, deleteDoc, doc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { faFilePdf, faTrashCan, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { Thesis } from '@models/thesis';
import { FirebaseStorage, StorageReference, deleteObject, getBlob, getStorage, ref } from '@angular/fire/storage';
import { Router } from '@angular/router';

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

  destroyed$ = new Subject<boolean>();
  isLogged = false;

  constructor(private userService: UserSessionService, private router: Router) {
    const thesisCollection: CollectionReference = collection(this.firestore, 'thesis-proposals');
    this.thesis$ = collectionData(thesisCollection, { idField: 'id'}) as Observable<Thesis[]>;
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
    this.destroyed$.unsubscribe();
  }

  // Setup firestore
  firestore: Firestore = inject(Firestore)
  thesis$: Observable<Thesis[]>;

  // Setup firebase storage
  storage: FirebaseStorage = getStorage();

  downloadFromUrl(pdfRef: string) {
    const objectRef: StorageReference = ref(this.storage, pdfRef);
    getBlob(objectRef)
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        window.open(url);
      })
      .catch((error) => {
        return;
      });
  }

  editThesis(docId: string) {
    const docRef: DocumentReference = doc(this.firestore, 'thesis-proposals/' + docId);
    getDoc(docRef)
      .then((docSnap) =>{
        // get data
        const docObj = docSnap.data();
        this.router.navigate(['thesis-proposals/thesis-form'], { queryParams: { id: docId, docObj: JSON.stringify(docObj) } });
      });
  }

  deleteThesis(docId: string) {
    const docRef: DocumentReference = doc(this.firestore, 'thesis-proposals/' + docId);
    getDoc(docRef)
      .then((docSnap) =>{
        // pdf delete
        const docObj = docSnap.data();
        if (docObj?.pdfRef) {
          const pdfRef: StorageReference = ref(this.storage, docObj.pdfRef);
          deleteObject(pdfRef)
            .then(() => { })
            .catch((error) => {
              console.log("PDF delete unsuccessful.")
            });
        }
        
        // img delete
        if (docObj?.imgRef) {
          const imgRef: StorageReference = ref(this.storage, docObj?.imgRef);
          deleteObject(imgRef)
            .then(() => { })
            .catch((error) => {
              console.log("Img delete unsuccessful.")
            });
        }

        // delete document
        deleteDoc(docRef)
          .then(() => {})
          .catch((error) => {
            console.log("Document delete unsuccessful.")
          });
      });
  }
}


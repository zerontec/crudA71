import { Injectable } from '@angular/core';
import {AngularFirestore,AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import {BookInterface} from '../models/bookInterface';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor( private afs: AngularFirestore) {


  }

     private booksCollection: AngularFirestoreCollection<BookInterface>;
     private books: Observable<BookInterface[]>;
     private bookDoc: AngularFirestoreDocument<BookInterface> ; //recuperar un documento
     private book: Observable<BookInterface>;
     public selectedBook: BookInterface = {
      id: null
    };

  getAllBooks() {
  this.booksCollection = this.afs.collection<BookInterface>('books');
   return this.books = this.booksCollection.snapshotChanges()
   .pipe(map( changes => {
     return changes.map( action => {
       const data = action.payload.doc.data() as BookInterface;
       data.id = action.payload.doc.id;
       return data;
     });
   }));

  }

  getAllBooksOffers() {
    this.booksCollection = this.afs.collection('books', ref => ref.where('oferta', '==', '1'));
    return this.books = this.booksCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as BookInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  //Detalle

getOneBook(idBook: string){
  this.bookDoc = this.afs.doc<BookInterface>( `books/${idBook}`);
  return this.book = this.bookDoc.snapshotChanges().pipe(map(action => {
    if (action.payload.exists == false ){
      return null;

    } else {
      const data = action.payload.data() as BookInterface;
      data.id = action.payload.id;
      return data;
    }
  }));
}

addBook( book: BookInterface): void {

  this.booksCollection.add(book);
}
updateBook(book: BookInterface): void {
const idBook = book.id; // pendiente usar let 
this.bookDoc = this.afs.doc<BookInterface>(`books/${idBook}`);
this.bookDoc.update(book);

}
deleteBook(idBook: string): void {

  this.bookDoc = this.afs.doc<BookInterface>(`books/${idBook}`);
  this.bookDoc.delete();
}


}

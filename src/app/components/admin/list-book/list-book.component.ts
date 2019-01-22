import { Component, OnInit } from '@angular/core';
import {DataApiService} from '../../../services/data-api.service';
import {BookInterface} from '../../../models/bookInterface';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserInterface} from '../../../models/user';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {

  constructor( private dataApi: DataApiService,  private authService: AuthService ) { }

  private books: BookInterface[];
  //objeto vacio
  public isAdmin: any = null;
  public userUid: string = null;

  ngOnInit() {

    this.getListBooks();
    this.getCurrentUser();
  }

  getCurrentUser(){

    this.authService.isAuth().subscribe(auth => {

      if(auth){

        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
        })
      }
    })
  }


  getListBooks(){

    this.dataApi.getAllBooks().subscribe( books => {
    this.books = books;
    });
  }
onDeleteBook(idBook: string): void {

  
const confirmacion = confirm('Estas seguro');
  if(confirmacion){
    this.dataApi.deleteBook(idBook);

  }
  

}

onPreUpdateBook(book: BookInterface){
  console.log('BOOK', book);

  this.dataApi.selectedBook = Object.assign({}, book);
}
}

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import { finalize} from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor( private AuthServices: AuthService, private router: Router,private storage:AngularFireStorage) { }

  @ViewChild('imageUser') inputImageUser: ElementRef;
  public email:string = '';
  public password: string= '';

  uploadPercent: Observable<number>;
  urlImage : Observable<string>;

  ngOnInit() {
  }


  onUpload(e) {

//console.log('subir' e.target.file[0]);

const id = Math.random().toString(36).substring(2);
const file = e.target.files[0];
const filePath = `uploads/profile_${id}`;
const ref = this.storage.ref(filePath);
const task = this.storage.upload(filePath, file );
this.uploadPercent = task.percentageChanges();
task.snapshotChanges().pipe(finalize (() => this.urlImage = ref.getDownloadURL())).subscribe();

  }

  onAddUser() {

    this.AuthServices.registerUser(this.email, this.password)
    .then((res) => {
this.AuthServices.isAuth().subscribe(user => {
  if (user){
    console.log('userActual', user)
    user.updateProfile({
      displayName: '',
      photoURL: this.inputImageUser.nativeElement.value
    }).then (() => {

    this.router.navigate(['admin/list-books']);
    }).catch( (error) =>  console.log('error', error));

  }
});

    }).catch(err => console.log('err', err.message));
  }

  onLoginGoogle(): void {

    this.AuthServices.loginGoogleUser()
    .then((res) => {
      console.log('resUser', res);
      this.onLoginRedirect();
    }).catch(err => console.log('err', err.message ));
  }

  onLoginFacebook(){

    this.AuthServices.loginFacebookUser()
    .then((res) => {
      this.onLoginRedirect()
      //this.router.navigate(['admin/list-books']);
    }).catch( err => console.log('err', err.message));
  }

 

  onLoginRedirect() : void {
    this.router.navigate(['admin/list-books']);

  }

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeroComponent } from './components/hero/hero.component';
import { HomeComponent } from './components/home/home.component';
import { ModalComponent } from './components/modal/modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OffersComponent } from './components/offers/offers.component';
import { Page404Component } from './components/page404/page404.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { DetailsBookComponent } from './components/details-book/details-book.component';
import { ListBookComponent } from './components/admin/list-book/list-book.component';
import {FormsModule} from '@angular/forms';
import {RoutingModule} from './routing/routing.module';

import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import {environment} from '../environments/environment';
import { RouterModule } from '@angular/router';


import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    HomeComponent,
    ModalComponent,
    NavbarComponent,
    OffersComponent,
    Page404Component,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    DetailsBookComponent,
    ListBookComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    RouterModule

  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }

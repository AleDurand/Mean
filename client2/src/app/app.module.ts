import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterializeModule } from 'ng2-materialize';

import { Router, RouterOutlet, RouterOutletMap } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';

import { AlbumListComponent } from '../pages/albums/album-list/album-list.component';
import { ContactComponent } from '../pages/contact/contact.component';
import { HomeComponent } from '../pages/home/home.component';
import { LoginComponent } from '../pages/login/login.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent, AlbumListComponent, ContactComponent,
    LoginComponent, HomeComponent, PageNotFoundComponent
  ],
  imports: [
    AppRoutingModule, BrowserModule, ComponentsModule.forRoot(),
    FormsModule, HttpModule, MaterializeModule.forRoot(),
    PipesModule, RouterModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [ ],
  providers: [ ]
})
export class AppModule { }

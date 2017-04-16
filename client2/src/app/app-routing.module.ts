import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContactComponent } from '../pages/contact/contact.component';
import { HomeComponent } from '../pages/home/home.component';
import { AlbumListComponent } from '../pages/albums/album-list/album-list.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'birthdays', component: AlbumListComponent, data: { filter: 'birthdays'} },
  { path: 'weddings', component: AlbumListComponent, data: { filter: 'weddings'} },
  { path: 'other-events', component: AlbumListComponent, data: { filter: 'other-events'} },
  { path: 'contact', component: ContactComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

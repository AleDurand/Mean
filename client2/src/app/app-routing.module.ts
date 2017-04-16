import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlbumListComponent } from '../pages/albums/album-list/album-list.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'albums', component: AlbumListComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

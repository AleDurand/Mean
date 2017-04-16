import { Component, ElementRef, Optional, ViewChild } from '@angular/core';

import { TabsComponent } from '../components/tabs/tabs/tabs.component';

import { AlbumListComponent } from '../pages/albums/album-list/album-list.component';

export interface Tab {
  title: string;
  url: string;
  selected: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  public tabs: Array<Tab>;

  @ViewChild(TabsComponent) tabsComponent;

  constructor() {
    this.tabs = [
      { title: 'Inicio', url: '/', selected: false },
      { title: 'Cumplea\u00F1os', url: '/birthdays', selected: false },
      { title: 'Bodas', url: '/weddings', selected: false },
      { title: 'Otros eventos', url: '/other-events', selected: false },
      { title: 'Contacto', url: '/contact', selected: false }
    ];
  }

  selectTab(tab: Tab) {
    
  }

}
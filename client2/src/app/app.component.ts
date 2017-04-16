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
      { title: '15 a\u00F1os', url: '/albums', selected: false },
      { title: 'Bautismos', url: '/albums', selected: false },
      { title: 'Otros eventos', url: '/albums', selected: false },
      { title: 'Contacto', url: '/contact', selected: false }
    ];
  }

  selectTab(tab: Tab) {
    console.log(tab.title);
  }

}

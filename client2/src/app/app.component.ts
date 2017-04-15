import { Component, Optional, ViewChild } from '@angular/core';

export interface Tab {
  title: string;
  component: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  public tabs: Array<Tab>;

  constructor() {
    this.tabs = [
      { title: 'Inicio', component: '' },
      { title: '15 a\u00F1os', component: '' },
      { title: 'Bautismos', component: '' },
      { title: 'Otros eventos', component: '' },
      { title: 'Contacto', component: '' }
    ];
  }

  selectTab(tab: Tab) {
    console.log(tab.title);
  }

}

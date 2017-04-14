import { Component, Optional } from '@angular/core';

export interface Tab {
  title: string;
  component: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public tabs: Array<Tab>;
  public selectedTab: number = 0;
  public smallResolution: boolean;

  constructor() {
    this.tabs = [
      { title: 'Inicio', component: '' },
      { title: '15 a\u00F1os', component: '' },
      { title: 'Bautismos', component: '' },
      { title: 'Otros eventos', component: '' },
      { title: 'Contacto', component: '' }
    ];
  }

  updateSelectedTab($event) {
    this.selectedTab = $event;
  }

  showMenu() {

  }

}

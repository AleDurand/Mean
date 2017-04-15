import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { TabsComponent } from './tabs/tabs/tabs.component';;
import { TabComponent } from './tabs/tab/tab.component';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [TabsComponent, TabComponent ],
  exports: [ TabsComponent, TabComponent ]
})
export class ComponentsModule { }

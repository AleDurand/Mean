import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'ng2-materialize';

import { AppComponent } from './app.component';

import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, ComponentsModule, FormsModule,
    HttpModule, MaterializeModule.forRoot(),
    PipesModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [],
  providers: []
})
export class AppModule { }

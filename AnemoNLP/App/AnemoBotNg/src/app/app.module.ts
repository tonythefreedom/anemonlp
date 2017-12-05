import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { ScrollbarDirective } from "./scrollbar.directive";
import { AppComponent } from './app.component';
import { Logger } from './logger.service';

@NgModule({
  declarations: [
    AppComponent,
    ScrollbarDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [Logger],
  bootstrap: [AppComponent]
})
export class AppModule { }

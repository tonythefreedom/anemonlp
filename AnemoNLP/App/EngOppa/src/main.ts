import {enableProdMode, NgModule} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


if (environment.production) {
  enableProdMode();
}

//지연 로딩
setTimeout(function(){
//app module 부분 가는 곳
platformBrowserDynamic().bootstrapModule(AppModule);
}, 1000);


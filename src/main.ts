import '@angular/localize/init';

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {AppModule} from "./app/app.module";

bootstrapApplication(AppComponent,{
  providers:[importProvidersFrom([AppModule]), provideAnimationsAsync()]
});

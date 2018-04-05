import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ImprintComponent } from './imprint/imprint.component';

import { Image } from './shared/image';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AboutComponent,
    ImprintComponent
  ],
  imports: [BrowserModule, MaterialModule, BrowserAnimationsModule, AppRoutingModule],
  providers: [Image],
  bootstrap: [AppComponent]
})
export class AppModule { }

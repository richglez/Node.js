import { Component, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Route } from "@angular/router";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { DataService } from "../data.service";
import { AboutComponent } from './about/about.component';

const routes: Route[] = [
  {path: '', component: AppComponent},
  {path: 'about', component: AboutComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    provideClientHydration(),
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

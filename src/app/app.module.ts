import { UsersModule } from './_modules/users/users.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AlertComponent } from './_directives/index';
import { AuthGuard, AdminGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './_components/home/index';
import { LoginComponent } from './_components/login/index';
import { RegisterComponent } from './_components/register/index';

import { NavmenuComponent } from './_components/navmenu/navmenu.component';

import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavmenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    BrowserAnimationsModule,
    UsersModule
  ],
  exports: [
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    AlertService,
    AuthenticationService,
    UserService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

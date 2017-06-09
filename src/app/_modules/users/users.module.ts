import { UsersComponent } from './components/index';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

// Services
import { UserService } from './services/users.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],

  declarations: [
    UserListComponent,
    UserFormComponent,
    UsersComponent
  ],

  providers: [
    UserService
  ],

  exports: [
    UserListComponent,
    UserFormComponent,
    UsersComponent
  ]
})
export class UsersModule {
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

// Components
import { UserListComponent, UserFormComponent } from './components/index';

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
    UserFormComponent
  ],

  providers: [
    UserService
  ],

  exports:[
    UserListComponent,
    UserFormComponent
  ]
})
export class UsersModule {
}

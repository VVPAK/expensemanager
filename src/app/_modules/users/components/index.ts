import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { Component } from '@angular/core';

@Component({
    selector: 'app-users',
    template: `
        <user-form></user-form>
        <user-list></user-list>
    `
})
export class UsersComponent {
    //private 

}

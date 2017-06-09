import { User } from './../../models/user';
import { UserService } from './../../services/users.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit{
    users: User[];

    @Input() listId: string;
    @Input() editId: string;

    constructor(
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.userService.getUsers()
            .subscribe(
                users => {
                    this.users = users;
                },
                err => {
                    console.log(err);
                }
            );
    }
}
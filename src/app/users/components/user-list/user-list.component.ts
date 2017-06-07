import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html'
})
export class UserListComponent {

    users: any[];

    @Input() listId: string;
    @Input() editId: string;

    
}
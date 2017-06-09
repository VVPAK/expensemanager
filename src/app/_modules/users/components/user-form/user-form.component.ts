import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'user-form',
    templateUrl: 'user-form.component.html'
})

export class UserFormComponent implements OnInit {
    @Input() editId: string;
    @Input() listId: string;

    constructor() { }

    ngOnInit() { }
}
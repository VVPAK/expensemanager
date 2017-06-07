import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../_models/index';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class UserService {

    constructor(
        private http: Http,
        private auth: AuthenticationService
        ) { }

    getAll() {
        return this.http.get('/api/users', this.auth.token()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id, this.auth.token()).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post('/api/users', user, this.auth.token()).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.id, user, this.auth.token()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id, this.auth.token()).map((response: Response) => response.json());
    }
}
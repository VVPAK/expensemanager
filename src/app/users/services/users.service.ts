import { AuthenticationService } from './../../_services/authentication.service';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../models/user';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class UserService {

    private url = '/api/';

    constructor(
        private http: Http,
        private auth: AuthenticationService
    ) { }

    getUsers(): Observable<User[]> {
        return this.http.get(this.url, this.auth.token())
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
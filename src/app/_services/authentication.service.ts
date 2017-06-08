import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post('/oauth/token', JSON.stringify({ 
            grant_type: "password",
            client_id: "web",
            client_secret: "verystrongpassword",
            username: username, 
            password: password 
        }), {headers: headers})
            .map((response: Response) => {
                // login successful if there's a token in the response
                let user = response.json();
                if (user && user.access_token) {
                    // store user details and token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    refreshToken() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var user = localStorage.getItem('currentUser'); 
        if (user) {        
            var refreshToken = JSON.parse(user).refresh_token;
            return this.http.post('/oauth/token', JSON.stringify({ 
                grant_type: "refresh",
                client_id: "web",
                client_secret: "verystrongpassword",
                refresh_token: refreshToken
            }), {headers: headers})
                .map((response: Response) => {
                    // login successful if there's a jwt token in the response
                    let user = response.json();
                    if (user && user.access_token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(user));
                    } else {

                    }
                });
        }
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    token() {
        // create authorization header with token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.access_token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.access_token });
            return new RequestOptions({ headers: headers });
        }
    }
}
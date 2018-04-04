import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { mergeMap } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {
    twitterHandle: string;

    constructor ( private http: HttpClient ) { }

    getRequestToken() {
        return this.http.get('api/requestToken', httpOptions);
    }

    getAccessToken(oauth_token: string, oauth_verifier: string)  {
        const body = {oauth_token, oauth_verifier};
        return this.http.post('api/accessToken', body, httpOptions).
            mergeMap(( response: any ) => {
                this.twitterHandle = response.screen_name;
                return Observable.of(response);
            });
    }
}

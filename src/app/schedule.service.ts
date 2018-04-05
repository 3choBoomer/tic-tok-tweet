import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { mergeMap } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http/src/module';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ScheduleService {

  constructor( private http: HttpClient ) { }

  scheduleTweet(body: any): Observable<any> {
    return this.http.post('api/scheduleTweet', body, httpOptions);
  }
}

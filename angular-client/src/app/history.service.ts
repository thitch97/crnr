import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HistoryService {

  constructor(private http: Http) {}

  history(): Observable<{}> {
    return this.http
      .get('http://backend.howard.test:8080/history')
      .map(response => response.json());
  }
}

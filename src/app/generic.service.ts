import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { catchError, map, tap } from 'rxjs/operators';

const httpServiceOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class GenericService {

  private serviceUrl: string = 'https://www.callipolis-investigation.fr/api';

  constructor(private http: HttpClient) { }

  getResource(resource: string, id: number): Observable<any> {
    return this.http.get<any>(this.serviceUrl + '/' + resource + '/' + id);
  }

  getResources(resources: string, params: {} = {}): Observable<any> {
    let query = jQuery.param(params);
    if (query) {
      query = '?' + query;
    }
    return this.http.get<any>(this.serviceUrl + '/' + resources + query);
  }

}

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

  getResources(resources: string, params: {} = {}, page: number = null): Observable<any> {
    let query = '';
    let pageUrl = '';
    if (params) {
      query = '?' + jQuery.param(params);
    }
    if (page !== null) {
      pageUrl = page < 0 ? '/0' : '/' + page;
    }
    return this.http.get<any>(this.serviceUrl + '/' + resources + pageUrl + query);
  }

  getResourcesCount(resources: string, params: {} = {}): Observable<any> {
    let query = '';
    let pageUrl = '';
    if (params) {
      query = '?' + jQuery.param(params);
    }
    return this.http.get<any>(this.serviceUrl + '/count/' + resources + query);
  }

  getImageUrl(serviceId: string): string {
    return this.serviceUrl + '/Image/' + serviceId;
  }

}

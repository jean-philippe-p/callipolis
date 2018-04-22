import { Injectable } from '@angular/core';

import { MainService } from './service';
import { Service } from './service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable()
export class ServiceService {

  private serviceUrl: string = 'assets/services.json';

  constructor(private http: HttpClient,) { }

  getServices(): Observable<MainService[]> {
    return this.http.get<MainService[]>(this.serviceUrl);
  }

  getShortServices(): Observable<MainService[]> {
    return this.getServices();
  }

  getService(id: number): Observable<MainService> {
    var service: MainService;

    return this.getServices().map(
      services => {
        for (let i = 0; i < services.length; i++) {
          if (services[i].id == id) {
            service = services[i];
          }
        }
        return service;
      }
    );
    /*.mergeMap(() =>  this.http.get(service.urlText, {responseType: 'text'}))
    .map(html => {
        service.text = html;
        return service;
      }
    );*/
  }

  setSubServiceTexts(sub_service: Service): void {
    this.http.get(sub_service.urlText, {responseType: 'text'}).subscribe(text => sub_service.text = text);
    if (sub_service.hasOwnProperty('urlArticles')) {
      this.http.get(sub_service.urlArticles, {responseType: 'text'}).subscribe(text => sub_service.articles = text);
    }
    if (sub_service.hasOwnProperty('urlImportant')) {
      this.http.get(sub_service.urlImportant, {responseType: 'text'}).subscribe(text => sub_service.important = text);
    }
  }

}

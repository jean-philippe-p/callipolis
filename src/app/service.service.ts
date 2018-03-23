import { Injectable } from '@angular/core';

import { ShortService } from './service';
import { MainService } from './service';
import { Service } from './service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable()
export class ServiceService {

  private serviceUrl: string = 'assets/services.json';

  constructor(private http: HttpClient,) { }

  getServices(): Observable<MainService[]> {
    return this.http.get<MainService[]>(this.serviceUrl);
  }

  getShortServices(): Observable<ShortService[]> {
    return this.getServices().pipe(
      map(services => {
        var short_service: ShortService[] = [];
        for (let i = 0; i < services.length; i++) {
          var service = {
            'id': services[i].id,
            'title': services[i].title,
            'sub_services': []
          };
          if (services[i].hasOwnProperty('sub_services')) {
            for (let j = 0; j < services[i].sub_services.length; j++) {
              service.sub_services.push({
                'id': services[i].sub_services[j].id,
                'title': services[i].sub_services[j].title
              });
            }
          }
          short_service.push(service);
        }
        return short_service;
      })
    );
  }

  getService(id: number): Observable<MainService> {
    return this.getServices().pipe(
      map(services => {
        for (let i = 0; i < services.length; i++) {
          if (services[i].id == id) {
            return services[i];
          }
        }
        return null;
      })
    );
  }

}

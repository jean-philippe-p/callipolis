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

  private serviceUrl: string = 'https://www.callipolis-investigation.fr/api';

  constructor(private http: HttpClient) { }

  getNavBarElements(): Observable<any> {
    return this.http.get<MainService[]>(this.serviceUrl + '/Navbar');
  }

  getServices(): Observable<MainService[]> {
    return this.http.get<MainService[]>(this.serviceUrl + '/MainServices');
  }

  getService(id: number): Observable<MainService> {
    var service: MainService;

    return this.http.get<MainService>(this.serviceUrl + '/MainService/' + id).map(
      service_res => {
        service = service_res;
        return service;
      }
    ).mergeMap(() =>  this.http.get<Service[]>(this.serviceUrl + '/SubServices/' + id))
    .map(sub_services => {
        service.subServices = sub_services;
        return service;
      }
    );
  }

  getSubService(id: number): Observable<Service> {
    return this.http.get<Service>(this.serviceUrl + '/SubService/' + id);
  }

  getLogoUrl(serviceId: number): string {
    return this.serviceUrl + '/Logo/' + serviceId;
  }

}

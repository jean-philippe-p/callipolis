import { Injectable } from '@angular/core';
import { Introduce } from './introduce';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class IntroduceService {

  private serviceUrl: string = 'http://localhost/api';

  constructor(private http: HttpClient) { }
  
  getIntroduce(id: number): Observable<Introduce> {
    return this.http.get<Introduce>(this.serviceUrl + '/Introduce/' + id);
  }
  
  getFooterIntroduces(): Observable<Introduce[]> {
    return this.http.get<Introduce[]>(this.serviceUrl + '/FooterIntroduces');
  }

}

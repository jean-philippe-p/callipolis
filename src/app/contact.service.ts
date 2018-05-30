import { Injectable } from '@angular/core';

import { Contact } from './contact';
import { Town } from './town';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class ContactService {

  private serviceUrl: string = 'http://localhost/api';
  public informations: string;

  constructor(private http: HttpClient) { }

  setContact(contact: Contact): Observable<Contact> {
    const clonedContact = Object.assign({}, contact);
    if (clonedContact.email === '') {
      delete clonedContact.email;
    }
    if (clonedContact.phone === '') {
      delete clonedContact.phone;
    }
    return this.http.post<Contact>(this.serviceUrl + '/Contact', clonedContact, httpOptions);
  }
  
  searchTowns(term: string): Observable<Town[]> {
    if (!term.trim()) {
      // if not search term, return empty array.
      return of([]);
    }
    return this.http.get<Town[]>(this.serviceUrl + '/Towns?search=' + term).pipe(
      tap(_ => console.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Town[]>('searchTowns', []))
    );
  }
  
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}

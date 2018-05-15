import { Injectable } from '@angular/core';

import { Contact } from './contact';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class ContactService {

  private serviceUrl: string = 'http://localhost/api';

  constructor(private http: HttpClient) { }

  setContact(contact: Contact): Observable<Contact> {
    const clonedContact = Object.assign({}, contact);
    if (clonedContact.email === '') {
      delete clonedContact.email;
    }
    if (clonedContact.phone === '') {
      delete clonedContact.phone;
    }
    console.log('+++++1++++');
    console.log(clonedContact);
    return this.http.post<Contact>(this.serviceUrl + '/Contact', clonedContact, httpOptions);
  }

}

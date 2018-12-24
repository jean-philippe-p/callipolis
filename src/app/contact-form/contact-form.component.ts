import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Renderer } from '@angular/core';
import { Contact } from '../contact';
import { Town } from '../town';
import { ContactService } from '../contact.service';
import { MainService, Service } from '../service';
import * as $ from 'jquery';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: [
    './contact-form.component.css',
    '../callipolis.component.css'
  ]
})
export class ContactFormComponent implements OnInit, OnDestroy {

  @Input() mainService: MainService;
  @Input() subService: Service;
  model: Contact;
  listener;
  townInput;
  serviceInput;
  isvalidatedTownInput: boolean = true;
  towns$: Observable<Town[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private renderer: Renderer,
    public contactService: ContactService
  ) { }

  ngOnInit() {
    this.model = new Contact();

    this.towns$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.contactService.searchTowns(term)),
    );

    $( ".search-input-contact" ).focusin(function() {
      $( ".search-result-contact" ).css( "display", "block" );
    });
    $( ".search-input-contact" ).focusout(function() {
      setTimeout(function() {$( ".search-result-contact" ).css( "display", "none" )}, 300);
    });
  }

  search(): void {
    this.isvalidatedTownInput = this.townInput ? false : true;
    this.searchTerms.next(this.townInput);
  }

  setTown(town: Town) {
    this.isvalidatedTownInput = true;
    this.townInput = `${town.name} (${town.codePostal})`;
    this.model.town = JSON.stringify([town.name, town.codePostal]);
    this.searchTerms.next('');
  }

  onSubmit() {
    this.contactService.success = null;
    if (this.subService) {
      this.model.service = this.subService.id;
    } else if (this.mainService) {
      for (let i = 0; i < this.mainService.subServices.length; i++) {
        if (this.mainService.subServices[i].title === this.serviceInput) {
          this.model.service = this.mainService.subServices[i].id;
        }
      }
    }
    if (this.model.phone) {
      this.model.phone = this.model.phone.replace(/\s/g, '');
    }
    this.model.informations = this.contactService.informations;
    this.contactService.setContact(this.model).subscribe(
      contact => this.contactService.success = true,
      error => this.contactService.success = false
    );
  }

  checkEmail(allowEmpty) {
    return (allowEmpty && (typeof this.model.email === 'undefined' || this.model.email === ''))
      || (typeof this.model.email !== 'undefined' && this.model.email.match(/^\S+@\S+\.[a-z]{2,6}$/));
  }

  checkPhone(allowEmpty) {
    return (allowEmpty && (typeof this.model.phone === 'undefined' || this.model.phone === ''))
      || (typeof this.model.phone !== 'undefined' && this.model.phone.match(/^(\s*\d){10}\s*$/));
  }

  checkForm() {
    return this.checkPhone(true) && this.checkEmail(true) && (this.checkPhone(false) || this.checkEmail(false)) && this.isvalidatedTownInput;
  }

  ngOnDestroy() {
    this.contactService.informations = null;
  }

}

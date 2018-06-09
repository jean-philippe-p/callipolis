import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Renderer } from '@angular/core';
import { Contact } from '../contact';
import { Town } from '../town';
import { ServiceService } from '../service.service';
import { ContactService } from '../contact.service';
import { MainService, Service } from '../service';
import { ActivatedRoute } from '@angular/router';
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
  @Input() container;
  model: Contact;
  previousScrollTop;
  listener;
  townInput;
  serviceInput;
  isvalidatedTownInput: boolean = true;
  towns$: Observable<Town[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private route: ActivatedRoute,
    private renderer: Renderer,
    private serviceService: ServiceService,
    public contactService: ContactService
  ) { }

  ngOnInit() {
    this.listenScroll();
    this.model = new Contact();

    this.towns$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.contactService.searchTowns(term)),
    );

    // during ngOnInit input subService doesn't seems to be inititalized
    // due to this behaviour, html input doesn't have any value
    // so we fix this by retreving subService title thanks to route sub id
    // there's probably a better way
    if (this.route.snapshot.paramMap.has('sub-id')) {
      const sub_id: number = +this.route.snapshot.paramMap.get('sub-id');

      this.serviceService.getSubService(sub_id).subscribe(sub_service => {
        this.serviceInput = sub_service.title;
      });
    }
    this.previousScrollTop = $(window).scrollTop();
  }

  listenScroll() {
    if (!this.container) {
      return;
    }
    this.listener = this.renderer.listenGlobal('window', 'scroll', (evt) => {
      if ($('.sticky-contact-form').height() + 30 < this.container.height()) {
        const position = $('.sticky-contact-form').css('position');
        if (position === 'fixed') {
          if ($(window).scrollTop() + 75 <= $('.sticky-contact-form').data('original-offset-top')) {
            $('.sticky-contact-form').css('position', 'static');
          }
          else if ($('.sticky-contact-form').offset().top + $('.sticky-contact-form').height() + 30 >= this.container.offset().top + this.container.height()) {
            const top = (this.container.height() - 30 - $('.sticky-contact-form').height()) + 'px';
            $('.sticky-contact-form').css('position', 'absolute')
            $('.sticky-contact-form').css('top', top);
          }
        }
        if (position === 'static') {
          if ($(window).scrollTop() > $('.sticky-contact-form').offset().top - 75) {
            let width = $('.sticky-contact-form').width();
            $('.sticky-contact-form').data('original-offset-top', $('.sticky-contact-form').offset().top);
            $('.sticky-contact-form').css('position', 'fixed');
            $('.sticky-contact-form').css('top', '75px');
            $('.sticky-contact-form').width(width);
          }
        }
        if (position === 'absolute') {
          if (
            this.previousScrollTop > $(window).scrollTop()
            && $(window).scrollTop() + 75 < $('.sticky-contact-form').offset().top
          ) {
            let width = $('.sticky-contact-form').width();
            $('.sticky-contact-form').css('position', 'fixed');
            $('.sticky-contact-form').css('top', '75px');
            $('.sticky-contact-form').width(width);
          }
        }
        this.previousScrollTop = $(window).scrollTop();
      }
    });

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
      console.log('subservice');
      console.log(this.subService.id);
      this.model.service = this.subService.id;
    } else if (this.mainService) {
      console.log('mainservice ' + this.serviceInput);
      for (let i = 0; i < this.mainService.subServices.length; i++) {
        if (this.mainService.subServices[i].title === this.serviceInput) {
          console.log('subservice');
          console.log(this.mainService.subServices[i].id);
          this.model.service = this.mainService.subServices[i].id;
        }
      }
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
    if(this.listener) {
      this.listener();
    }
  }

}

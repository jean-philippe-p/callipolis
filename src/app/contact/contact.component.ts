import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ContactService } from '../contact.service';
import { Company } from '../company';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: [
    './contact.component.css',
    '../callipolis.component.css'
  ]
})
export class ContactComponent implements OnInit {

  public company: Company = new Company();

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.getCompany().subscribe(company => this.company = company);
  }

}

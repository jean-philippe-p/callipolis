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
  private fontSizeBase: number;
  private fontSizeRatio: number;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    var elem1 = document.getElementById("title-map-box");
    var style = window.getComputedStyle(elem1, null);
    this.fontSizeBase = parseInt(style.fontSize, 10);
    this.fontSizeRatio = this.fontSizeBase / 600;

    this.contactService.getCompany().subscribe(company => this.company = company);
  }

  getFontSize() {
    return Math.min(this.fontSizeBase, window.innerWidth * this.fontSizeRatio) + 'px';
  }

}

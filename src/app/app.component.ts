import { Component, OnInit } from '@angular/core';
import { IntroduceService } from './introduce.service';
import { ContactService } from './contact.service';
import { Introduce } from './introduce';
import { Company } from './company';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './callipolis.component.css']
})
export class AppComponent {
  title = 'app';

  footerIntroduces: Introduce[] = [];
  company: Company = new Company();

  constructor(private introduceService: IntroduceService, private contactService: ContactService) { }

  ngOnInit() {
    this.introduceService.getFooterIntroduces().subscribe(footerIntroduces => this.footerIntroduces = footerIntroduces);
    this.contactService.getCompany().subscribe(company => this.company = company);
  }

}

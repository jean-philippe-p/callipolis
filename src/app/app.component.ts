import { Component, OnInit } from '@angular/core';
import { IntroduceService } from './introduce.service';
import { Introduce } from './introduce';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './callipolis.component.css']
})
export class AppComponent {
  title = 'app';

  footerIntroduces: Introduce[] = [];

  constructor(private introduceService: IntroduceService) { }

  ngOnInit() {
    this.introduceService.getFooterIntroduces().subscribe(footerIntroduces => this.footerIntroduces = footerIntroduces);
  }

}

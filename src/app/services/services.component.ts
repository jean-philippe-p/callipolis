import { Component, OnInit } from '@angular/core';

import { ServiceService } from '../service.service';
import { IntroduceService } from '../introduce.service';
import { MainService } from '../service';
import { Introduce } from '../introduce';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: [
    './services.component.css',
    '../callipolis.component.css'
  ]
})
export class ServicesComponent implements OnInit {

  services: object[];
  carouselIntroduces: Introduce[];

  constructor(private serviceService: ServiceService, private introduceService: IntroduceService) { }

  ngOnInit() {
    this.serviceService.getServices().subscribe(services => this.services = services);
    this.introduceService.getCarouselIntroduces().subscribe(carouselIntroduces => this.carouselIntroduces = carouselIntroduces);
  }

  getLogoUrl(service: MainService): string {
    return this.serviceService.getLogoUrl(service.logo);
  }

}

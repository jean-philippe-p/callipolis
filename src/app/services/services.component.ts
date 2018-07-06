import { Component, OnInit } from '@angular/core';

import { ServiceService } from '../service.service';
import { GenericService } from '../generic.service';
import { MainService } from '../service';
import { CarouselPart } from '../carousel-part';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: [
    './services.component.css',
    '../callipolis.component.css'
  ]
})
export class ServicesComponent implements OnInit {

  services: MainService[] = [];
  carousel: CarouselPart[] = [];

  constructor(private serviceService: ServiceService, private genericService: GenericService) { }

  ngOnInit() {
    this.serviceService.getServices().subscribe(services => this.services = services);
    this.genericService.getResources('Carousel').subscribe(carousel => this.carousel = carousel);
  }

  getLogoUrl(service: MainService): string {
    return this.serviceService.getLogoUrl(service.logo);
  }

  getImageUrl(id: string): string {
    return this.serviceService.getLogoUrl(id);
  }

  getFontSize() {
    return (window.innerWidth * 0.03) + 'px';
  }

}

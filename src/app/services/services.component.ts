import { Component, OnInit } from '@angular/core';

import { ServiceService } from '../service.service';
import { MainService } from '../service';

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

  constructor(private serviceService: ServiceService) { }

  ngOnInit() {
    this.serviceService.getServices().subscribe(services => this.services = services);
  }

  getLogoUrl(service: MainService): string {
    console.log(this.serviceService.getLogoUrl(service.logo));
    return this.serviceService.getLogoUrl(service.logo);
  }

}

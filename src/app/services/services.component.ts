import { Component, OnInit } from '@angular/core';

import { ServiceService } from '../service.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: [
    './services.component.css',
    '../block.component.css'
  ]
})
export class ServicesComponent implements OnInit {

  services: object[];

  constructor(private serviceService: ServiceService) { }

  ngOnInit() {
    this.serviceService.getServices().subscribe(services => this.services = services);
  }

}

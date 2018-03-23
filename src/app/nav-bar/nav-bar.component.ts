import { Component, OnInit } from '@angular/core';
import { ShortService } from '../service';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  summary_services: ShortService[] = [];

  constructor(private serviceService: ServiceService) { }

  ngOnInit() {
    this.serviceService.getShortServices().subscribe(short_services => this.summary_services = short_services);
  }

}

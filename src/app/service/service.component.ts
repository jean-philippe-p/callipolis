import { Component, OnInit, DoCheck } from '@angular/core';
import { ServiceService } from '../service.service';
import { MainService, Service } from '../service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: [
    './service.component.css',
    '../block.component.css'
  ]
})
export class ServiceComponent implements OnInit, DoCheck {

  main_service: MainService;
  selected_sub_service: Service;
  main_id: number = -1;

  constructor(private route: ActivatedRoute, private serviceService: ServiceService) { }

  ngOnInit() {
    this.changeService();
  }

  ngDoCheck() {
    this.changeService();
  }

  changeService() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id !== this.main_id) {
      this.main_id = id;
      this.serviceService.getService(this.main_id).subscribe(main_service => {
        this.main_service = main_service;
        this.selected_sub_service = null;
        if (this.route.snapshot.paramMap.has('sub-id')) {
          const sub_id: number = +this.route.snapshot.paramMap.get('sub-id');

          for (let i = 0; i < this.main_service.sub_services.length; i++) {
            if (this.main_service.sub_services[i].id == sub_id) {
              this.selected_sub_service = this.main_service.sub_services[i];
            }
          }
          if (this.selected_sub_service === null) {
          // TODO manage not found resource
          }

        } else {
          this.selected_sub_service = null;
        }
      });
    }
  }

}

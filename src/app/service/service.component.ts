import { Component, OnInit, DoCheck } from '@angular/core';
import { ServiceService } from '../service.service';
import { MainService, Service } from '../service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: [
    './service.component.css',
    '../callipolis.component.css'
  ]
})
export class ServiceComponent implements OnInit, DoCheck {

  // offset that correspond to image and title of sub-service to calculate block size
  offset_lenght: number = 250;

  main_service: MainService;
  selected_sub_service: Service;
  main_id: number = -1;
  split_index: number = 0;

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
        this.setSplitIndex();
        this.changeSubService();
      });
    } else {
      this.changeSubService();
    }
  }

  changeSubService() {
    if (this.main_service && this.route.snapshot.paramMap.has('sub-id')) {
      const sub_id: number = +this.route.snapshot.paramMap.get('sub-id');

      if (!this.selected_sub_service || this.selected_sub_service.id !== sub_id) {
        this.serviceService.getSubService(sub_id).subscribe(sub_service => {
          this.selected_sub_service = sub_service;
        });
      }
    } else {
      this.selected_sub_service = null;
    }
  }

  /**
   * get best index to split sub-service list to have 2 columns with pretty similar height
   * can't find a way to build 2 columns using sub-service element height
   * so we use text lenght of each sub-service to calculate spilt index
   */
  setSplitIndex() {
    this.split_index = 0;
    let current_text_length = 0;
    for (let i = 0; i < this.main_service.subServices.length; i++) {
      current_text_length += this.main_service.subServices[i].summary.length + this.offset_lenght;
    }
    const total_text_length = current_text_length;
    current_text_length = 0;
    for (let i = 0; i < this.main_service.subServices.length; i++) {
      current_text_length += this.main_service.subServices[i].summary.length + this.offset_lenght;
      if (current_text_length > total_text_length / 2) {
        const middle_split = total_text_length / 2;
        const high_split = current_text_length;
        const low_split = current_text_length - this.main_service.subServices[i].summary.length;
        this.split_index = high_split - middle_split < middle_split - low_split ? i : Math.max(0, i - 1);
        break;
      }
    }
  }

  getLogoUrl(service: Service): string {
    return this.serviceService.getLogoUrl(service.logo);
  }

  getContactContainer() {
    return $('.service-infos');
  }

}

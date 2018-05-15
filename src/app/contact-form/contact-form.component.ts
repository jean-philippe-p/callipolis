import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact';
import { ServiceService } from '../service.service';
import { ContactService } from '../contact.service';
import { MainService, Service } from '../service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: [
    './contact-form.component.css',
    '../callipolis.component.css'
  ]
})
export class ContactFormComponent implements OnInit {

  @Input() mainService: MainService;
  @Input() subService: Service;
  // @Input() titleServices = [];
  model: Contact;

  constructor(
    private route: ActivatedRoute,
    private serviceService: ServiceService,
    private contactService: ContactService
  ) { }

  ngOnInit() {
    this.model = new Contact();

    // during ngOnInit imput subService doesn't seems to be inititalized
    // due to this behaviour, html input doesn't have any value
    // so we fix this by retreving subService title thanks to route sub id
    // there's probably a better way
    if (this.route.snapshot.paramMap.has('sub-id')) {
      const sub_id: number = +this.route.snapshot.paramMap.get('sub-id');

      this.serviceService.getSubService(sub_id).subscribe(sub_service => {
        this.model.service = sub_service.title;
      });
    }
  }

  onSubmit() {
    this.contactService.setContact(this.model).subscribe(contact => console.log(contact));
  }

  checkEmail(allowEmpty) {
    return (allowEmpty && (typeof this.model.email === 'undefined' || this.model.email === ''))
      || (typeof this.model.email !== 'undefined' && this.model.email.match(/^\S+@\S+\.[a-z]{2,6}$/));
  }

  checkPhone(allowEmpty) {
    return (allowEmpty && (typeof this.model.phone === 'undefined' || this.model.phone === ''))
      || (typeof this.model.phone !== 'undefined' && this.model.phone.match(/^(\s*\d){10}\s*$/));
  }

  checkForm() {
    return this.checkPhone(true) && this.checkEmail(true) && (this.checkPhone(false) || this.checkEmail(false));
  }

}

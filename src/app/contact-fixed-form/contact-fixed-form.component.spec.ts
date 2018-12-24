import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFixedFormComponent } from './contact-fixed-form.component';

describe('ContactFixedFormComponent', () => {
  let component: ContactFixedFormComponent;
  let fixture: ComponentFixture<ContactFixedFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactFixedFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactFixedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Renderer } from '@angular/core';
import * as $ from 'jquery';
import { MainService, Service } from '../service';

@Component({
  selector: 'app-contact-fixed-form',
  templateUrl: './contact-fixed-form.component.html',
  styleUrls: ['./contact-fixed-form.component.css']
})
export class ContactFixedFormComponent implements OnInit {

  @Input() mainService: MainService;
  @Input() subService: Service;
  @Input() container;
  previousScrollTop;
  listener;

  constructor(private renderer: Renderer) { }

  ngOnInit() {
    this.listenScroll();
    this.previousScrollTop = $(window).scrollTop();
  }

  listenScroll() {
    this.listener = this.renderer.listenGlobal('window', 'scroll', (evt) => {
      if ($('.fixed-contact-form').height() + 50 < this.container.height()) {
        const position = $('.fixed-contact-form').css('position');
        if (position === 'fixed') {
          if ($(window).scrollTop() + 75 <= $('.fixed-contact-form').data('original-offset-top')) {
            $('.fixed-contact-form').css('position', 'static');
          }
          else if ($('.fixed-contact-form').offset().top + $('.fixed-contact-form').height() + 30 >= this.container.offset().top + this.container.height()) {
            const top = (this.container.height() - 30 - $('.fixed-contact-form').height()) + 'px';
            $('.fixed-contact-form').css('position', 'absolute')
            $('.fixed-contact-form').css('top', top);
          }
        }
        if (position === 'static') {
          if ($(window).scrollTop() > $('.fixed-contact-form').offset().top - 75) {
            $('.fixed-contact-form').data('original-offset-top', $('.fixed-contact-form').offset().top);
            $('.fixed-contact-form').css('position', 'fixed');
            $('.fixed-contact-form').css('top', '75px');
          }
        }
        if (position === 'absolute') {
          if (
            this.previousScrollTop > $(window).scrollTop()
            && $(window).scrollTop() + 75 < $('.fixed-contact-form').offset().top
          ) {
            $('.fixed-contact-form').css('position', 'fixed');
            $('.fixed-contact-form').css('top', '75px');
          }
        }
        this.previousScrollTop = $(window).scrollTop();
      } else {
        $('.fixed-contact-form').css('position', 'static');
      }
    });
  }

  ngOnDestroy() {
    this.listener();
  }

}

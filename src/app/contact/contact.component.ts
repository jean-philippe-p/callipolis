import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: [
    './contact.component.css',
    '../callipolis.component.css'
  ]
})
export class ContactComponent implements OnInit {

  public mainTowns: string[] = [];

  constructor() { }

  ngOnInit() {
    this.mainTowns = [
      'Avignon',
      'Nîmes',
      'Montpellier',
      'Sète',
      'Agde',
      'Béziers',
      'Narbonne',
      'Perpignan',
      'Carcassone',
      'Toulouse',
      'Millau',
      'Rodez',
      'Cahors',
      'Mende'
    ];
  }

}

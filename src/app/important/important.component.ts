import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-important',
  templateUrl: './important.component.html',
  styleUrls: [
    './important.component.css',
    '../callipolis.component.css'
  ]
})
export class ImportantComponent implements OnInit {

  @Input() articles: string;
  @Input() important: string;

  constructor() { }

  ngOnInit() {
  }

}

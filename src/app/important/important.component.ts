import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../article';
import { GenericService } from '../generic.service';

@Component({
  selector: 'app-important',
  templateUrl: './important.component.html',
  styleUrls: [
    './important.component.css',
    '../callipolis.component.css'
  ]
})
export class ImportantComponent implements OnInit {

  @Input() articleIds: string[];
  @Input() important: string;
  public articles: Article[];

  constructor(private genericService: GenericService) { }

  ngOnInit() {
    this.genericService.getResources('Articles', {id: this.articleIds}).subscribe(articles => {
      this.articles = articles;
    });
  }

}

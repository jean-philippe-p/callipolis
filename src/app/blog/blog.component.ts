import { Component, OnInit, DoCheck } from '@angular/core';
import { GenericService } from '../generic.service';
import { BlogArticle } from '../blogArticle';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: [
    './blog.component.css',
    '../callipolis.component.css'
  ]
})
export class BlogComponent implements OnInit, DoCheck {

  // offset that correspond to image and title of sub-service to calculate block size
  offset_lenght: number = 250;

  articles: BlogArticle[] = [];
  currentPage: number = null;
  currentPageOffset: number;
  maxPage: number;
  leftColumnIndexes: number[] = [];
  rightColumnIndexes: number[] = [];

  constructor(private route: ActivatedRoute, private genericService: GenericService) { }

  ngOnInit() {
    this.getArticles();
  }

  ngDoCheck() {
    this.getArticles();
  }

  getArticles() {
    let routCurrentPage = (+this.route.snapshot.paramMap.get('page')) - 1;
    if (routCurrentPage !== this.currentPage) {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      if (this.currentPage !== null) {
        $("html, body").animate({scrollTop:200}, 700, 'swing');
      }
      this.currentPage = routCurrentPage;
      this.currentPageOffset = Math.trunc(this.currentPage / 5 ) * 5;
      this.genericService.getResourcesCount('BlogArticles').subscribe(articlesCount => {
        this.maxPage = Math.trunc((articlesCount - 1) / 10 ) + 1;

        let params = {
          order: JSON.stringify([{
            property: 'id',
            type: 'DESC'
          }])
        }
        this.genericService.getResources('BlogArticles', params, this.currentPage).subscribe(articles => {
          this.articles = articles;
          this.setColumns();
        });
      });
    }
  }

  setColumns() {
    let leftHeight = 0;
    let rightHeight = 0;
    this.leftColumnIndexes = [];
    this.rightColumnIndexes = [];
    for (let i = 0; i < this.articles.length; i++) {
      if (leftHeight <= rightHeight) {
        leftHeight += this.articles[i].resume.length * 0.22 + this.offset_lenght;
        this.leftColumnIndexes.push(i);
      } else {
        rightHeight += this.articles[i].resume.length * 0.22 + this.offset_lenght;
        this.rightColumnIndexes.push(i);
      }
    }
  }

  getImageUrl(id): string {
    return this.genericService.getImageUrl(id);
  }

  getContactContainer() {
    return $('.articles-container');
  }

  incrementOffset(increment: number) {
    this.currentPageOffset = Math.max(0, this.currentPageOffset + increment);
    return false;
  }

}

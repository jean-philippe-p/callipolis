import { Component, OnInit, Input } from '@angular/core';
import { GenericService } from '../generic.service';
import { BlogArticle } from '../blogArticle';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-carousel-article',
  templateUrl: './carousel-article.component.html',
  styleUrls: [
    './carousel-article.component.css',
    '../callipolis.component.css'
  ]
})
export class CarouselArticleComponent implements OnInit {

  @Input() currentArticle: BlogArticle;

  displayedArticles: BlogArticle[] = [];
  articles: BlogArticle[] = [];
  maxPage: number;
  leftColumnIndexes: number[] = [];
  rightColumnIndexes: number[] = [];

  currentLeft = 0;
  scrollingAvailable = true;
  searchLeft = true;
  searchRight = true;

  constructor(private route: ActivatedRoute, private genericService: GenericService) {
    this.initArticles();
  }

  ngOnInit() {
    this.getArticles();
  }

  initArticles() {
    this.displayedArticles = [];
    for (let i = 0; i < 10; i++) {
      this.displayedArticles.push(new BlogArticle());
    }
  }

  getArticles() {
    this.initArticles();
    this.genericService.getResourcesCount('BlogArticles').subscribe(articlesCount => {
      this.unshiftArticles(this.currentArticle.id, true);
    });
  }

  pushArticles(id, includeCurrent:boolean, init:boolean) {
    let params = {
      id: id,
      operator: includeCurrent ? '>=' : '>',
      order: JSON.stringify([{
        property: 'id',
        type: 'ASC'
      }])
    }
    this.genericService.getResources('BlogArticles', params, 0).subscribe(articles => {
      for (let i = 0; i < articles.length; i++) {
        this.articles.push(articles[i]);
        if (init) {
          this.displayedArticles[i].id = articles[i].id;
          this.displayedArticles[i].title = articles[i].title;
          this.displayedArticles[i].image = articles[i].image;
        }
      }
      if (articles.length < 10) {
        let j = 0;
        for (let i = articles.length; i < 10; i++) {
          this.displayedArticles[i].id = this.articles[j].id;
          this.displayedArticles[i].title = this.articles[j].title;
          this.displayedArticles[i].image = this.articles[j].image;
          j++;
        }
        this.searchRight = false;
      }
      if (init && this.searchRight) {
        this.pushArticles(this.articles[this.articles.length - 1].id, false, false);
      }
    });
  }

  unshiftArticles(id, init: boolean = false) {
    let params = {
      id: id,
      operator: '<',
      order: JSON.stringify([{
        property: 'id',
        type: 'DESC'
      }])
    }
    this.genericService.getResources('BlogArticles', params, 0).subscribe(articles => {
      if (articles.length < 10) {
        this.searchLeft = false;
      }
      for (let i = 0; i < articles.length; i++) {
        this.articles.unshift(articles[i]);
      }
      if (init) {
        this.pushArticles(this.currentArticle.id, true, true);
      }
    });
  }

  getImageUrl(id): string {
    return this.genericService.getImageUrl(id);
  }

  getContactContainer() {
    return $('.articles-container');
  }

  moveRight() {
    this.scrollingAvailable = false;
    let id = '#' + this.currentLeft;

    $(id).animate({marginLeft: '-' + ($(id).width() + 30) + 'px'}, 500, 'swing', function() {
        $(id).css("marginLeft", "0px");
        $(id).appendTo("#container");

        const PreviousLeft = this.currentLeft == 0 ? 9 : this.currentLeft - 1;
        let globalIndex;
        if (this.displayedArticles[PreviousLeft].id) {
          globalIndex = this.findGobalIndex(this.displayedArticles[PreviousLeft].id) + 1;
          if (globalIndex >= this.articles.length) {
            globalIndex = 0;
          }
        } else {
          globalIndex = 0;
        }

        this.displayedArticles[this.currentLeft].id = this.articles[globalIndex].id;
        this.displayedArticles[this.currentLeft].title = this.articles[globalIndex].title;
        this.displayedArticles[this.currentLeft].image = this.articles[globalIndex].image;

        this.currentLeft = (this.currentLeft + 1) % 10;
        this.scrollingAvailable = true;

        if (this.searchRight && globalIndex == this.articles.length - 5) {
          this.pushArticles(this.articles[this.articles.length - 1].id, false, false);
        }
    }.bind(this));
  }

  moveLeft() {
    this.scrollingAvailable = false;
    let globalIndex = this.findGobalIndex(this.displayedArticles[this.currentLeft].id) - 1;
    if (globalIndex < 0) {
      globalIndex = this.articles.length - 1;
    }
    this.currentLeft = this.currentLeft == 0 ? 9 : this.currentLeft - 1;
    this.displayedArticles[this.currentLeft].id = this.articles[globalIndex].id;
    this.displayedArticles[this.currentLeft].title = this.articles[globalIndex].title;
    this.displayedArticles[this.currentLeft].image = this.articles[globalIndex].image;
    let id = '#' + this.currentLeft;
    $(id).prependTo("#container");
    $(id).css("marginLeft", '-' + ($(id).width() + 30) + 'px');

    $(id).animate({marginLeft: '0px'}, 500, 'swing', function() {
      this.scrollingAvailable = true;
      if (this.searchLeft && globalIndex == 5) {
        this.unshiftArticles(this.articles[0].id);
      }
    }.bind(this));
  }

  findGobalIndex(id) {
    for (let i = 0; i < this.articles.length; i++) {
      if (this.articles[i].id == id) {
        return i;
      }
    }
  }

}

import { Component, OnInit, DoCheck } from '@angular/core';
import { GenericService } from '../generic.service';
import { BlogArticle } from '../blogArticle';
import { BlogArticleElement, BlogArticleChapter, BlogArticleImage } from '../blogArticleElement';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog-article',
  templateUrl: './blog-article.component.html',
  styleUrls: [
    './blog-article.component.css',
    '../callipolis.component.css'
  ]
})
export class BlogArticleComponent implements OnInit, DoCheck {

  blogArticle: BlogArticle;
  currentId = -1;
  previousId = null;
  followingId = null;

  constructor(private route: ActivatedRoute, private genericService: GenericService) {
    this.blogArticle = new BlogArticle();
  }

  ngOnInit() {
    this.init();
  }

  ngDoCheck() {
    this.init();
  }

  init() {
    let id = +this.route.snapshot.paramMap.get('id');

    if (this.currentId != id) {
      $("html, body").animate({scrollTop:0}, 300, 'swing');
      this.currentId = id;
      this.genericService.getResource('BlogArticle', id).subscribe(blogArticle => {
        this.blogArticle = blogArticle;
        this.blogArticle.blogArticleElements = [];

        this.genericService.getResources('BlogArticleElements', {'parent': id}).subscribe(blogArticleElements => {
          for (let i = 0; i < blogArticleElements.length; i++) {
            if (blogArticleElements[i].__inheritance__ === 'BlogArticleChapter') {
              this.blogArticle.blogArticleElements.push(new BlogArticleChapter(blogArticleElements[i]));
            } else if (blogArticleElements[i].__inheritance__ === 'BlogArticleImage') {
              this.blogArticle.blogArticleElements.push(new BlogArticleImage(blogArticleElements[i]));
            }
          }
        });
      });
      let params = {
        id: this.currentId,
        operator: '<',
        limit: 1,
        properties: JSON.stringify(['id']),
        order: JSON.stringify([{
          property: 'id',
          type: 'DESC'
        }])
      }
      this.genericService.getResources('BlogArticles', params, 0).subscribe(articles => {
        this.previousId = articles.length == 1 ? articles[0].id : null;
      });
      let params2 = {
        id: this.currentId,
        operator: '>',
        limit: 1,
        properties: JSON.stringify(['id']),
        order: JSON.stringify([{
          property: 'id',
          type: 'ASC'
        }])
      }
      this.genericService.getResources('BlogArticles', params2, 0).subscribe(articles => {
        this.followingId = articles.length == 1 ? articles[0].id : null;
      });
    }
  }

  getContactContainer() {
    return $('.article-container');
  }

  getImageUrl(id: string): string {
    return this.genericService.getImageUrl(id);
  }

  isChapterElement(element: BlogArticleElement) {
    return (element instanceof BlogArticleChapter);
  }

  isImageElement(element: BlogArticleElement) {
    return (element instanceof BlogArticleImage);
  }

}

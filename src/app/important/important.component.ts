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
    if (this.articleIds.length) {
      this.genericService.getResources('Articles', {id: this.articleIds}).subscribe(articles => {
        this.articles = articles;
        $(document).ready(function(){
          $( ".link-article" )
            .mouseover(function() {
              var duration = 400;
              var endPosition = '-' + ($( this ).width() - $( this ).parent().width() + 5) + 'px';
              $(this).animate({'margin-left': endPosition}, duration);
            })
            .mouseout(function() {
              $( this ).stop();
              $(this).animate({'margin-left': '0px'}, 100);
            });
        });
      });
    }
  }

  getArticleTitle(article: Article) {
    switch (article.type) {
      case 'code civil':
        return `Article ${article.numero} du code civil`;
      case 'code pénal':
        return `Article ${article.numero} du code pénal`;
      case 'code des assurances':
        return `Article ${article.numero} du code des assurances`;
      case 'code du travail':
        return `Article ${article.numero} du code du travail`;
      case 'code de la consommation':
        return `Article ${article.numero} du code de la consommation`;
      case 'chambre sociale cassation':
        return `Cour de Cassation, Chambre sociale, du ${article.date}, ${article.numero}`;
      case 'chambre criminelle cassation':
        return `Cour de Cassation, Chambre criminelle, du ${article.date}, ${article.numero}`;
      case 'chambre civile 1 cassation':
        return `Cour de Cassation, Chambre civile 1, du ${article.date}, ${article.numero}`;
      case 'chambre civile 2 cassation':
        return `Cour de Cassation, Chambre civile 2, du ${article.date}, ${article.numero}`;
      case 'conseil d\'état':
        return `Conseil d'État, Section du Contentieux, du ${article.date}, ${article.numero}`;
      case 'directive (ue)':
        return `Directive (UE) ${article.numero} du Parlement européen et du Conseil du ${article.date}`;
      case 'prestation compensatoire':
        return `La prestation compensatoire`;
      case 'loi':
        return `Loi n° ${article.numero} du ${article.date}`;
      case 'réforme':
        return `Réforme du ${article.date}`;
      default:
        return 'error';
    }
  }

}

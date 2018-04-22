export class Service {
  id: number;
  title: string;
  summary: string;
  text: string;
  logo: string;
  articles: string;
  urlArticles: string;
  important: string;
  urlImportant: string;
  urlText: string;
  keyWords: string[] = [];
}

export class MainService extends Service {
  sub_services: Service[] = [];
}

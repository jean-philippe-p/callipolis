export class Service {
  id: number;
  title: string;
  summary: string;
  text: string;
  logo: string;
  color: string;
  articles: number[] = [];
  important: string;
  keyWords: string[] = [];
}

export class MainService extends Service {
  subServices: Service[] = [];
}

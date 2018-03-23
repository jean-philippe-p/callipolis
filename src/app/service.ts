export class ShortService {
  id: number;
  title: string;
}

export class Service extends ShortService {
  summary: string;
  text: string;
  logo: string;
}

export class MainService extends Service {
  sub_services: Service[] = [];
}

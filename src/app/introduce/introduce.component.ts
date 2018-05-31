import { Component, OnInit, DoCheck } from '@angular/core';

import { Introduce } from '../introduce';
import { ActivatedRoute } from '@angular/router';
import { IntroduceService } from '../introduce.service';

@Component({
  selector: 'app-introduce',
  templateUrl: './introduce.component.html',
  styleUrls: [
    './introduce.component.css',
    '../callipolis.component.css'
  ]
})
export class IntroduceComponent implements OnInit, DoCheck {

  id: number = -1;
  introduce: Introduce;

  constructor(private route: ActivatedRoute, private introduceService: IntroduceService) { }

  ngOnInit() {
    this.changeIntroduce();
  }

  ngDoCheck() {
    this.changeIntroduce();
  }

  changeIntroduce() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id !== this.id) {
      this.id = id;
      this.introduceService.getIntroduce(this.id).subscribe(introduce => {
        this.introduce = introduce;
      });
    }
  }

}

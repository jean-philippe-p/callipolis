import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselArticleComponent } from './carousel-article.component';

describe('CarouselArticleComponent', () => {
  let component: CarouselArticleComponent;
  let fixture: ComponentFixture<CarouselArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZacksStockTickerListPage } from './zacks-stock-ticker-list.page';

describe('ZacksStockTickerListPage', () => {
  let component: ZacksStockTickerListPage;
  let fixture: ComponentFixture<ZacksStockTickerListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZacksStockTickerListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZacksStockTickerListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

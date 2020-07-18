import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZacksrankchangesPage } from './zacksrankchanges.page';

describe('ZacksrankchangesPage', () => {
  let component: ZacksrankchangesPage;
  let fixture: ComponentFixture<ZacksrankchangesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZacksrankchangesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZacksrankchangesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

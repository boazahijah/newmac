import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltermodalPage } from './filtermodal.page';

describe('FiltermodalPage', () => {
  let component: FiltermodalPage;
  let fixture: ComponentFixture<FiltermodalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltermodalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltermodalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

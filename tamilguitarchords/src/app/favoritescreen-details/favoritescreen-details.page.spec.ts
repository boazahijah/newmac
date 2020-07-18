import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritescreenDetailsPage } from './favoritescreen-details.page';

describe('FavoritescreenDetailsPage', () => {
  let component: FavoritescreenDetailsPage;
  let fixture: ComponentFixture<FavoritescreenDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritescreenDetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritescreenDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

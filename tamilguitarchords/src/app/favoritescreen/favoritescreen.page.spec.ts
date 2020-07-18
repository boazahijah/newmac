import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritescreenPage } from './favoritescreen.page';

describe('FavoritescreenPage', () => {
  let component: FavoritescreenPage;
  let fixture: ComponentFixture<FavoritescreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritescreenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritescreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

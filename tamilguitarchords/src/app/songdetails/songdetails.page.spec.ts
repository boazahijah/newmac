import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongdetailsPage } from './songdetails.page';

describe('SongdetailsPage', () => {
  let component: SongdetailsPage;
  let fixture: ComponentFixture<SongdetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongdetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongdetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

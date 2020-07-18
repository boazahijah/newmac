import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongRequestPage } from './song-request.page';

describe('SongRequestPage', () => {
  let component: SongRequestPage;
  let fixture: ComponentFixture<SongRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongRequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

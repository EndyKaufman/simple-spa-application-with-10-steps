// This shows a different way of testing a page, check about for a simpler one
import { Component } from '@angular/core';

import { TestBed } from '@angular/core/testing';

import { HomePage } from './home.page';

describe('Home Page', () => {
  const html = '<my-home></my-home>';

  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [HomePage, TestPage]});
    TestBed.overrideComponent(TestPage, { set: { template: html }});
  });

  it('should ...', () => {
    const fixture = TestBed.createComponent(TestPage);
    fixture.detectChanges();
    expect(fixture.nativeElement.children[0].textContent).toContain('Home Works!');
  });

});

@Component({selector: 'my-test', template: ''})
class TestPage { }

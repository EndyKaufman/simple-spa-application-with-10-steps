import { TestBed } from '@angular/core/testing';

import { AboutPage } from './about.page';

describe('About Page', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [AboutPage]});
  });

  it('should ...', () => {
    const fixture = TestBed.createComponent(AboutPage);
    fixture.detectChanges();
    expect(fixture.nativeElement.children[0].textContent).toContain('About Works!');
  });

});

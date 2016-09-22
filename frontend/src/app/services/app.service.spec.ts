import { inject, TestBed } from '@angular/core/testing';

import { AppService } from './App.service';

describe('App Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [AppService]});
  });

  it('should ...', inject([AppService], (App) => {
    expect(App.title).toBe('Angular 2');
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { LeftMenuCmp } from './left-menu.cmp';

describe('a left-menu cmp', () => {
    let cmp: LeftMenuCmp;

    // register all needed dependencies
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LeftMenuCmp
            ]
        });
    });

    // instantiation through framework injection
    beforeEach(inject([LeftMenuCmp], (LeftMenuCmp) => {
        cmp = LeftMenuCmp;
    }));

    it('should have an instance', () => {
        expect(cmp).toBeDefined();
    });
});
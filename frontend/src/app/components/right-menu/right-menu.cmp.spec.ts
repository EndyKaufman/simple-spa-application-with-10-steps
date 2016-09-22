import { TestBed, inject } from '@angular/core/testing';

import { RightMenuCmp } from './right-menu.cmp';

describe('a right-menu cmp', () => {
    let cmp: RightMenuCmp;

    // register all needed dependencies
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                RightMenuCmp
            ]
        });
    });

    // instantiation through framework injection
    beforeEach(inject([RightMenuCmp], (RightMenuCmp) => {
        cmp = RightMenuCmp;
    }));

    it('should have an instance', () => {
        expect(cmp).toBeDefined();
    });
});
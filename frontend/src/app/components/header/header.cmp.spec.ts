import { TestBed, inject } from '@angular/core/testing';

import { HeaderCmp } from './header.cmp';

describe('a header cmp', () => {
    let cmp: HeaderCmp;

    // register all needed dependencies
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                HeaderCmp
            ]
        });
    });

    // instantiation through framework injection
    beforeEach(inject([HeaderCmp], (HeaderCmp) => {
        cmp = HeaderCmp;
    }));

    it('should have an instance', () => {
        expect(cmp).toBeDefined();
    });
});
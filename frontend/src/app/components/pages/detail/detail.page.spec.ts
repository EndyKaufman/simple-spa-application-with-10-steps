import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { DetailPage } from './detail.page';
import { Detail } from '../../../models';
import { DetailService } from '../../../services';

describe('a detail page', () => {
    let page: DetailPage;

    // register all needed dependencies
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                { provide: DetailService, useClass: MockDetailService },
                DetailPage
            ]
        });
    });

    // instantiation through framework injection
    beforeEach(inject([DetailPage], (DetailPage) => {
        page = DetailPage;
    }));

    it('should have an instance', () => {
        expect(page).toBeDefined();
    });
});

// Mock of the original detail service
class MockDetailService extends DetailService {
    getList(): Observable<any> {
        return Observable.from([ { id: 1, name: 'One'}, { id: 2, name: 'Two'} ]);
    }
}

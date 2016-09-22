import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Master } from '../models';

@Injectable()
export class MasterService {

    constructor(private http: Http) { }

    getList(): Observable<Master[]> {
        return this.http.get('/api/master').map(res => res.json() as Master[]);
    }
}

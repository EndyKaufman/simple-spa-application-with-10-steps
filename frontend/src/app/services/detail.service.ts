import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Detail } from '../models';

@Injectable()
export class DetailService {

    constructor(private http: Http) { }

    getList(): Observable<Detail[]> {
        return this.http.get('http://localhost:5000/api/details/?format=json').map(res => res.json() as Detail[]);
    }
}

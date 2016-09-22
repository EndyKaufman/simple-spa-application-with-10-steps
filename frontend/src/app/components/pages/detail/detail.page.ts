import { Component, OnInit } from '@angular/core';

import { Detail } from '../../../models';
import { DetailService } from '../../../services';

@Component({
    selector: 'my-detail',
    templateUrl: 'detail.page.html',
    styleUrls: ['./detail.page.scss'],
    providers: [DetailService]
})

export class DetailPage implements OnInit {

  static NAME: string = 'detail';

    items: Detail[] = [];

    constructor(private detailService: DetailService) { }

    ngOnInit() {
        this.detailService.getList().subscribe((res) => {
            this.items = res;
        });
    }
}

import { Component, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
    selector: 'my-right-menu',
    templateUrl: 'right-menu.cmp.html',
    styleUrls: ['./right-menu.cmp.scss']
})

export class RightMenuCmp implements OnInit {

    @Output()
    onSelect: EventEmitter<any>;

    ngOnInit() { }

    constructor() {
        this.onSelect = new EventEmitter();
    }

    select(title?: string) {
        this.onSelect.emit(title);
    }
}

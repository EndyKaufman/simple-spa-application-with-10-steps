import { Component, Output, Input, OnInit, EventEmitter } from '@angular/core';

@Component({
    selector: 'my-left-menu',
    templateUrl: 'left-menu.cmp.html',
    styleUrls: ['./left-menu.cmp.scss']
})

export class LeftMenuCmp implements OnInit {

    @Input()
    items: Array<string>;
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

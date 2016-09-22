import { Component, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
    selector: 'my-header',
    templateUrl: 'header.cmp.html',
    styleUrls: ['./header.cmp.scss']
})

export class HeaderCmp implements OnInit {

    @Output()
    onMenu: EventEmitter<any>;
    @Output()
    onAbout: EventEmitter<any>;

    ngOnInit() { }

    constructor() {
        this.onMenu = new EventEmitter();
        this.onAbout = new EventEmitter();
    }

    menu() {
        this.onMenu.emit();
    }

    about() {
        this.onAbout.emit();
    }
}

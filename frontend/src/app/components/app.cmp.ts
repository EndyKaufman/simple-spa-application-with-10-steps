import { Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MdIconRegistry } from '@angular2-material/icon';
import { MdSidenav } from '@angular2-material/sidenav';
import { AppService } from '../services';
import { AboutPage, DetailPage, HomePage} from './';

import '../../style/app';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.cmp.html',
  styleUrls: ['./app.cmp.scss'],
  viewProviders: [MdIconRegistry]
})
export class AppCmp {

  leftMenuItems: Array<string> = [
    HomePage.NAME,
    DetailPage.NAME,
    AboutPage.NAME
  ];

  showMenu(sidenav: MdSidenav) {
    sidenav.open();
  };

  showAbout(sidenav: MdSidenav) {
    sidenav.open();
  };

  clickLeftMenu($event: string, sidenav: MdSidenav, router: Router) {
    console.log($event);
  };

  clickRightMenu($event: string, sidenav: MdSidenav, router: Router) {
    console.log($event);
  };

  constructor(private App: AppService, private mdIconRegistry: MdIconRegistry) {
    this.loadIcons();
  }

  loadIcons() {
    this.mdIconRegistry
      .addSvgIcon('menu', '/icon/assets/ic_menu_white_24px.svg')
      .addSvgIcon('thumb-up', '/icon/assets/ic_thumb_up_white_24px.svg')
      .addSvgIconSetInNamespace('core', '/icon/assets/core-icon-set.svg')
      .registerFontClassAlias('fontawesome', 'fa');
  }
}

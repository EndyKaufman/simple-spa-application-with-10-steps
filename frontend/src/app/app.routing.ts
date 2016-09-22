import { RouterModule, Routes } from '@angular/router';

import { HomePage, DetailPage, AboutPage } from './components';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: DetailPage.NAME, component: DetailPage },
  { path: AboutPage.NAME, component: AboutPage }
];

export const routing = RouterModule.forRoot(routes);

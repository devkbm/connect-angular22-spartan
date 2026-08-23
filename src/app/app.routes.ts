import { Routes } from '@angular/router';

import { AppLayout } from './app-layout/app-layout';
import LoginTwoColumnPage from './login/index.page';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginTwoColumnPage },

  //{path: 'home', component: AppLayout},
  {path: 'home', loadChildren: () => import('@src/app/app-layout/app-layout.routes').then(m => m.routes)},
  {path: 'system', loadChildren: () => import('@src/app/system/system-management.routes').then(m => m.routes)},
  {path: 'grw', loadChildren: () => import('@src/app/cooperation/coopertaion.routes').then(m => m.routes)},
  {path: 'hrm', loadChildren: () => import('@src/app/hrm/hrm.routes').then(m => m.routes)},
];

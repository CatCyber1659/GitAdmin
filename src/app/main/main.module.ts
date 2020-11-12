import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ProducttypeModule } from './producttype/producttype.module';

const MainRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },

  {
    path: 'producttype',
    loadChildren: () =>
      import('./producttype/producttype.module').then(
        (m) => m.ProducttypeModule
      ),
  },
];
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    ProducttypeModule,
    SharedModule,
    FormsModule,
    ModalModule.forRoot(),
    RouterModule.forChild(MainRoutes),
  ],
})
export class MainModule {}

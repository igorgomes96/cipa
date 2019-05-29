import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TopnavComponent } from './components/topnav/topnav.component';
import { LeftnavComponent } from './components/leftnav/leftnav.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [TopnavComponent, LeftnavComponent, BreadcrumbComponent],
  imports: [
    SharedModule
  ],
  exports: [
    TopnavComponent, LeftnavComponent
  ]
})
export class CoreModule { }

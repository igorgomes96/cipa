import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TopnavComponent } from './components/topnav/topnav.component';
import { LeftnavComponent } from './components/leftnav/leftnav.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ToastsComponent } from './components/toasts/toasts.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [TopnavComponent, LeftnavComponent, ToastsComponent, BreadcrumbComponent, ModalComponent],
  imports: [
    SharedModule
  ],
  exports: [
    TopnavComponent, LeftnavComponent, ToastsComponent, ModalComponent
  ]
})
export class CoreModule { }

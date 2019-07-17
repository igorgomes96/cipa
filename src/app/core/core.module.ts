import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TopnavComponent } from './components/topnav/topnav.component';
import { LeftnavComponent } from './components/leftnav/leftnav.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ToastsComponent } from './components/toasts/toasts.component';
import { ModalComponent } from './components/modal/modal.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [TopnavComponent, LeftnavComponent, ToastsComponent, BreadcrumbComponent, ModalComponent, FooterComponent],
  imports: [
    SharedModule
  ],
  exports: [
    TopnavComponent, LeftnavComponent, ToastsComponent, ModalComponent, FooterComponent
  ]
})
export class CoreModule { }

import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TopnavComponent } from './components/topnav/topnav.component';
import { LeftnavComponent } from './components/leftnav/leftnav.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ModalComponent } from './components/modal/modal.component';
import { FooterComponent } from './components/footer/footer.component';
import { ToastsComponent } from './components/toasts/toasts.component';

@NgModule({
  declarations: [
    TopnavComponent,
    LeftnavComponent,
    BreadcrumbComponent,
    ModalComponent,
    FooterComponent,
    ToastsComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    TopnavComponent, LeftnavComponent, ModalComponent, FooterComponent, ToastsComponent
  ]
})
export class CoreModule { }

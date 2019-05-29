import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PanelComponent } from './components/panel/panel.component';
import { HttpClientModule } from '@angular/common/http';
import { ArquivosComponent } from './components/arquivos/arquivos.component';

@NgModule({
  declarations: [PanelComponent, ArquivosComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    PanelComponent,
    ArquivosComponent
  ]
})
export class SharedModule { }

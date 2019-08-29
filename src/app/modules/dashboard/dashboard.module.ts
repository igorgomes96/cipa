import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApuracaoChartComponent } from './components/apuracao-chart/apuracao-chart.component';
import { WidgetsComponent } from './components/widgets/widgets.component';
import { RelatorioEleitoresComponent } from './components/relatorio-eleitores/relatorio-eleitores.component';
import { ResultadoApuracaoComponent } from './components/resultado-apuracao/resultado-apuracao.component';
import { RelacaoCandidatosComponent } from './components/relacao-candidatos/relacao-candidatos.component';

@NgModule({
  declarations: [DashboardComponent, ApuracaoChartComponent, WidgetsComponent, RelatorioEleitoresComponent, ResultadoApuracaoComponent, RelacaoCandidatosComponent],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }

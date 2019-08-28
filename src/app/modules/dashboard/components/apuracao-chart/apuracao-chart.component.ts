import { Apuracao } from './../../../../shared/models/apuracao';
import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-apuracao-chart',
  templateUrl: './apuracao-chart.component.html',
  styleUrls: ['./apuracao-chart.component.css']
})
export class ApuracaoChartComponent implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [
        {
          ticks: {
            min: 0,
            max: 10,
            stepSize: 1
          }
        }
      ],
      yAxes: [
        {
          offset: true,
          barThickness: 15,
          gridLines: {
            offsetGridLines: true
          },
        }
      ]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  barChartLegend = false;
  barChartPlugins = [pluginDataLabels];
  barChartLabels: Label[];
  barChartData: ChartDataSets[];

  @Input() apuracao: Apuracao[];
  @Input() barChartType: ChartType = 'bar';

  constructor() { }

  ngOnInit() {
    const minVotos = Math.min(...this.votos);
    if (minVotos > 4) {
      this.barChartOptions.scales.xAxes[0].ticks.min = minVotos - 2;
    }
    const maxVotos = Math.max(...this.votos);
    this.barChartOptions.scales.xAxes[0].ticks.max = maxVotos + 1;
    this.barChartOptions.scales.xAxes[0].ticks.stepSize = Math.round((maxVotos - minVotos) / 20 + 1);
    this.update();
  }

  update() {
    this.barChartData = [
      {
        data: this.votos,
        backgroundColor: 'rgb(124, 181, 236)',
        hoverBackgroundColor: 'rgb(124, 181, 236)',
        borderColor: 'rgb(124, 181, 236)',
        hoverBorderColor: 'rgb(124, 181, 236)'
      }
    ];
    this.barChartLabels = this.nomes;
  }

  private get votos(): number[] {
    return this.apuracao.map(a => a.votos);
  }

  private get nomes(): string[] {
    return this.apuracao.map(a => this.abreviaNome(a.nome));
  }

  private abreviaNome(nome: string) {
    const nomes = nome.split(' ');
    if (nomes.length <= 1) {
      return nome;
    }
    return `${nomes[0]} ${this.primeirasLetras(nomes.slice(1, nomes.length - 1))} ${nomes[nomes.length - 1]}`;
  }

  private primeirasLetras(nomes: string[]): string {
    return nomes.map(n => `${n.charAt(0)}.`).join(' ');
  }

}

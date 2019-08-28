import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-widget-dashboard',
  templateUrl: './widget-dashboard.component.html',
  styleUrls: ['./widget-dashboard.component.css']
})
export class WidgetDashboardComponent implements OnInit {

  @Input() titulo: string;
  @Input() valor: string;
  @Input() estilo: 'navy-bg';
  @Input() icone: string;

  constructor() { }

  ngOnInit() {
  }

}

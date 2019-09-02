import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ajuda-tooltip',
  templateUrl: './ajuda-tooltip.component.html',
  styleUrls: ['./ajuda-tooltip.component.css']
})
export class AjudaTooltipComponent implements OnInit {

  @Input() ajuda = '';
  @Input() contentType = 'html';
  @Input() theme = 'dark';
  @Input() tooltipClass = 'tooltip-image';
  constructor() { }

  ngOnInit() {
  }

}

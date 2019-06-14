import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ajuda-tooltip',
  templateUrl: './ajuda-tooltip.component.html',
  styleUrls: ['./ajuda-tooltip.component.css']
})
export class AjudaTooltipComponent implements OnInit {

  @Input() ajuda = '';
  constructor() { }

  ngOnInit() {
  }

}

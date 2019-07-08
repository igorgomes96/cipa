import { Component, OnInit, Input } from '@angular/core';
import { Arquivo } from 'src/app/shared/models/arquivo';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {

  @Input() templates: Arquivo[];
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[timeline-item]',
  templateUrl: './timeline-item.component.html',
  styleUrls: ['./timeline-item.component.css']
})
export class TimelineItemComponent implements OnInit {

  @Input() calendarClass = 'blue-bg';
  @Input() calendarIcon = 'fa-calendar';

  constructor() { }

  ngOnInit() {
  }

}

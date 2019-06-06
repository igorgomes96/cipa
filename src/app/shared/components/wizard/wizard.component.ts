import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {

  @Input() steps: string[];
  @Input() validNext = true;
  @Output() changeStep = new EventEmitter<number>();
  currentStep = 1;

  constructor() { }

  ngOnInit() {
  }

  nextStep() {
    if (this.steps.length > this.currentStep) {
      this.currentStep++;
      this.changeStep.emit(this.currentStep);
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.changeStep.emit(this.currentStep);
    }
  }
}

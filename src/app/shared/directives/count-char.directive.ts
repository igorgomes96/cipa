import { Directive, HostBinding, ElementRef, Renderer2, Inject, OnInit, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[countChar]'
})
export class CountCharDirective implements OnInit {

  countElement: any;
  @Input() maxChar = 0;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
    ) {
  }

  ngOnInit() {
    this.countElement = this.renderer.createElement('span');
    this.renderer.addClass(this.countElement, 'help-block');
    this.renderer.addClass(this.countElement, 'm-b-none');
    const parent = this.renderer.parentNode(this.elementRef.nativeElement);
    const nextSibling = this.renderer.nextSibling(this.elementRef.nativeElement);
    if (!nextSibling) {
      this.renderer.appendChild(parent, this.countElement);
    } else {
      this.renderer.insertBefore(parent, this.countElement, nextSibling);
    }
  }

  @HostListener('input')
  oninput() {
    const valor = this.elementRef.nativeElement.value as string;
    this.countElement.innerHTML = `${valor.length}/${this.maxChar} ${valor.length > 1 ? 'caracteres' : 'caractere'}.`;
  }
}

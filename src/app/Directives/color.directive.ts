import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appColor]'
})
export class ColorDirective {

  constructor(private eleRef:ElementRef) {
    eleRef.nativeElement.style.color="red"
  }

}

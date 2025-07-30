import { Directive, HostListener } from "@angular/core";

@Directive({
  selector: "[appLimitDecimals]",
})
export class LimitDecimalsDirective {
  constructor() {}

  @HostListener("input", ["$event"]) onInput(event: any) {
    const input = event.target;
    const value = input.value;

    // Check if the input value is a valid number
    if (value.indexOf(".") !== -1) {
      const decimalPart = value.split(".")[1];
      if (decimalPart.length > 3) {
        input.value = parseFloat(value).toFixed(3);
      }
    }
  }
}

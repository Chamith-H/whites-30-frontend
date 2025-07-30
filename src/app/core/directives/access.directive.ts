import { Directive, ElementRef, Input, Renderer2 } from "@angular/core";
import { AccessControlService } from "../services/app-services/authentication/access-control.service";

@Directive({
  selector: "[Access]",
})
export class AccessDirective {
  @Input() Access: number;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private accessControlService: AccessControlService
  ) {}

  ngOnChanges() {
    const accept = this.accessControlService.confirm_exactOneAccess(
      this.Access
    );

    if (accept) {
      this.renderer.removeStyle(this.el.nativeElement, "display");
    } else {
      this.renderer.setStyle(this.el.nativeElement, "display", "none");
    }
  }
}

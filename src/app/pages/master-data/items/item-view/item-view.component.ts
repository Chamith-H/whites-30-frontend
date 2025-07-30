import { Component, EventEmitter, Input, Output } from "@angular/core";
import { SapMasterService } from "src/app/core/services/app-services/master-data/sap-master.service";

@Component({
  selector: "app-item-view",
  templateUrl: "./item-view.component.html",
  styleUrls: ["./item-view.component.scss"],
})
export class ItemViewComponent {
  @Input() data: any;
  @Output() closePopup = new EventEmitter<any>();

  isLoading: boolean = false;
  actualData: any = null;

  constructor(private sapMasterService: SapMasterService) {}

  getActualData() {
    this.isLoading = true;
    this.sapMasterService.getActualData(this.data).subscribe({
      next: (data: any) => {
        this.actualData = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  closeModal() {
    this.closePopup.emit();
  }

  ngOnInit() {
    this.getActualData();
  }
}

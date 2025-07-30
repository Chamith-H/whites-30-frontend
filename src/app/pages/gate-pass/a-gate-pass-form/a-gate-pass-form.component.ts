import { CdkStepper } from "@angular/cdk/stepper";
import { Component, Input, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { sMsg } from "src/app/core/models/shared/success-response.model";
import { GatePassService } from "src/app/core/services/app-services/gate-pass/gate-pass.service";
import { SuccessMessage } from "src/app/core/services/shared/success-message.service";
import { ViewPoComponent } from "./view-po/view-po.component";

@Component({
  selector: "app-a-gate-pass-form",
  templateUrl: "./a-gate-pass-form.component.html",
  styleUrls: ["./a-gate-pass-form.component.scss"],
})
export class AGatePassFormComponent {
  @Input() isEditMode: boolean = false;
  @Input() originData: any = null;

  @ViewChild(CdkStepper) stepper!: CdkStepper;
  index: number = 0;

  vehicleTypes = [
    {
      _id: "Lorry",
      name: "Lorry",
    },
    {
      _id: "Truck",
      name: "Truck",
    },
    {
      _id: "Container",
      name: "Container",
    },
  ];

  form1: FormGroup;
  isSubmit_form1: boolean = false;
  submittingForm_form1: boolean = false;
  complete_form1: boolean = false;

  form2: FormGroup;
  isSubmit_form2: boolean = false;
  submittingForm_form2: boolean = false;
  complete_form2: boolean = false;

  form3: FormGroup;
  isSubmit_form3: boolean = false;
  itemsFormBuilder: FormBuilder = new FormBuilder();
  complete_form3: boolean = false;

  submittingForm_form4: boolean = false;

  isPoLoading: boolean = false;
  poData: any[] = [];
  selectedPoValue: any = null;

  modalRef?: BsModalRef;

  filterData = {
    docNum: null,
  };

  paginationItems = {
    currentPage: 1,
    dataCount: 0,
    pageCount: 0,
  };

  constructor(
    public fb: FormBuilder,
    public toastr: ToastrService,
    private successMessage: SuccessMessage,
    private gatePassService: GatePassService,
    private router: Router,
    private modalService: BsModalService
  ) {
    this.form1 = this.fb.group({
      driverName: ["", [Validators.required]],
      driverNic: ["", [Validators.required]],
      driverLicense: ["", [Validators.required]],
      driverMobile: [
        {
          countryCode: "",
          dialCode: "",
          e164Number: "",
          internationalNumber: "",
          nationalNumber: "",
          number: "",
        },
        [Validators.required],
      ],
      vehicleType: [null, [Validators.required]],
      vehicleNumber: ["", [Validators.required]],
      description: [""],
    });

    this.form2 = this.fb.group({
      poNumber: [null, [Validators.required]],
    });

    this.form3 = this.fb.group({
      DocumentLines: this.createitemList(),
    });
  }

  createItemRow(
    itemCode: string,
    checkedQuantity: number,
    uom: string
  ): FormGroup {
    return this.fb.group({
      itemCode: [itemCode, [Validators.required]],
      checkedQuantity: [checkedQuantity],
      uom: [uom],
    });
  }

  createitemList(): FormArray {
    return this.itemsFormBuilder.array([]);
  }

  get itemList(): FormArray {
    return this.form3.get("DocumentLines") as FormArray;
  }

  submit_form1() {
    this.isSubmit_form1 = true;

    if (this.form1.invalid) {
      this.toastr.error("Please fill the form correctly!");
      return;
    }

    this.submittingForm_form1 = true;

    const formValues = this.form1.value;

    if (!this.complete_form1) {
      this.gatePassService.create(formValues).subscribe({
        next: (res: any) => {
          this.originData = res.data;
          this.toastr.success(res.message);
          this.submittingForm_form1 = false;
          this.complete_form1 = true;
          setTimeout(() => {
            this.stepper.next();
          }, 100);
        },
        error: (err) => {
          console.log(err);
          this.submittingForm_form1 = false;
        },
      });
    } else {
      this.stepper.next();
    }
  }

  submit_form2() {
    this.isSubmit_form2 = true;

    if (this.form2.invalid) {
      this.toastr.error("Please select a purchase order to continue!");
      return;
    }

    this.submittingForm_form2 = true;

    this.gatePassService.checkPo(this.form2.value.poNumber).subscribe({
      next: (res: any) => {
        this.complete_form2 = true;
        this.submittingForm_form2 = false;

        setTimeout(() => {
          this.stepper.next();
        }, 100);
      },
      error: (err) => {
        console.log(err);
        this.submittingForm_form2 = false;
      },
    });
  }

  submit_form3() {
    this.isSubmit_form3 = true;

    if (this.form3.invalid) {
      this.toastr.error("Please select a purchase order to continue!");
      return;
    }

    this.complete_form3 = true;

    setTimeout(() => {
      this.stepper.next();
    }, 100);
  }

  submit_form4() {
    this.submittingForm_form4 = true;

    const id = this.originData._id;

    const body = {
      ...this.form1.value,
      po: this.form2.value.poNumber,
      lineItems: this.form3.value.DocumentLines,
    };

    this.gatePassService.updateGatePass(id, body).subscribe({
      next: (res: sMsg) => {
        this.successMessage.show(res.message);
        this.submittingForm_form4 = false;
        this.router.navigate(["/gate-pass"]);
      },
      error: (err) => {
        console.log(err);
        this.submittingForm_form4 = false;
      },
    });
  }

  //!--> Getters.......................................................................|
  // Get all PO s
  getAllPOs(page: number, filter: any) {
    this.isPoLoading = true;
    this.gatePassService.getAllPO(page, filter).subscribe({
      next: (res) => {
        this.paginationItems.currentPage = res.currentPage;
        this.paginationItems.pageCount = res.pageCount;
        this.paginationItems.dataCount = res.dataCount;
        this.poData = res.data;

        this.isPoLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isPoLoading = false;
      },
    });
  }

  searchPo() {
    this.getAllPOs(1, this.filterData);
  }

  changePage(page: number) {
    this.getAllPOs(page, this.filterData);
  }

  viewPurchaseOrder(docNum: number) {
    const poDetails = this.poData.find((po: any) => po.DocNum === docNum);

    this.modalRef = this.modalService.show(ViewPoComponent, {
      initialState: {
        data: poDetails,
      },

      class: "modal-xl modal-dialog-centered",
    });

    this.modalRef.content.closePopup.subscribe(() => {
      this.modalRef.hide();
    });
  }

  changePurchaseOrder() {
    (this.form3.get("DocumentLines") as FormArray).clear();
    this.complete_form2 = false;
    const poNumber = this.form2.value.poNumber;
    const selectedPo = this.poData.find((po: any) => po.DocNum === poNumber);

    this.selectedPoValue = selectedPo;

    selectedPo.DocumentLines.map((d_line: any) => {
      this.itemList.push(
        this.createItemRow(d_line.ItemCode, null, d_line.UoMCode)
      );
    });
  }

  dataReturner(itemCode: string) {
    const lineItems = this.selectedPoValue?.DocumentLines;

    const itemObj = lineItems.find((item: any) => item.ItemCode === itemCode);
    return itemObj;
  }

  //!-->
  ngOnInit() {
    this.getAllPOs(1, this.filterData);

    if (this.isEditMode) {
      this.form1.patchValue(this.originData);
      this.complete_form1 = true;
    }
  }
}

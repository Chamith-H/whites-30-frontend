import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { InspectionService } from "src/app/core/services/app-services/operations/inspection.service";
import { SuccessMessage } from "src/app/core/services/shared/success-message.service";
import Swal from "sweetalert2";
import { SampleGatherComponent } from "../inspection-conf/sample-gather/sample-gather.component";
import { DateShower } from "src/app/core/services/shared/date-shower.service";
import { GetActionComponent } from "../inspection-conf/get-action/get-action.component";
import { supabase } from "src/app/core/services/shared/superbase.config";
import { sMsg } from "src/app/core/models/shared/success-response.model";

@Component({
  selector: "app-inspection-view",
  templateUrl: "./inspection-view.component.html",
  styleUrls: ["./inspection-view.component.scss"],
})
export class InspectionViewComponent {
  @Input() data: any = null;
  @Input() stage: string = "";

  @Output() closePopup = new EventEmitter<any>();
  @Output() closePopupAndReload = new EventEmitter<any>();

  modalRef?: BsModalRef;

  sampleCols: string[] = [];
  parameterData: any[] = [];

  sampleMethods = [
    {
      name: "Single sample test",
      _id: "Single-Test",
    },
    {
      name: "Multi sample test",
      _id: "Multi-Test",
    },
  ];

  form2: FormGroup;
  isSubmit_form2: boolean = false;

  form3: FormGroup;
  isSubmit_form3: boolean = false;
  itemsFormBuilder: FormBuilder = new FormBuilder();

  isSaving: boolean = false;

  constructor(
    private inspectionService: InspectionService,
    private successMessage: SuccessMessage,
    private modalService: BsModalService,
    public fb: FormBuilder,
    public toastr: ToastrService,
    public dateShower: DateShower
  ) {
    this.form2 = this.fb.group({
      method: [null, [Validators.required]],
      sampleCount: [null, [Validators.required]],
    });

    this.form3 = this.fb.group({
      DocumentLines: this.createitemList(),
    });
  }

  changeMethod() {
    const method = this.form2.value.method;

    if (method === "Single-Test") {
      this.form2.get("sampleCount").setValue(1);
    } else {
      this.form2.get("sampleCount").setValue(2);
    }
  }

  createitemList(): FormArray {
    return this.itemsFormBuilder.array([]);
  }

  // ✅ UPDATED createItemRow
  createItemRow(parameter: any): FormGroup {
    return this.fb.group({
      parameterId: [parameter.parameterId, [Validators.required]],
      parameterName: [parameter.parameterIdenity],
      uom: [parameter.parameterUom],
      category: [parameter.parameterCategory],
      type: [parameter.parameterType],
      mandatory: [parameter.mandatory],
      minValue: [parameter.minValue],
      maxValue: [parameter.maxValue],
      stdValue: [parameter.stdValue],
      samplingData: this.fb.array(
        parameter.samplingData.map((sample: any) =>
          this.fb.group({
            sampleId: [sample.sampleId],
            sampleName: [sample.sampleName],
            sampleIndex: [sample.sampleIndex],
            observedValue: [sample.observedValue, Validators.required],
          })
        )
      ),
    });
  }

  get itemList(): FormArray {
    return this.form3.get("DocumentLines") as FormArray;
  }

  // ✅ NEW helper
  getSamplingData(formGroup: FormGroup): FormArray {
    return formGroup.get("samplingData") as FormArray;
  }

  isStarting: boolean = false;

  getDate() {
    return this.dateShower.viewDate();
  }

  startInspection() {
    this.isStarting = true;

    const body = {
      stageName: this.stage,
      docNum: this.data.DocNum,
      itemCode: this.data.ItemCode,
      line: this.data.Line,
      method: this.form2.value.method,
      sampleCount: this.form2.value.sampleCount,
    };

    this.inspectionService.startInspection(body).subscribe({
      next: (data: any) => {
        const itemParameterMapper = data.values.map((i_param: any) => {
          const matching = data.sampleValues.find(
            (s: any) => s.parameterId === i_param.parameterId
          );
          return {
            ...i_param,
            samplingData: matching?.samplingData || [],
          };
        });

        this.isStarting = false;
        this.sampleCols = data.samples;
        this.parameterData = itemParameterMapper;

        this.modalRef = this.modalService.show(SampleGatherComponent, {
          initialState: {
            sampleCols: data.samples,
            parameterData: itemParameterMapper,
            sampleValues: data.sampleValues,
            data: this.data,
            stage: this.stage,
          },
          backdrop: "static",
          class: "modal-xl modal-dialog-centered",
        });

        this.modalRef.content.closePopup.subscribe(() => {
          this.modalRef.hide();
        });

        this.modalRef.content.closePopupAndReload.subscribe(() => {
          this.modalRef.hide();
          this.closePopupAndReload.emit();
        });
      },
      error: (err) => {
        console.log(err);
        this.isStarting = false;
      },
    });
  }

  valueFetcher(
    category: string,
    type: string,
    minValue: string,
    maxValue: string,
    stdValue: string
  ) {
    if (category === "Fixed") {
      if (type === "Percentage") {
        return `X = ${stdValue}%`;
      } else {
        return `X = ${stdValue}`;
      }
    } else if (category === "Range") {
      if (type === "Percentage") {
        return `${minValue}% < X < ${maxValue}%`;
      } else {
        return `${minValue} < X < ${maxValue}`;
      }
    } else if (category === "Grater-Than") {
      if (type === "Percentage") {
        return `${minValue}% < X`;
      } else {
        return `${minValue} < X`;
      }
    } else if (category === "Less-Than") {
      if (type === "Percentage") {
        return `${maxValue}% > X`;
      } else {
        return `${maxValue} > X`;
      }
    } else {
      return `X = ${stdValue}`;
    }
  }

  loadingItems: boolean = false;

  onReset() {}

  flattenSamplingData(): any[] {
    const documentLines = this.form3.value.DocumentLines;
    const allSamplingData: any[] = [];

    documentLines.forEach((line: any) => {
      if (line.samplingData && Array.isArray(line.samplingData)) {
        allSamplingData.push(...line.samplingData);
      }
    });

    return allSamplingData;
  }

  submit_form3() {
    this.isSaving = true;
    const flatSamplingData = this.flattenSamplingData();

    const body = {
      data: flatSamplingData,
    };

    this.inspectionService.saveData(body).subscribe({
      next: (data: any) => {
        this.isSaving = false;
        this.itemList.clear();

        this.loadingItems = true;

        const body = {
          stageName: this.stage,
          docNum: this.data.DocNum,
          itemCode: this.data.ItemCode,
          round: this.data.U_Round,
        };

        this.inspectionService.checkingItems(body).subscribe({
          next: (data: any) => {
            this.loadingItems = false;

            if (data.length > 0) {
              this.sampleCols = data[0].samplingData.map((s) => s.sampleName);
            }

            data.forEach((m_data: any) => {
              this.itemList.push(this.createItemRow(m_data));
            });
          },
          error: (err) => {
            console.log(err);
            this.loadingItems = false;
          },
        });
      },
      error: (err) => {
        console.log(err);
        this.isSaving = false;
      },
    });
  }

  loadingOpend: boolean = false;

  getAction(action: string) {
    this.modalRef = this.modalService.show(GetActionComponent, {
      initialState: {
        action: action,
        id: this.data._id,
        data: this.data,
        stage: this.stage,
      },
      backdrop: "static",
      class: "modal-lg modal-dialog-centered",
    });

    this.modalRef.content.closePopup.subscribe(() => {
      this.modalRef.hide();
    });

    this.modalRef.content.closePopupAndReload.subscribe(() => {
      this.modalRef.hide();
      this.closePopupAndReload.emit();
    });
  }

  viewDocument(doc: any) {
    const directUrl = doc.url;

    const a = document.createElement("a");
    a.href = directUrl;
    a.download = doc.name;
    a.click();
  }

  deleteDocument(doc: any) {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete this document?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.loadingDocuments = true;
        const filePath = doc.path;

        supabase.storage
          .from("syneris")
          .remove(filePath)
          .then(({ data, error }) => {
            if (error) {
              console.error("Delete error:", error.message);
              return;
            }

            this.inspectionService.deleteDocuments(doc._id).subscribe({
              next: (res: sMsg) => {
                this.successMessage.show(res.message);

                this.getDocuments();
              },
              error: (err) => {
                console.error("Failed to delete document record:", err);
              },
            });
          });
      }
    });
  }

  loadingDocuments: boolean = false;
  documents: any[] = [];

  getDocuments() {
    this.loadingDocuments = true;
    this.inspectionService.viewDocuments(this.data._id).subscribe({
      next: (data: any[]) => {
        this.loadingDocuments = false;
        this.documents = data;
      },
      error: (err) => {
        console.log(err);
        this.loadingDocuments = false;
      },
    });
  }

  ngOnInit() {
    if (this.data.U_Approval === "Open") {
      this.loadingOpend = true;

      const body = {
        stageName: this.stage,
        itemCode: this.data.ItemCode,
      };

      this.inspectionService.startConf(body).subscribe({
        next: (data: any) => {
          this.loadingOpend = false;
          this.form2.patchValue(data);
        },
        error: (err) => {
          console.log(err);
          this.loadingOpend = false;
        },
      });
    }

    if (this.data.U_Approval !== "Open") {
      this.loadingItems = true;

      const body = {
        stageName: this.stage,
        docNum: this.data.DocNum,
        itemCode: this.data.ItemCode,
        round: this.data.U_Round,
      };

      this.inspectionService.checkingItems(body).subscribe({
        next: (data: any) => {
          this.loadingItems = false;

          if (data.length > 0) {
            this.sampleCols = data[0].samplingData.map((s) => s.sampleName);
          }

          data.forEach((m_data: any) => {
            this.itemList.push(this.createItemRow(m_data));
          });

          this.getDocuments();
        },
        error: (err) => {
          console.log(err);
          this.loadingItems = false;
        },
      });
    }
  }
}

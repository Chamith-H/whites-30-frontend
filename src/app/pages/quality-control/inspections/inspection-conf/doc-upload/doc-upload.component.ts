import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { SingleFileUploadModel } from "src/app/core/models/shared/file-upload.model";
import { sMsg } from "src/app/core/models/shared/success-response.model";
import { BucketService } from "src/app/core/services/app-services/bucket/bucket.service";
import { InspectionService } from "src/app/core/services/app-services/operations/inspection.service";
import { SuccessMessage } from "src/app/core/services/shared/success-message.service";
import { supabase } from "src/app/core/services/shared/superbase.config";

@Component({
  selector: "app-doc-upload",
  templateUrl: "./doc-upload.component.html",
  styleUrls: ["./doc-upload.component.scss"],
})
export class DocUploadComponent {
  @Input() id: string = "";
  @Output() closePopup = new EventEmitter<any>();
  @Output() closePopupAndReload = new EventEmitter<any>();

  @ViewChild("fileInput", { static: true }) fileInput: ElementRef;
  @Output() imageFile: EventEmitter<any> = new EventEmitter<any>();

  // Currently showing image
  isImage: boolean = false;
  selectedImage: string | ArrayBuffer | null = null;

  finalFile: any = null;

  constructor(
    private bucketService: BucketService,
    private inspectionService: InspectionService,
    private successMessage: SuccessMessage
  ) {}

  //!--> Image handlers...................................................................|
  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];

    if (file) {
      this.finalFile = file;

      const isImage = file.type.startsWith("image/");

      if (isImage) {
        this.isImage = true;
        this.handleFile(file);
      } else {
        this.isImage = false;
      }
    }
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];

    if (file) {
      console.log(file);
      this.finalFile = file;
      const isImage = file.type.startsWith("image/");

      if (isImage) {
        this.isImage = true;
        this.handleFile(file);
      } else {
        this.isImage = false;
      }
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  //!--> Image processors..................................................................|
  // Get file
  handleFile(file: File | null) {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.selectedImage = event.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }

  isUploading: boolean = false;

  uploadDocument() {
    this.isUploading = true;

    const filePath = `inspections/${this.finalFile.name}`;

    supabase.storage
      .from("syneris")
      .upload(filePath, this.finalFile)
      .then(async ({ data, error }) => {
        if (error) {
          console.error("Upload error:", error.message);
          return;
        }

        console.log(data, "Datas");

        // ✅ Get public URL
        const { data: urlData } = supabase.storage
          .from("syneris")
          .getPublicUrl(filePath);

        const body = {
          refId: this.id,
          name: this.finalFile.name,
          fullPath: data.fullPath,
          path: data.path,
          docId: data.id,
          url: urlData.publicUrl,
        };

        this.inspectionService.uploadDocuments(body).subscribe({
          next: (res: sMsg) => {
            this.isUploading = false;
            this.successMessage.show(res.message);
            this.closePopupAndReload.emit();
          },
          error: (err) => {
            console.log(err);
            this.isUploading = false;
          },
        });
      });
  }
}

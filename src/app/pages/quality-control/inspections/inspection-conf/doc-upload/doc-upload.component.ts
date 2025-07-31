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
import axios from "axios";

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

  sasToken =
    "sp=racwdli&st=2025-07-25T09:10:24Z&se=2025-08-02T17:25:24Z&sv=2024-11-04&sr=c&sig=NR7f8seDMpTxf7sj8edhnQr%2FEXHJ9GNhM3XuMpskCV4%3D";
  sasUrl = "https://synerisblobstorage.blob.core.windows.net/servicedocs/";

  constructor(
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

  private async bufferToBase64(buffer: Blob | File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = (reader.result as string).split(",")[1]; // remove `data:...;base64,`
        resolve(base64data);
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(buffer); // auto encodes to base64
    });
  }

  uploadDocument() {
    this.isUploading = true;

    this.bufferToBase64(this.finalFile).then(async (base64) => {
      const bufferUrl = `${this.sasUrl}${this.finalFile.name}?${this.sasToken}`;

      try {
        const response = await axios.put(bufferUrl, base64, {
          headers: {
            "x-ms-blob-type": "BlockBlob",
            "Content-Type": "image/png",
          },
        });

        if (response) {
          console.log("Upload success!");

          const body = {
            refId: this.id,
            name: this.finalFile.name,
            fullPath: "",
            path: "",
            docId: "",
            url: response.config.url,
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
        }
      } catch (error: any) {
        console.error("Upload failed:", error);
      }
    });
  }
}

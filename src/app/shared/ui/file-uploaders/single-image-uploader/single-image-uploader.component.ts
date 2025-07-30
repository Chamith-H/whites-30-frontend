import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { SingleFileUploadModel } from "src/app/core/models/shared/file-upload.model";

@Component({
  selector: "app-single-image-uploader",
  templateUrl: "./single-image-uploader.component.html",
  styleUrls: ["./single-image-uploader.component.scss"],
})
export class SingleImageUploaderComponent {
  @Input() label: string = "";
  @Input() placeholder: string = "";
  @ViewChild("fileInput", { static: true }) fileInput: ElementRef;
  @Output() imageFile: EventEmitter<any> = new EventEmitter<any>();

  // Currently showing image
  @Input() selectedImage: string | ArrayBuffer | null = null;

  //!--> Image handlers...................................................................|
  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    this.handleFile(file);
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    this.handleFile(file);
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
        const convertedFile: SingleFileUploadModel = this.processFile(
          event.target?.result
        );

        // Send uploadable image -> Should be appended
        this.imageFile.emit(convertedFile);
      };
      reader.readAsDataURL(file);
    }
  }

  // Change image structure
  processFile(url: any) {
    const image: SingleFileUploadModel = {
      file: this.imageConverter(url),
      type: this.imageConverter(url).type.split("/")[1],
      name: "image",
    };

    return image;
  }

  // Convert to BLOB
  imageConverter(url: any) {
    const matches = url.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);

    if (matches.length !== 3) {
      throw new Error("Invalid url type");
    }

    const contentType = matches[1];
    const data = matches[2];
    const byteCharacters = atob(data);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: contentType });

    return blob;
  }
}

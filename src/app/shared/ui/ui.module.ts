import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxIntlTelInputModule } from "ngx-intl-tel-input";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { LoaderComponent } from "./common/loader/loader.component";
import { PageTitleComponent } from "./common/page-title/page-title.component";
import { NoDataComponent } from "./common/no-data/no-data.component";
import { InputFieldComponent } from "./inputs/input-field/input-field.component";
import { DropdownFieldComponent } from "./inputs/dropdown-field/dropdown-field.component";
import { TogglerInputComponent } from "./inputs/toggler-input/toggler-input.component";
import { SubmitButtonComponent } from "./buttons/submit-button/submit-button.component";
import { DetailButtonComponent } from "./buttons/detail-button/detail-button.component";
import { ParagraphViwerComponent } from "./viwers/paragraph-viwer/paragraph-viwer.component";
import { ImageViwerComponent } from "./viwers/image-viwer/image-viwer.component";
import { DocumentViwerComponent } from "./viwers/document-viwer/document-viwer.component";
import { AccessDirective } from "src/app/core/directives/access.directive";
import { SearchableDropdownComponent } from "./inputs/searchable-dropdown/searchable-dropdown.component";
import { DatePickerComponent } from "./inputs/date-picker/date-picker.component";
import { TelInputFieldComponent } from "./inputs/tel-input-field/tel-input-field.component";
import { SingleImageUploaderComponent } from "./file-uploaders/single-image-uploader/single-image-uploader.component";
import { MultipleImageUploaderComponent } from "./file-uploaders/multiple-image-uploader/multiple-image-uploader.component";
import { DescriptionBoxComponent } from "./inputs/description-box/description-box.component";
import { PopupTitleComponent } from "./common/popup-title/popup-title.component";
import { FilterTableComponent } from "./tables/filter-table/filter-table.component";
import { LineTableComponent } from "./tables/line-table/line-table.component";
import { DetailHeadComponent } from "./viwers/detail-head/detail-head.component";
import { RadioInputComponent } from "./inputs/radio-input/radio-input.component";
import { ContentLoaderComponent } from "./common/content-loader/content-loader.component";
import { RadioCircleComponent } from "./inputs/radio-circle/radio-circle.component";
import { QuantityInputComponent } from "./inputs/quantity-input/quantity-input.component";
import { LimitDecimalsDirective } from "src/app/core/directives/decimal-input.directive";
import { CheckboxInputComponent } from "./inputs/checkbox-input/checkbox-input.component";
import { SingleCheckComponent } from "./inputs/single-check/single-check.component";

@NgModule({
  declarations: [
    LimitDecimalsDirective,
    AccessDirective,
    LoaderComponent,
    PageTitleComponent,
    NoDataComponent,
    InputFieldComponent,
    DropdownFieldComponent,
    TogglerInputComponent,
    SubmitButtonComponent,
    DetailButtonComponent,
    ParagraphViwerComponent,
    ImageViwerComponent,
    DocumentViwerComponent,
    SearchableDropdownComponent,
    DatePickerComponent,
    TelInputFieldComponent,
    SingleImageUploaderComponent,
    MultipleImageUploaderComponent,
    DescriptionBoxComponent,
    PopupTitleComponent,
    FilterTableComponent,
    LineTableComponent,
    DetailHeadComponent,
    RadioInputComponent,
    ContentLoaderComponent,
    RadioCircleComponent,
    QuantityInputComponent,
    CheckboxInputComponent,
    SingleCheckComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxIntlTelInputModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
  exports: [
    // Access control directive
    AccessDirective,

    // Common elements
    LoaderComponent,
    PageTitleComponent,
    PopupTitleComponent,
    DetailHeadComponent,
    ParagraphViwerComponent,
    ContentLoaderComponent,
    NoDataComponent,

    // Input elements
    InputFieldComponent,
    DropdownFieldComponent,
    SearchableDropdownComponent,
    TogglerInputComponent,
    DatePickerComponent,
    TelInputFieldComponent,
    DescriptionBoxComponent,
    RadioInputComponent,
    RadioCircleComponent,
    QuantityInputComponent,
    CheckboxInputComponent,
    SingleCheckComponent,

    // File Uploaders
    SingleImageUploaderComponent,

    // Buttons
    SubmitButtonComponent,
    DetailButtonComponent,

    //Tables
    FilterTableComponent,
  ],
})
export class UIModule {}

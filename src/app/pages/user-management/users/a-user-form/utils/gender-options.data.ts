import { Gender } from "src/app/core/enums/app-enums/user.enum";
import { DropDownModel } from "src/app/core/models/shared/dropdown.model";

export const genderOptions: DropDownModel[] = [
  { _id: Gender.MALE, name: Gender.MALE },
  { _id: Gender.FEMALE, name: Gender.FEMALE },
  { _id: Gender.OTHER, name: Gender.OTHER },
];

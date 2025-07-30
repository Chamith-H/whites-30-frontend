import { VerificationType } from "src/app/core/enums/app-enums/user.enum";
import { DropDownModel } from "./../../../../../core/models/shared/dropdown.model";

export const verificationOptions: DropDownModel[] = [
  { _id: VerificationType.NIC, name: VerificationType.NIC },
  { _id: VerificationType.Passport, name: VerificationType.Passport },
];

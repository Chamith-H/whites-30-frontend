import {
  Gender,
  VerificationType,
} from "src/app/core/enums/app-enums/user.enum";
import { TelNumberModel } from "../../shared/telephone-number.model";

export interface SavedUserModel {
  userId: string;
  name: string;
  type: string;
  roleId: string;
  roleName: string;
  profileImage: string;
}

export interface CreateUserModel {
  // Personal details
  name: string;
  dob?: string;
  houseNo?: string;
  street1?: string;
  street2?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: number;
  verificationType: VerificationType;
  verificationNumber: string;
  gender?: Gender;
  description?: string;

  // Office details
  role: string;
  officeMobile: TelNumberModel;
  officeEmail: string;
  employeeId: string;

  // Config details
  status: boolean;
}

export interface EditUserModel {
  // Personal details
  name: string;
  dob?: string;
  houseNo?: string;
  street1?: string;
  street2?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: number;
  verificationType: VerificationType;
  verificationNumber: string;
  gender?: Gender;
  description?: string;
  profileImage?: string;

  // Office details
  role: string;
  officeMobile: TelNumberModel;
  officeEmail: string;
  employeeId: string;

  // Config details
  status: boolean;
  createdDate: Date;
}

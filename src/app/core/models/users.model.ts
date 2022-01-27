import {TimeApiModel} from "./api/time.api.model";

export interface Roles{
  student?: boolean;
  tutor?: boolean;
  admin?: boolean;
  operator?: boolean;
  super_admin?: boolean;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  firstname: string;
  lastname: string;
  password: string;
  phoneNumber?: string;
  updatedAt: TimeApiModel;
  createdAt: TimeApiModel;
  roles: Roles;

}


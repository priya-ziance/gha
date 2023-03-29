import IBaseModel from "./_baseModel";
import moment, { Moment } from "moment";
import { IStaffWithness } from "../types";

export default class StaffWithness implements IBaseModel {
  address?: string;
  id: string;
  hiredDate?: Moment;
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  staffWitness: IStaffWithness;

  constructor(staffWitness: IStaffWithness) {
    this.address = staffWitness.address;
    this.id = staffWitness._id;
    this.firstName = staffWitness.first_name;
    this.lastName = staffWitness.last_name;
    this.mobile = staffWitness.mobile;
    this.email = staffWitness.email;
    this.hiredDate = staffWitness.hired_date
      ? moment(staffWitness.hired_date)
      : undefined;
    this.staffWitness = staffWitness;
  }
}

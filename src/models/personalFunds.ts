import IBaseModel from "./_baseModel";
import moment, { Moment } from "moment";
import { IPersonalFunds } from "../types";

export default class PeronalFunds implements IBaseModel {
  address?: string;
  id: string;
  hiredDate?: Moment;
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  personalFunds: IPersonalFunds;

  constructor(personalFunds: IPersonalFunds) {
    this.address = personalFunds.address;
    this.id = personalFunds._id;
    this.firstName = personalFunds.first_name;
    this.lastName = personalFunds.last_name;
    this.mobile = personalFunds.mobile;
    this.email = personalFunds.email;
    this.hiredDate = personalFunds.hired_date
      ? moment(personalFunds.hired_date)
      : undefined;
    this.personalFunds = personalFunds;
  }
}

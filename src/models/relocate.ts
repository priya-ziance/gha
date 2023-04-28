import IBaseModel from "./_baseModel";
import moment, { Moment } from "moment";
import { IRelocate } from "../types";

export default class Relocate implements IBaseModel {
  id: string | undefined
  home_transfer_date?: Moment;
  client?: string;
  group_home_name?: string;
  location?: string;
  phone?: string;
  contact_type?:string;
  relocate?: IRelocate;

  constructor(relocate: IRelocate) {
    this.id = relocate._id
    this.home_transfer_date = relocate.home_transfer_date;
    this.client = relocate.client;
    this.group_home_name = relocate.group_home_name;
    this.location = relocate.location;
    this.phone = relocate.phone;
    this.contact_type = relocate.contact_type;
    this.home_transfer_date = relocate.home_transfer_date
      ? moment(relocate.home_transfer_date)
      : undefined;
    this.relocate = relocate;
  }
}

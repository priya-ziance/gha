import IBaseModel from "./_baseModel";
import moment, { Moment } from "moment";
import { IDischarge } from "../types";

export default class AddHomeDischarge implements IBaseModel {
    client?: string;
  id: string;
  homeDischargeDate?: Moment;
  organizationName?: string;
  organizationLocation?: string;
  organizationMainContact?: string;
  organizationPhone?: string;
  discharge: IDischarge;

  constructor(discharge: IDischarge) {
    this.client = discharge.client;
    this.id = discharge._id;
    this.organizationName = discharge.organization_name;
    this.organizationLocation = discharge.organization_location;
    this.organizationMainContact = discharge.organization_main_contact;
    this.organizationPhone = discharge.organization_phone;
    this.homeDischargeDate = discharge.home_discharge_date
      ? moment(discharge.home_discharge_date)
      : undefined;
    this.discharge = discharge;
  }
}

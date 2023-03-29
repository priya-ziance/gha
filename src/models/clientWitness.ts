import IBaseModel from "./_baseModel";
import moment, { Moment } from "moment";
import { IClientWithness } from "../types";

export default class ClientWitness implements IBaseModel {
  address?: string;
  id: string;
  hiredDate?: Moment;
  firstName?: string;
  lastName?: string;
  contactType?: string;
  email?: string;
  mobile?: string;
  clientWitness: IClientWithness;

  constructor(clientWitness: IClientWithness) {
    this.address = clientWitness.address;
    this.id = clientWitness._id;
    this.firstName = clientWitness.first_name;
    this.lastName = clientWitness.last_name;
    this.contactType = clientWitness.contact_type;
    this.mobile = clientWitness.mobile;
    this.email = clientWitness.email;
    this.hiredDate = clientWitness.hired_date
      ? moment(clientWitness.hired_date)
      : undefined;
    this.clientWitness = clientWitness;
  }
}

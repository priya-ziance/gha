import IBaseModel from "./_baseModel";
import moment, { Moment } from "moment";
import { IAddTrainer } from "../types";

export default class AddTrainer implements IBaseModel {
  address?: string;
  id: string;
  hiredDate?: Moment;
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  trainer: IAddTrainer;

  constructor(trainer: IAddTrainer) {
    this.address = trainer.address;
    this.id = trainer._id;
    this.firstName = trainer.first_name;
    this.lastName = trainer.last_name;
    this.mobile = trainer.mobile;
    this.email = trainer.email;
    this.hiredDate = trainer.hired_date
      ? moment(trainer.hired_date)
      : undefined;
    this.trainer = trainer;
  }
}

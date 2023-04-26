import IBaseModel from "./_baseModel";
import moment, { Moment } from "moment";
import { ISeizurelogs } from "../types";
import { UnaryExpression } from "typescript";

export default class SeizureLogs implements IBaseModel {
  id: string | undefined ;
  date?: Moment;
  notes?: string;
  time?: string;
  Injuries?: string;
  activity_preceding?: string;
  duration?: string;
  active?: boolean;
  patient_have_seizure?: string;
  seizurelogs?: ISeizurelogs;

  constructor(seizurelogs: ISeizurelogs) {
    this.patient_have_seizure = seizurelogs.patient_have_seizure;
    this.id = seizurelogs._id;
    this.notes = seizurelogs.notes;
    this.time = seizurelogs.time;
    this.Injuries = seizurelogs.Injuries;
    this.activity_preceding = seizurelogs.activity_preceding;
    this.date = seizurelogs.date
      ? moment(seizurelogs.date)
      : undefined;
    this.seizurelogs = seizurelogs;
  }
}

import IBaseModel from './_baseModel';
import moment, { Moment } from 'moment';
import { IMedication, IFileModel, IMedicationModel } from '../types'

export default class Medication implements IBaseModel {
  id: string;
  client: string;
  creator: string;
  proprietary_name?: string;
  non_proprietary_name?: string;
  route_name?: string;
  type?: string;
  dosage?: string;
  directions?: string;
  med_time?: string;
  picture?: string;
  createdAt?: Moment;
  updatedAt?: Moment;
  medication: IMedication;
  

  constructor(medication: IMedication) {
      this.id = medication._id;
      this.client = medication.client;
      this.creator = medication.creator;
      this.non_proprietary_name = medication.non_proprietary_name;
      this.createdAt = moment(medication.createdAt);
      this.medication = medication;

  }

  static fromArray(medication: IMedication[]): IMedicationModel[] {
    return medication.map(i => new Medication(i));
  }
}

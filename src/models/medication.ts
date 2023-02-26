import IBaseModel from './_baseModel';
import IFile from './file';
import moment, { Moment } from 'moment';
import { IMedication, IFileModel, IMedicationModel } from '../types'

export default class Medication implements IBaseModel {
  id: string;
  client: string; 
  type?: string;
  dosage?: string;
  directions?: string;
  picture?: IFileModel;
  medication?: string;
  routeName?: string;  
  medTime?: string[];
  quantity?: number;
  notes?: string;
  medicationReason?: string;
  script?: IFileModel;
  prnMed?: boolean;
  tempMed?: boolean;
  takenDays?: string;
  status?: string;
  refills?: number;
  doctor?: string; 
  drugLink?: string;
  scriptDate?: Moment;
  createdAt?: Moment;
  apiMedication: IMedication;

  constructor(medication: IMedication) {
      this.id = medication._id;
      this.client = medication.client;
      this.dosage = medication.dosage;
      this.type = medication.type;
      this.directions = medication.directions;
      this.routeName = medication.route_name;
      this.medication = medication.medication;
      this.scriptDate = moment(medication.script_date)
      this.medTime = medication.med_time;
      this.picture = medication.picture ? new IFile(medication.picture): undefined
      this.script = medication.script ? new IFile(medication.script): undefined
      this.prnMed = medication.prn_med
      this.tempMed = medication.temp_med
      this.medicationReason = medication.medication_reason
      this.refills = medication.refills
      this.doctor = medication.doctor;
      this.takenDays = medication.taken_days;
      this.notes = medication.notes;
      this.quantity = medication.quantity;
      this.drugLink = medication.drug_link;

      this.createdAt = moment(medication.created_at);
      this.apiMedication = medication;
  }

  static fromArray(medication: IMedication[]): IMedicationModel[] {
    return medication.map(i => new Medication(i));
  }
}

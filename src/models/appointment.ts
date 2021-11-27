import IBaseModel from './_baseModel';
import moment, { Moment } from 'moment';
import { IAppointment } from '../types'

export default class Appointment implements IBaseModel {
    id: string;
    clientName: string;
    appointmentDate?: Moment;
    time?: Moment;
    doctor?: string;
    contactType?: string;
    typeOfAppointment?: string;
    staffNotes?: string;
    physicianNotes?: string;
    apptNotes?: string;
    active?: boolean;
    annual_dental? : boolean;
    annual_medical? : boolean;

    constructor(appointment: IAppointment) {
        this.active = appointment.active;
        this.annual_dental = appointment.annual_dental;
        this.annual_medical = appointment.annual_medical;
        this.appointmentDate = appointment.appointmentDate ? moment(appointment.appointmentDate) : undefined;
        this.apptNotes = appointment.apptNotes
        this.clientName = appointment.clientName;
        this.contactType = appointment.contactType;
        this.doctor = appointment.doctor;
        this.id = appointment.id;
        this.physicianNotes = appointment.physicianNotes;
        this.staffNotes = appointment.staffNotes;
        this.typeOfAppointment = appointment.typeOfAppointment;       
      }
}

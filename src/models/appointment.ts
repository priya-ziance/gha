import IBaseModel from './_baseModel';
import Client from './client';
import File from './file';
import moment, { Moment } from 'moment';
import { IAppointment, IClientModel, IFileModel } from '../types'

export default class Appointment implements IBaseModel {
    id: string;
    appointmentDate?: Moment;
    client?: IClientModel;
    time?: Moment;
    doctor?: string;
    contactType?: string;
    typeOfAppointment?: string;
    staffNotes?: string;
    physicianNotes?: string;
    apptNotes?: string;
    active?: boolean;
    followUpDate?: Moment;
    physicianDocument?: IFileModel;
    annual_dental? : boolean;
    annual_medical? : boolean;
    appointment: IAppointment

    constructor(appointment: IAppointment) {
        this.active = appointment.active;
        this.annual_dental = appointment.annual_dental;
        this.annual_medical = appointment.annual_medical;
        this.appointmentDate = appointment.appointment_date ? moment(appointment.appointment_date) : undefined;
        this.apptNotes = appointment.appt_notes
        this.client = appointment.client ? new Client(appointment.client) : undefined
        this.contactType = appointment.contact_type;
        this.doctor = appointment.doctor;
        this.id = appointment._id;
        this.physicianNotes = appointment.physician_notes;
        this.staffNotes = appointment.staff_notes;
        this.typeOfAppointment = appointment.type_of_appointment;
        this.physicianDocument = appointment.physician_document ? new File(appointment.physician_document) : undefined
        this.appointment = appointment
      }
}

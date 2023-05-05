import IBaseModel from "./_baseModel";
import moment, { Moment } from "moment";
import { IAddAdp } from "../types";

export default class AddAdp implements IBaseModel {
  id: string;
  client?: string;
  firstName?: string;
  lastName?: string;
  clientsInvolved?: string[];
  employeeInvolved?: string[];
  incidentDate?: Moment;
  incidentTime?: Moment;
  contry?: string;
  notified?:boolean;
  criticalIncident?: boolean;
  criticalIncidentType?: string;
  reportableIncident?: boolean;
  reportableIncidentType?: string;
  nameOfFacility?: string;
  address?: string;
  telephone?: string;
  reportDate?: Moment;
  eventDescription?: string;
  personReport?: string;
  reportedPersonPhone?: string;
  reviewSupervisor?: string;
  reviewSupervisorPhone?: string;
  WaiverSupportCordinator?: string;
  WaiverSupportCordinatorPhone?: string;
  adp: IAddAdp;

  constructor(adp: IAddAdp) {
   
    this.id = adp._id;
    this.firstName = adp.first_name;
    this.lastName = adp.last_name;
    this.client = adp.client;
    this.clientsInvolved = adp.clients_involved;
    this.employeeInvolved = adp.employee_involved;
    this.incidentDate = adp.incident_date ? moment(adp.incident_date) : undefined;
    this.incidentTime = adp.incident_time;
    this.contry = adp.contry;
    this.notified = adp.notified;
    this.criticalIncident = adp.critical_incident;
    this.criticalIncidentType = adp.critical_incident_type;
    this.reportableIncident = adp.reportable_incident;
    this.reportableIncidentType = adp.reportable_incident_type;
    this.nameOfFacility = adp.name_of_facility;
    this.address = adp.address;
    this.telephone = adp.telephone;
    this.reportDate = adp.report_date ? moment(adp.report_date) : undefined;
    this.eventDescription = adp.event_description;
    this.personReport = adp.person_report;
    this.reportedPersonPhone = adp.reported_person_phone;
    this.reviewSupervisor = adp.review_supervisor;
    this.reviewSupervisorPhone = adp.review_supervisor_phone;
    // this.WaiverSupportCordinator = adp.Waiver_support_cordinator;
    // this.WaiverSupportCordinatorPhone = adp.Waiver_support_cordinator_phone;
    this.adp = adp;
  }
}

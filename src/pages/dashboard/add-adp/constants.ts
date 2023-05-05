import * as yup from "yup";

import { FIELDS_TYPE } from "../../../types";

export const CRITICAL_INCIDENTS_OPTIONS = ["Yes", "No"];

export const REPORTABLE_INCIDENTS_OPTIONS = ["Yes", "No"];

export const FIELDS: FIELDS_TYPE = {
  client: {
    name: "Client #",
    default: "",
    validation: yup.string().label("Select Client").required(),
  },
  first_name: {
    name: "First Name #",
    default: "",
    validation: yup.string().label("First Name").required(),
  },
  last_name: {
    name: "Last Name #",
    default: "",
    validation: yup.string().label("Last Name").required(),
  },
  clients_involved: {
    name: "Clients Involved #",
    default: "",
    validation: yup.string().label("Clients Involved").required(),
  },
  employee_involved: {
    name: "Employee Involved #",
    default: "",
    validation: yup.string().label("Employee Involved").required(),
  },
  incident_date: {
    name: "Incident Date #",
    default: "",
    validation: yup.string().label("Incident Date").required(),
  },
  incident_time: {
    name: 'Incident Time #',
    default: null,
    validation: yup.string().label("Incident Time").nullable(),
  },
  contry: {
    name: "Country #",
    default: "",
    validation: yup.string().label("Country").required(),
  },
  notified: {
    name: "Notified #",
    default: "",
    validation: yup.string().label("Notified").required(),
  },
  critical_incident: {
    name: "Critical Incident #",
    default: "",
    validation: yup.string().label("Critical Incident").required(),
  },
  critical_incident_type: {
    name: "Critical Incident Type #",
    default: "",
    validation: yup.string().label("Critical Incident Type").required(),
  },
  reportable_incident: {
    name: "Reportable Incident #",
    default: "",
    validation: yup.string().label("Reportable Incident").required(),
  },
  reportable_incident_type: {
    name: "Reportable Incident Type #",
    default: "",
    validation: yup.string().label("Reportable Incident Type").required(),
  },
  name_of_facility: {
    name: "Name of Facility #",
    default: "",
    validation: yup.string().label("Name of Facility").required(),
  },
  address: {
    name: "Address #",
    default: "",
    validation: yup.string().label("Address").required(),
  },
  telephone: {
    name: "Telephone #",
    default: "",
    validation: yup.string().required(),
  },
  report_date: {
    name: "Report Date #",
    default: "",
    validation: yup.string().label("Report Date").required(),
  },
  event_description: {
    name: "Event Description #",
    default: "",
    validation: yup.string().label("Event Description").required(),
  },
  person_report: {
    name: "Person Report #",
    default: "",
    validation: yup.string().label("Person Report").required(),
  },
  reported_person_phone: {
    name: "Reported Person Phone #",
    default: "",
    validation: yup.string().required(),
  },
  review_supervisor: {
    name: "Review Supervisor #",
    default: "",
    validation: yup.string().label("Review Supervisor").required(),
  },
  review_supervisor_phone: {
    name: "Review Supervisor Phone #",
    default: "",
    validation: yup.string().required(),
  },
  // Waiver_support_cordinator: {
  //   name: "Waiver Support Cordinator #",
  //   default: "",
  //   validation: yup.string().label("Waiver Support Cordinator").required(),
  // },
  // Waiver_support_cordinator_phone: {
  //   name: "Waiver Support Cordinator Phone #",
  //   default: "",
  //   validation: yup.string().required(),
  // },
};

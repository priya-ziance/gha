import * as yup from "yup";
import {MAIN_ACCOUNT_FIELDS_FORM_TYPE } from "../../../types";


export const FIELDS: MAIN_ACCOUNT_FIELDS_FORM_TYPE  = {

  client: {
    name: "Client #",
    default: "",
    validation: yup.string().label("Client").required(),
  },
  statement_name: {
    name: "Statement Name #",
    default: "",
    validation: yup.string().label("Statement Name").required(),
  },
  statement_description: {
    name: "Statement Description #",
    default: "",
    validation: yup.string().label("Statement Description").required(),
  },
  from_date: {
    name: "From Date #",
    default: null,
    validation: yup.string().label("From Date").nullable().required(),
  },
  to_date: {
    name: "To Date #",
    default: null,
    validation: yup.string().label("To Date").nullable().required(),
  },
  document: {
    name: "Document #",
    default: "",
    validation: yup.string().label("Document").required(),
  },
  active: {
    name: "Active #",
    default: "",
    validation: yup.boolean().label("Active").required(),
  },
};

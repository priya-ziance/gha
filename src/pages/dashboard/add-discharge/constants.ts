import * as yup from "yup";
import {DISCHARGE_FIELDS_FORM_TYPE} from "../../../types";


export const FIELDS: DISCHARGE_FIELDS_FORM_TYPE  = {

  client: {
    name: "Client #",
    default: "",
    validation: yup.string().label("Client").email().required(),
  },
  home_discharge_date: {
    name: "Home Discharge Date #",
    default: "",
    validation: yup.string().label("Home Discharge Date").required(),
  },
  organization_name: {
    name: "Organization Name #",
    default: "",
    validation: yup.string().label("Organization Name").required(),
  },
  organization_location: {
    name: "Organization Location #",
    default: "",
    validation: yup.string().label("Organization Location").required(),
  },
  organization_phone: {
    name: "Organization Phone #",
    default: "",
    validation: yup.string().label("Organization Phone").required(),
  },
  organization_main_contact: {
    name: "Organization Main Contact #",
    default: "",
    validation: yup.string().label("Organization Main Contact").required(),
  },
};

import * as yup from "yup";
import { CLIENT_WITNESS_FIELDS_FORM_TYPE } from "../../types";

export const FIELDS: CLIENT_WITNESS_FIELDS_FORM_TYPE = {
  address: {
    name: "Address #",
    default: "",
    validation: yup.string().label("Address").required(),
  },
  contact_type: {
    name: "Contact Type",
    default: "",
    validation: yup.string().label("Contact Type").required(),
  },
  email: {
    name: "Email #",
    default: "",
    validation: yup.string().label("Email").email().required(),
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
  mobile: {
    name: "Mobile #",
    default: "",
    validation: yup.string().label("Mobile").required(),
  },
  hired_date: {
    name: "Hired Date #",
    default: null,
    validation: yup.string().label("Hired Date").nullable().required(),
  },
  location: {
    name: "location #",
    default: "",
    validation: yup.string().label("Location").required(),
  },
};

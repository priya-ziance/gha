import * as yup from "yup";
import {DISCHARGE_FIELDS_FORM_TYPE} from "../../../types";


export const FIELDS: DISCHARGE_FIELDS_FORM_TYPE  = {

  // image: {
  //   name: "Image #",
  //   default: "",
  //   validation: yup.string().label("Image").required(),
  // },
  email: {
    name: "Email #",
    default: "",
    validation: yup.string().label("Email").email().required(),
  },
  // first_name: {
  //   name: "First Name #",
  //   default: "",
  //   validation: yup.string().label("First Name").required(),
  // },
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
  address: {
    name: "Address #",
    default: "",
    validation: yup.string().label("Address").required(),
  },
};

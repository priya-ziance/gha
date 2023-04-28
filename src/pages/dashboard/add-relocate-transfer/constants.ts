import * as yup from "yup";
import {RELOCATE_FIELDS_FORM_TYPE } from "../../../types";


export const FIELDS: RELOCATE_FIELDS_FORM_TYPE  = {
  contact_type: {
    name: "Contact Type #",
    default: "",
    validation: yup.string().label("contact_type").email().required(),
  },
  // first_name: {
  //   name: "First Name #",
  //   default: "",
  //   validation: yup.string().label("First Name").required(),
  // },
  client: {
    name: "client #",
    default: "",
    validation: yup.string().label("client").required(),
  },
  group_home_name: {
    name: "group_home_name #",
    default: "",
    validation: yup.string().label("group_home_name").required(),
  },
  home_transfer_date: {
    name: "home_transfer_date#",
    default: null,
    validation: yup.string().label("home_transfer_date").nullable().required(),
  },
  location: {
    name: "location #",
    default: "",
    validation: yup.string().label("Location").required(),
  },
  phone: {
    name: "phone #",
    default: "",
    validation: yup.string().label("phone").required(),
  },
};

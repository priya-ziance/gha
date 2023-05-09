import * as yup from "yup";
import {COMMUNITY_ACTIVITIES_FIELDS_FORM_TYPE } from "../../../types";


export const FIELDS: COMMUNITY_ACTIVITIES_FIELDS_FORM_TYPE  = {


  place_1: {
    name: "PLace 1 #",
    default: "",
    validation: yup.string().label("Place 1").required(),
  },
  place_2: {
    name: "Place 2 #",
    default: "",
    validation: yup.string().label("Place 2").required(),
  },
  place_3: {
    name: "Place 3 #",
    default: "",
    validation: yup.string().label("Place 3").required(),
  },
  place_4: {
    name: "Place 4 #",
    default: "",
    validation: yup.string().label("Place 4").required(),
  },
  place_5: {
    name: "Place 5 #",
    default: "",
    validation: yup.string().label("Place 5").required(),
  },
  date: {
    name: "Date #",
    default: null,
    validation: yup.string().label("Date").nullable().required(),
  },
  significant_event: {
    name: "Significant Event #",
    default: "",
    validation: yup.string().label("significant event").required(),
  },

  created_at: {
    name: "Created At #",
    default: null,
    validation: yup.string().label("created at").nullable().required(),
  },
  updated_at: {
    name: "Updated At #",
    default: null,
    validation: yup.string().label("updated at").nullable().required(),
  },
  updated_date: {
    name: "Updated Date #",
    default: null,
    validation: yup.string().label("updated date").nullable().required(),
  },
  notes: {
    name: "Notes #",
    default: "",
    validation: yup.string().label("Notes").required(),
  },
  active: {
    name: "Active #",
    default: "",
    validation: yup.string().label("active").required(),
  },
};

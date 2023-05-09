import * as yup from "yup";
import {PERSONAL_FUNDS_FIELDS_FORM_TYPE } from "../../../types";

export const EXPENSE_TYPES = [
  'Credit',
  'Debit',
  'Withdrawal'
];

export const FIELDS: PERSONAL_FUNDS_FIELDS_FORM_TYPE  = {

  // image: {
  //   name: "Image #",
  //   default: "",
  //   validation: yup.string().label("Image").required(),
  // },
  // first_name: {
  //   name: "First Name #",
  //   default: "",
  //   validation: yup.string().label("First Name").required(),
  // },
 
  expense: {
    name: "Expense #",
    default: "",
    validation: yup.string().label("expense").required(),
  },
  expense_date: {
    name: "Expense date #",
    default: null,
    validation: yup.string().label("expense date").nullable().required(),
  },
  location: {
    name: "Location #",
    default: "",
    validation: yup.string().label("Location").required(),
  },
  expense_description: {
    name: "Expense Description #",
    default: "",
    validation: yup.string().label("Expense Description").required(),
  },
  expense_type: {
    name: "Expense Type #",
    default: "",
    validation: yup.string().label("Expense Type").required(),
  },
  // inventory_save: {
  //   name: "Inventory Save #",
  //   default: "",
  //   validation: yup.string().label("Inventory Save").required(),
  // },

};

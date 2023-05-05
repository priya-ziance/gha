import * as yup from "yup";
import { INVENTORY_FIELDS_FORM_TYPE } from "../../../types";

export const FIELDS: INVENTORY_FIELDS_FORM_TYPE = {
 
  item: {
    name: "Item",
    default: "",
    validation: yup.string().label("item").required(),
  },
  quantity: {
    name: "Quantity",
    default: "",
    validation: yup.number().label("quantity").required(),
  },

  description: {
    name: "Description",
    default: "",
    validation: yup.string().label("description").required(),
  },

  purchase_date: {
    name: "Purchase Date ",
    default: null,
    validation: yup.string().label("purchase date").nullable().required(),
  },
  notes: {
    name: "Notes",
    default: "",
    validation: yup.string().label("notes").required(),
  },
};

import * as yup from "yup";
import { SEIZURELOGS_FIELDS_FORM_TYPE} from "../../../types";


export const FIELDS: SEIZURELOGS_FIELDS_FORM_TYPE = {
  time: {
    name: "Time #",
    default: "",
    validation: yup.string().label("time").required(),
  },

  Injuries: {
    name: "Injuries #",
    default: "",
    validation: yup.string().label("Injuries").required(),
  },
  activity_preceding: {
    name: "Activity Preceding #",
    default: "",
    validation: yup.string().label("activity preceding").required(),
  },
  duration: {
    name: "Duration #",
    default: "",
    validation: yup.string().label("duration").required(),
  },
  notes: {
    name: "Notes #",
    default: "",
    validation: yup.string().label("notes").required(),
  },
  date: {
    name: "Date #",
    default: null,
    validation: yup.string().label("Date").nullable().required(),
  },
  active: {
    name: "Active #",
    default: "",
    validation: yup.string().label("Active").required(),
  },
  patient_have_seizure:{
    name: "Does Patient Have Seizure ? #",
    default: "",
    validation: yup.string().label("patient have seizure").required(),
  },
  // emp_id: {
  //   name: "emp id #",
  //   default: "",
  //   validation: yup.string().label("empId").required(),
  // },
};

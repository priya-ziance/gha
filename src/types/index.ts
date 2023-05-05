import { IToasterProps, IToastProps } from "@blueprintjs/core";
import moment, { Moment } from "moment";

export type PAGE_TYPES =
  | "admins"
  | "add-apd"
  | "add-appointment"
  | "add-bank-statement"
  | "add-clients"
  | "add-client-case-notes"
  | "add-client-contact"
  | "add-staff-witness"
  | "add-client-witness"
  | "add-add-trainers"
  | "add-database-behaviour"
  | "add-database-goal"
  | "add-database-subgoal"
  | "add-database-task"
  | "add-expenses-account"
  | "add-expenses-list"
  | "add-location"
  | "add-medication"
  | "add-sp-goals"
  | "add-medical-contact"
  | "add-relocate"
  | "apd"
  | "add-add-inventorys"
  | "recurring-expense"
  | "add-recurring-expense"
  | "edit-recurring-expense"
  | "personal_bank_statement"
  | "add-personal_bank_statement"
  | "edit-personal_bank_statement"
  | "community_activities"
  | "add-community_activities"
  | "edit-community_activities"
  | "personal_funds"
  | "add-personal_funds"
  | "edit-personal_funds"
  | "appointments"
  | "bank-statement"
  | "inventory"
  | "add-inventory"
  | "edit-inventory"
  | "behaviours"
  | "behaviours-problems"
  | "behaviours-assign"
  | "behaviours-database"
  | "dashboard"
  | "clients"
  | "client-case-notes"
  | "client-info"
  | "client-links"
  | "client-contacts"
  | "client-witness"
  | "staff-witness"
  | "trainer"
  | "add-trainer"
  | "discharge"
  | "add-discharge"
  | "edit-discharge"
  | "relocate"
  | "adp"
  | "add-adp"
  | "edit-adp"
  | "edit-appointment"
  | "edit-bank-statement"
  | "edit-case-note"
  | "edit-client-contact"
  | "edit-client-witness"
  | "edit-staff-witness"
  | "edit-trainer"
  | "edit-database-behaviour"
  | "edit-database-goal"
  | "edit-database-subgoal"
  | "edit-database-task"
  | "edit-expense-account"
  | "edit-expenses-list"
  | "edit-location"
  | "edit-medication"
  | "edit-medical-contact"
  | "edit-relocate"
  | "expenses"
  | "expenses-account"
  | "expenses-list"
  | "goals"
  | "goals-data-collection"
  | "goals-database"
  | "goals-database-goals"
  | "goals-database-subgoals"
  | "goals-database-tasks"
  | "life-skills"
  | "life-skills-logs"
  | "life-skills-places-database"
  | "life-skills-notes-database"
  | "locations"
  | "logs"
  | "med-destruction"
  | "medical-contacts"
  | "med-pass"
  | "medication"
  | "medication-list"
  | "personal-support"
  | "personal-support-logs"
  | "personal-support-places-database"
  | "personal-support-notes-database"
  | "seizure-logs"
  | "add-seizure-logs"
  | "edit-seizure-logs"
  | "seizure-logs-logs"
  | "seizure-logs-places-database"
  | "seizure-logs-notes-database"
  | "reshab-logs"
  | "respite-logs"
  | "sp-goals"
  | "edit-sp-goals";

export type APD_FIELDS_TYPE =
  | "client"
  | "first_name"
  | "critical_incident"
  | "county"
  | "incident_date_time"
  | "reportable_incident";

export type APPOINTMENT_FIELDS_TYPE =
  | "appointment_date"
  | "time"
  | "doctor"
  | "contact_type"
  | "type_of_appointment"
  | "staff_notes"
  | "physician_notes"
  | "app_notes"
  | "physician_document"
  | "follow_up_date"
  | "active"
  | "annual_dental"
  | "annual_medical"
  | "reporgram_medication"
  | "labs";

export type BANK_STATEMENT_FIELDS_TYPE =
  | "active"
  | "document"
  | "from_date"
  | "statement_name"
  | "statement_description"
  | "to_date"
  | "type";

export type CASE_NOTE_FIELDS_TYPE =
  | "active"
  | "date"
  | "title"
  | "notes"
  | "significant_event"
  | "significant_event_notes"
  // | "client_name"

export type LOCATION_FIELDS_TYPE =
  | "phoneNumber"
  | "address"
  | "city"
  | "country";

export type CLIENT_CONTACT_FIELDS_TYPE =
  | "active"
  | "address"
  | "company"
  | "contact_type"
  | "date_of_birth"
  | "email"
  | "fax"
  | "first_name"
  | "last_name"
  | "mobile"
  | "notes"
  | "phone"
  | "medical_contact"
  // | "client_name"

export type CLIENT_WITNESS_FIELDS_TYPE =
  | "address"
  | "contact_type"
  | "hired_date"
  | "email"
  | "first_name"
  | "last_name"
  | "mobile"
  | "location";

  export type ADD_INVENTORY_FIELDS_TYPE =
  | "item"
  | "quantity"
  | "description"
  | "notes"
  | "purchase_date"
export type STAFF_WITNESS_FIELDS_TYPE =
  | "address"
  | "trainer_id"
  | "hired_date"
  | "email"
  | "first_name"
  | "last_name"
  | "mobile"
  | "location";

  export type ADD_TRAINERS_FIELDS_TYPE =
  | "address"
  | "hired_date"
  | "email"
  | "first_name"
  | "last_name"
  | "mobile"
  | "location";
  export type PERSONAL_BANK_STATEMENT_FIELDS_TYPE =
  | "address"
  | "hired_date"
  | "email"
  | "first_name"
  | "last_name"
  | "mobile"
  | "location";

  
  export type ADD_DISCHARGE_FIELDS_TYPE =
  | "address"
  | "hired_date"
  | "email"
  | "first_name"
  | "last_name"
  | "mobile"
  | "location";

export type ADD_RELOCATE_FIELDS_TYPE =
  | "id"
  | "home_transfer_date"
  | "client"
  | "group_home_name"
  | "phone"
  | "contact_type"
  | "location";


export type ADD_SEIZURELOGS_FIELDS_TYPE =
  | "date"
  | "time"
  | "Injuries"
  | "activity_preceding"
  | "duration"
  | "notes"
  | "active"
  | "patient_have_seizure"
  | "emp_id"

export type CLIENT_FIELDS_TYPE =
  | "email"
  | "first_name"
  | "middle_name"
  | "last_name"
  | "date_of_birth"
  | "sex"
  | "address_line_1"
  | "address_line_2"
  | "city"
  | "state"
  | "current_month_weight"
  | "monthly_ssi_amount"
  | "special_equipments"
  | "bank_account_name"
  | "bank_routing_number"
  | "bank_account_number"
  | "funds_method"
  | "zip_code"
  | "phone"
  | "mobile"
  | "ssn"
  | "florida_id"
  | "medicaid"
  | "medicare"
  | "medicaid_waiver"
  | "height"
  | "eye_color"
  | "hair_color"
  | "legal_status"
  | "language"
  | "primary_diagnosis"
  | "secondary_diagnosis"
  | "allergies"
  | "vision"
  | "hearing"
  | "location"
  | "health_insurance"
  | "effective_date"
  | "client_support_plan_starting_month"
  | "funds_method"
  | "special_equipments"
  | "race"
  | "home_entry_date"
  | "home_discharge_date"
  | "religion"
  | "mobility"
  | "behaviours"
  | "likes"
  | "dislikes"
  | "active"
  | "definition_of_abuse"
  | "notes";

export type ACCOUNT_EXPENSE_FIELDS_TYPE =
  | "active"
  | "community_activity_save"
  | "document"
  | "expense"
  | "expense_date"
  | "expense_description"
  | "expense_type"
  | "inventory_save"
  | "location"
  | "type";

export type BEHAVIOUR_FIELDS_TYPE =
  | "active"
  | "description"
  | "behaviour_type"
  | "behaviour_description";

export type GOAL_FIELDS_TYPE = "active" | "description";

export type SUBGOAL_FIELDS_TYPE = "active" | "description" | "goal";

export type TASK_FIELDS_TYPE = "active" | "description" | "goal" | "sub_goal";

export type INSTRUCTION_FIELDS_TYPE = "active" | "description" | "task";

export type PLACES_FIELDS_TYPE = "active" | "description";

export type BEHAVIOUR_PROBLEMS_FIELDS_TYPE = "notes" | "uri" | "frequency" ;

export type SP_GOALS_FIELDS_TYPE =
  | "active"
  | "description"
  | "end_date"
  | "entries"
  | "notes"
  | "start_date"
  | "sub_goals"
  | "client_name"

export type MEDICATION_FIELDS_TYPE =
  | "control_meds"
  | "directions"
  | "doctor"
  | "dosage"
  | "medication"
  | "medication_reason"
  | "notes"
  | "off_cycyle_meds"
  | "prn_med"
  | "quantity"
  | "refills"
  | "route_name"
  | "script_date"
  | "start_date"
  | "side_effect"
  | "status"
  | "taken_days"
  | "temp_med"
  | "med_time"
  | "type"
  | "drug_link";

export type EXPENSES_LIST_FIELDS_TYPE =
  | "expense_description"
  | "expense_type"
  | "expense"
  | "active"
  | "type";

  export type RECURRING_EXPENSES_FIELDS_TYPE =
  | "expense_description"
  | "expense_type"
  | "active"


export type DeviceType = "sm" | "xs" | "md" | "lg";

export type JOINED_FIELDS_TYPE =
  | APD_FIELDS_TYPE
  | CLIENT_CONTACT_FIELDS_TYPE
  | CLIENT_FIELDS_TYPE
  | CASE_NOTE_FIELDS_TYPE
  | SP_GOALS_FIELDS_TYPE
  | GOAL_FIELDS_TYPE
  | SUBGOAL_FIELDS_TYPE
  | JOINED_FIELDS_TYPE_ADP;

  export type JOINED_FIELDS_TYPE_ADP =
  | "client"
  | "first_name"
  | "last_name"
  | "clients_involved"
  | "employee_involved"
  | "incident_date"
  | "incident_time"
  | "contry"
  | "notified"
  | "critical_incident"
  | "critical_incident_type"
  | "reportable_incident"
  | "reportable_incident_type"
  | "name_of_facility"
  | "address"
  | "telephone"
  | "report_date"
  | "event_description"
  | "person_report"
  | "reported_person_phone"
  | "review_supervisor"
  | "review_supervisor_phone"
  // | "waiver_support_cordinator"
  // | "waiver_support_cordinator_phone";

export type FIELDS_TYPE = {
  [key in JOINED_FIELDS_TYPE]?: {
    name: string;
    default: string | null | boolean;
    validation: any;
  };
};

export type ACCOUNT_EXPENSE_FIELDS_FORM_TYPE = {
  [key in ACCOUNT_EXPENSE_FIELDS_TYPE]?: {
    name: string;
    default: string | null | boolean | number;
    validation: any;
  };
};

export type APPOINTMENT_FIELDS_FORM_TYPE = {
  [key in APPOINTMENT_FIELDS_TYPE]?: {
    name: string;
    default: string | null | boolean | number;
    validation: any;
  };
};

export type BANK_STATEMENT_FIELDS_FORM_TYPE = {
  [key in BANK_STATEMENT_FIELDS_TYPE]?: {
    name: string;
    default: string | null | boolean | number;
    validation: any;
  };
};

export type BEHAVIOUR_FIELDS_FORM_TYPE = {
  [key in BEHAVIOUR_FIELDS_TYPE]?: {
    name: string;
    default: string | null | boolean;
    validation: any;
  };
};

export type CASE_NOTE_FIELDS_FORM_TYPE = {
  [key in CASE_NOTE_FIELDS_TYPE]?: {
    name: string;
    default: string | null | boolean;
    validation: any;
  };
};

export type LOCATION_FIELDS_FORM_TYPE = {
  [key in LOCATION_FIELDS_TYPE]?: {
    name: string;
    default: string | null | boolean;
    validation: any;
  };
};

export type EXPENSES_LIST_FIELDS_FORM_TYPE = {
  [key in EXPENSES_LIST_FIELDS_TYPE]?: {
    name: string;
    default: string | null | boolean;
    validation: any;
  };
};

export type SUBGOAL_FIELDS_FORM_TYPE = {
  [key in SUBGOAL_FIELDS_TYPE]?: {
    name: string;
    default: string | null | boolean;
    validation: any;
  };
};

export type TASK_FIELDS_FORM_TYPE = {
  [key in TASK_FIELDS_TYPE]?: {
    name: string;
    default: string | null | boolean;
    validation: any;
  };
};

export type INSTRUCTION_FIELDS_FORM_TYPE = {
  [key in INSTRUCTION_FIELDS_TYPE]?: {
    name: string;
    default: string | null | boolean;
    validation: any;
  };
};

export type PLACES_FIELDS_FORM_TYPE = {
  [key in PLACES_FIELDS_TYPE]?: {
    name: string;
    default: string | null | boolean;
    validation: any;
  };
};

export type BEHAVIOUR_PROBLEMS_FIELDS_FORM_TYPE = {
  [key in BEHAVIOUR_PROBLEMS_FIELDS_TYPE]?: {
    name: string;
    default: string | null | boolean;
    validation: any;
  };
};

export type GOAL_FIELDS_FORM_TYPE = {
  [key in GOAL_FIELDS_TYPE]?: {
    name: string;
    default: string | null | boolean;
    validation: any;
  };
};

export type CLIENT_WITNESS_FIELDS_FORM_TYPE = {
  [key in CLIENT_WITNESS_FIELDS_TYPE]?: {
    name: string;
    default: any;
    validation: any;
  };
};
export type INVENTORY_FIELDS_FORM_TYPE = {
  [key in ADD_INVENTORY_FIELDS_TYPE]?: {
    name: string;
    default: any;
    validation: any;
  };
};

export type STAFF_WITNESS_FIELDS_FORM_TYPE = {
  [key in STAFF_WITNESS_FIELDS_TYPE]?: {
    name: string;
    default: any;
    validation: any;
  };
};
export type TRAINER_FIELDS_FORM_TYPE = {
  [key in ADD_TRAINERS_FIELDS_TYPE]?: {
    name: string;
    default: any;
    validation: any;
  };
};
export type PERSONAL_BANK_STATEMENT_FIELDS_FORM_TYPE = {
  [key in PERSONAL_BANK_STATEMENT_FIELDS_TYPE]?: {
    name: string;
    default: any;
    validation: any;
  };
};
export type DISCHARGE_FIELDS_FORM_TYPE = {
  [key in ADD_DISCHARGE_FIELDS_TYPE]?: {
    name: string;
    default: any;
    validation: any;
  };
};
export type RELOCATE_FIELDS_FORM_TYPE = {
  [key in ADD_RELOCATE_FIELDS_TYPE]?: {
    name: string;
    default: any;
    validation: any;
  };
};
export type SEIZURELOGS_FIELDS_FORM_TYPE = {
  [key in ADD_SEIZURELOGS_FIELDS_TYPE]?: {
    name: string;
    default: any;
    validation: any;
  };
};

export type CLIENT_CONTACT_FIELDS_FORM_TYPE = {
  [key in CLIENT_CONTACT_FIELDS_TYPE]?: {
    name: string;
    default: string | null | boolean;
    validation: any;
  };
};

export type MEDICATION_FIELDS_FORM_TYPE = {
  [key in MEDICATION_FIELDS_TYPE]?: {
    name: string;
    default: string | null | boolean | string[];
    validation: any;
  };
};

export interface IDimensionsContext {
  deviceType: DeviceType;
}

export interface IClientContext {
  client?: IClient;
  id: string;
  loading?: boolean;
  name: string;
  onSetClient?: (client: IClientModel) => void;
  setLoadingClient?: (loading: boolean) => void;
}

export interface ILocationContext {
  address?: string;
  id?: string;
  setLocation?: (locationId: string) => void;
  loading?: boolean;
  location?: ILocationModel;
  locations?: ILocationModel[];
}

export interface IToastsContext {
  addToast: (toast: IToastProps, toaster?: IToasterProps) => string;
  removeToast?: (toastId: string) => void;
}

/**
 * App Models
 */

export interface IAppointmentModel {
  id: string;
  appointmentDate?: Moment;
  client?: IClientModel;
  time?: Moment;
  doctor?: string;
  contactType?: string;
  typeOfAppointment?: string;
  staffNotes?: string;
  physicianNotes?: string;
  appNotes?: string;
  active?: boolean;
  annualDental?: boolean;
  annualMedical?: boolean;
  physicianDocument?: IFileModel;
  followUpDate?: Moment;
  appointment: IAppointment;
}

export interface IBankStatementModel {
  id: string;
  statementName: string;
  statementDescription: string;
  fromDate: Moment;
  toDate: Moment;
  type: string;
  document?: IFileModel;
  active: boolean;
  bankStatement: IBankStatement;
  createdAt: Moment;
}

export interface IBehaviourModel {
  id: string;
  active: boolean;
  behaviourDescription: string;
  behaviourType: string;
  behaviour: IBehaviour;
  createdAt: Moment;
}

export interface IClientBehaviourModel {
  id?: string;
  behaviour?: IBehaviourModel;
  frequency?: number;
  uri?: string;
  logdate?: string;
  clientsInvolved?: IClientModel[];
  clientBehaviour?: IClientBehaviour;
  notes?: string;
  createdAt?: Moment;
}
export interface IAddInventory {
  _id: string;
  notes?: string;
  item?: string;
  quantity?: number;
  description?: string;
  purchase_date?: string;
}
export interface IAddInventoryModel {
  id?: string;
  notes?: string;
  item?: string;
  quantity?: number;
  description?: string;
  purchase_date?: string;
  inventory?: IAddInventory;
}
export interface IClientModel {
  id: string;
  name: string;
  client: IClient;
  firstName: string;
  lastName: string;
  address?: string;
  floridaId?: IFileModel;
  healthInsurance?: IFileModel;
  profilePicture?: IFileModel;
  signature?: IFileModel;
  services: object;
  witnesses?: IUserModel[];
  trainers?: IUserModel[];
}

export interface ICaseNoteModel {
  active?: boolean;
  id: string;
  date?: Moment;
  notes?: string;
  significantEvent?: boolean;
  significantEventNotes?: string;
  title?: string;
  caseNote: ICaseNote;
}

export interface IClientContactModel {
  active?: boolean;
  address?: string;
  company?: string;
  contactType?: string;
  dateOfBirth?: Moment;
  firstName?: string;
  id: string;
  lastName?: string;
  name?: string;
  phone?: string;
  medicalContact?: boolean;
  mobile?: string;
  fax?: string;
  email?: string;
  notes?: string;
  client?: string;
  clientContact: IClientContact;
}

export interface IExpenseModel {
  id: string;
  expenseDate: Moment;
  expenseDescription: string;
  expenseType: string;
  expense: number;
  location?: string;
  employee?: IClientModel;
  type: string;
  document?: IFileModel;
  active: boolean;
  inventorySave: boolean;
  communityActivitySave: boolean;
  apiExpense: IExpense;
  createdAt: Moment;
}

export interface IExpenseListModel {
  id: string;
  client: IClientModel;
  expenseDescription: string;
  expenseType: string;
  expense: number;
  active: boolean;
  type: string;
  createdAt: Moment;
  expenseList: IExpenseList;
}


export interface IRecurringExpenseModel {
  id: string;
  client: IClientModel;
  expenseDescription: string;
  expenseType: string;
  expense: number;
  active: boolean;
  type: string;
  createdAt: Moment;
  recurringExpense: IRecurringExpense;
}
export interface IFileModel {
  createdAt?: string;
  id: string;
  file: IFile;
  publicUrl?: string;
  url?: string;
  key?: string;
  loadFile: () => Promise<void>;
  updatedAt?: string;
}

export interface IGoalModel {
  id: string;
  active: boolean;
  createdAt: Moment;
  description: string;
  goal: IGoal;
}

export interface ILogTemplateModel {
  id: string;
  type: string;
  questions: ILogTemplateQuestionModel[];
  logNotes: string;
  logTemplate: ILogTemplate;
}

export interface IMedicationModel {
  id: string;
  client: string;
  medication?: string;
  routeName?: string;
  type?: string;
  dosage?: string;
  directions?: string;
  medTime?: string[];
  picture?: IFileModel;
  createdAt?: Moment;
  quantity?: number;
  notes?: string;
  medicationReason?: string;
  script?: IFileModel;
  prnMed?: boolean;
  tempMed?: boolean;
  takenDays?: string;
  status?: string;
  refills?: number;
  doctor?: string;
  scriptDate?: Moment;
  startDate?: Moment;
  apiMedication: IMedication;
}

export interface ISubGoalModel {
  id: string;
  active: boolean;
  createdAt: Moment;
  description: string;
  goal: IGoalModel;
  subGoal: ISubGoal;
}

export interface ISpGoalModel {
  id: string;
  active: boolean;
  client?: string;
  createdAt: Moment;
  notes: string;
  endDate?: Moment;
  startDate?: Moment;
  spGoal: ISpGoal;
  goal: IGoalModel;
  subGoals: ISubGoalModel[];
}

export interface ILocationModel {
  address: string;
  id: string;
  city?: string;
  country?: string;
  coordinates?: [number, number];
  phoneNumber?: string;
  createdAt?: string;
  updatedAt?: string;
  location: ILocation;
}

export interface ILogModel {
  id: string;
  questions: ILogQuestionModel[];
  client: IClientModel;
  type: string;
  log: ILog;
  createdAt: Moment;
}

export interface IInstructionModel {
  id: string;
  description: string;
  active: boolean;
  instruction: IInstruction;
  task?: ITaskModel;
  createdAt: Moment;
}

export interface INotesDatabaseModel {
  id: string;
  description: string;
  active: boolean;
  noteDatabase: INotesDatabase;
  createdAt: Moment;
}

export interface IPlaceDatabaseModel {
  id: string;
  description: string;
  active: boolean;
  placeDatabase: IPlaceDatabase;
  createdAt: Moment;
}
export interface IDeleteModel {
  id: string;
  description: string;
  active: boolean;
  placeDatabase: IPlaceDatabase;
  createdAt: Moment;
}

export interface ITaskModel {
  instructions: IInstructionModel[];
  id: string;
  description: string;
  active: boolean;
  goal: IGoalModel;
  subGoal?: ISubGoalModel;
  task: ITask;
  createdAt: Moment;
}

export interface IUserModel {
  id: string;
  email: string;
  name: string;
  type: string;
  createdAt: Moment;
  user: IUser;
}

export interface IQuestionModel {
  id: string;
  questionValue: string;
  type: string;
  selectedAnswers: string[];
  answers: string[];
  question: IQuestion;
}

export interface ILogTemplateQuestionModel {
  questionId: IQuestionModel;
  selectedAnswer: string;
  logTemplateQuestion: ILogTemplateQuestion;
}

export interface ILogQuestionModel {
  questionId: IQuestionModel;
  selectedAnswer: string;
  logQuestion: ILogQuestion;
}

export interface IBehaviourAssignmentModel {
  id: string;
  behaviours: IBehaviourModel[];
  behaviourAssignment: IBehaviourAssignment;
}

/**
 * API Models
 */

export interface IAppointment {
  _id: string;
  appointment_date?: Moment;
  client?: IClient;
  time?: Moment;
  doctor?: string;
  contact_type?: string;
  type_of_appointment?: string;
  staff_notes?: string;
  physician_notes?: string;
  app_notes?: string;
  active?: boolean;
  physician_document?: IFile;
  annual_dental?: boolean;
  annual_medical?: boolean;
  follow_up_date?: string;
}

export interface IBankStatement {
  _id: string;
  statement_name: string;
  statement_description: string;
  from_date: string;
  to_date: string;
  type: string;
  document?: IFile;
  active: true;
  created_at: string;
}

export interface IBehaviour {
  _id: string;
  active: boolean;
  behaviour_description: string;
  behaviour_type: string;
  created_at?: string;
}

export interface IClientBehaviour {
  _id: string;
  behaviour: IBehaviour;
  frequency?: number;
  uri: string;
  clients_involved?: IClient[];
  notes: string;
  created_at: string;
}

export interface ICaseNote {
  _id: string;
  date?: string;
  client?: string;
  title?: string;
  notes?: string;
  significant_event_notes?: string;
  significant_event?: false;
  active?: false;
}

export interface IClientWithness {
  _id: string;
  email?: string;
  contact_type?: string;
  first_name?: string;
  last_name?: string;
  address?: string;
  mobile?: string;
  location?: string;
  hired_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface IClientWithnessModel {
  id: string;
  email?: string;
  contactType?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  mobile?: string;
  location?: string;
  hiredDate?: Moment;
  clientWitness: IClientWithness;
}

export interface IStaffWithness {
  _id: string;
  emp_id?: string;
  image?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  address?: string;
  mobile?: string;
  location?: string;
  hired_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface IStaffWithnessModel {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  mobile?: string;
  location?: string;
  hiredDate?: Moment;
  staffWitness?: IStaffWithness;
}

export interface ISeizurelogs {
  _id?: string;
  date?: Moment;
  notes?: string;
  time?: string;
  Injuries?: string;
  activity_preceding?: string;
  duration?: string;
  active?: boolean;
  patient_have_seizure?: string;
}

export interface ISeizureLogsModel {
  _id?: string;
  date?: Moment;
  notes?: string;
  time?: string;
  Injuries?: string;
  activity_preceding?: string;
  duration?: string;
  active?: boolean;
  patient_have_seizure?: string;
  seizurelogs?: ISeizurelogs;
}

export interface IAddTrainerModel {
  image?: string;
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  mobile?: string;
  location?: string;
  hiredDate?: Moment;
  trainer?: IAddTrainer;
}
export interface IAddTrainer {
  _id: string;
  emp_id?: string;
  image?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  address?: string;
  mobile?: string;
  location?: string;
  hired_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ICommunityActivitiesModel {
  image?: string;
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  mobile?: string;
  location?: string;
  hiredDate?: Moment;
  communityActivities?: ICommunityActivities;
}
export interface ICommunityActivities {
  _id: string;
  emp_id?: string;
  image?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  address?: string;
  mobile?: string;
  location?: string;
  hired_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface IPersonalBankStatementModel {
  image?: string;
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  mobile?: string;
  location?: string;
  hiredDate?: Moment;
  PersonalBankStatement?: IPersonalBankStatement;
}
export interface IPersonalBankStatement {
  _id: string;
  emp_id?: string;
  image?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  address?: string;
  mobile?: string;
  location?: string;
  hired_date?: string;
  created_at?: string;
  updated_at?: string;
}
export interface IPersonalFundsModel {
  image?: string;
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  mobile?: string;
  location?: string;
  hiredDate?: Moment;
  personalFunds?: IPersonalFunds;
}
export interface IPersonalFunds {
  _id: string;
  emp_id?: string;
  image?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  address?: string;
  mobile?: string;
  location?: string;
  hired_date?: string;
  created_at?: string;
  updated_at?: string;
}
export interface IDischarge {
  _id: string;
  emp_id?: string;
  image?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  address?: string;
  mobile?: string;
  location?: string;
  hired_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface IDischargeModel {
  image?: string;
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  address?: string;
  mobile?: string;
  location?: string;
  hiredDate?: Moment;
  trainer?: IAddTrainer;
}
export interface IRelocate {
  _id?: string;
  home_transfer_date?: Moment;
  client?: string;
  group_home_name?: string;
  location?: string;
  phone?: string;
  contact_type?:string;
  relocate?: IRelocate;
}

export interface IRelocateModel {
  id?:string,
  home_transfer_date?: Moment;
  client?: string;
  group_home_name?: string;
  location?: string;
  phone?: string;
  contact_type?:string;
  relocate?: IRelocate;
}
export interface IAddAdp {
  _id: string;
  client?: string;
  first_name?: string;
  last_name?: string;
  clients_involved?: string[];
  employee_involved?: string[];
  incident_date?: Moment;
  incident_time?: Moment;
  contry?: string;
  notified?: boolean;
  critical_incident?: boolean;
  critical_incident_type?: string;
  reportable_incident?: boolean;
  reportable_incident_type?: string;
  name_of_facility?: string;
  address?: string;
  telephone?: string;
  report_date?: Moment;
  event_description?: string;
  person_report?: string;
  reported_person_phone?: string;
  review_supervisor?: string;
  review_supervisor_phone?: string;
  waiver_support_cordinator?: string;
  waiver_support_cordinator_phone?: string;
  created_at?: string;
  updated_at?: string;
}

export interface IAddAdpModel {
  id?: string;
  client?: string;
  firstName?: string;
  lastName?: string;
  clientsInvolved?: string[];
  employeeInvolved?: string[];
  incidentDate?: Moment;
  incidentTime?: Moment;
  contry?: string;
  notified?: boolean;
  criticalIncident?: boolean;
  criticalIncidentType?: string;
  reportableIncident?: boolean;
  reportableIncidentType?: string;
  nameOfFacility?: string;
  address?: string;
  telephone?: string;
  reportDate?: Moment;
  eventDescription?: string;
  personReport?: string;
  reportedPersonPhone?: string;
  reviewSupervisor?: string;
  reviewSupervisorPhone?: string;
  waiverSupportCordinator?: string;
  waiverSupportCordinatorPhone?: string;
  adp?: IAddAdp;
}
export interface IClientContact {
  _id: string;
  client?: string;
  creator?: string;
  loc?: {};
  contact_type?: string;
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  address?: string;
  phone?: string;
  mobile?: string;
  fax?: string;
  email?: string;
  company?: string;
  medical_contact?: boolean;
  notes?: string;
  active?: true;
  created_at?: string;
  updated_at?: string;
}

export interface IClient {
  _id: string;
  email: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  date_of_birth: string;
  sex?: string;
  address_line_1?: string;
  address_line_2?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  phone?: string;
  mobile?: string;
  ssn?: string;
  florida_id?: IFile;
  medicaid?: string;
  medicare?: string;
  medicaid_waiver?: string;
  height?: string;
  eye_color?: string;
  hair_color?: string;
  legal_status?: string;
  language?: string;
  primary_diagnosis?: string;
  secondary_diagnosis?: string;
  allergies?: string;
  vision?: string;
  hearing?: string;
  location?: ILocation;
  health_insurance?: IFile;
  effective_date?: string;
  client_support_plan_starting_month?: string;
  bank_account_number?: string
  current_month_weight?: string
  bank_account_name?: string
  bank_routing_number?: string
  funds_method?: string;
  special_equipments?: string;
  race?: string;
  home_entry_date?: string;
  home_discharge_date?: string;
  religion?: string;
  mobility?: string;
  behaviours?: string;
  likes?: string;
  dislikes?: string;
  active?: boolean;
  definition_of_abuse?: string;
  notes?: string;
  creator?: string;
  profile_picture?: IFile;
  signature?: IFile;
  services: object;
  trainers?: IUser[];
  witnesses?: IUser[];
}

export interface IExpense {
  _id: string;
  expense_date: string;
  expense_description: string;
  expense_type: string;
  expense: number;
  location: string;
  employee: IClient;
  type: string;
  document?: IFile;
  active: boolean;
  inventory_save: boolean;
  community_activity_save: boolean;
  created_at: string;
}

export interface IExpenseList {
  _id: string;
  client: IClient;
  expense_description: string;
  expense_type: string;
  expense: number;
  active: boolean;
  type: string;
  created_at: string;
}

export interface IRecurringExpense {
  _id: string;
  client: IClient;
  expense_description: string;
  expense_type: string;
  expense: number;
  active: boolean;
  type: string;
  created_at: string;
}
export interface IFile {
  _id: string;
  client?: string;
  creator?: string;
  key?: string;
  url?: string;
  type?: string;
  created_at?: string;
  updated_at?: string;
}

export interface IGoal {
  _id: string;
  created_at: Moment;
  description: string;
  active: false;
}

export interface ILogTemplate {
  _id: string;
  template_type: string;
  log_notes: string;
  selected_answer: string;
  questions: ILogTemplateQuestion[];
  created_at: string;
}

export interface IMedication {
  _id: string;
  client: string;
  creator: string;
  medication?: string;
  route_name?: string;
  type?: string;
  dosage?: string;
  directions?: string;
  med_time?: string[];
  picture?: IFile;
  created_at?: string;
  quantity?: number;
  notes?: string;
  medication_reason?: string;
  script?: IFile;
  prn_med?: boolean;
  temp_med?: boolean;
  taken_days?: string;
  status?: string;
  refills?: number;
  doctor?: string;
  drug_link?: string;
  script_date?: string;
  start_date?: string;
}

export interface ISubGoal {
  _id: string;
  created_at: Moment;
  description: string;
  goal: IGoal;
  active: false;
}

export interface ISpGoal {
  _id: string;
  active: boolean;
  end_date?: string;
  goal: IGoal;
  start_date?: string;
  notes: string;
  sub_goals: ISubGoal[];
  created_at: string;
}

export interface ILocation {
  _id: string;
  address: string;
  phoneNumber?: string;
  city?: string;
  country?: string;
  loc?: {
    coordinates?: [number, number];
  };
  created_at?: string;
  updated_at?: string;
}

export interface ITask {
  instructions: IInstruction[];
  _id: string;
  description: string;
  active: boolean;
  goal: IGoal;
  sub_goal: ISubGoal;
  created_at: string;
}

export interface IInstruction {
  _id: string;
  active: boolean;
  description: string;
  task?: ITask;
  created_at: string;
  updated_at?: string;
}

export interface ILog {
  _id: string;
  questions: ILogQuestion[];
  client: IClient;
  type: string;
  created_at: string;
}

export interface INotesDatabase {
  _id: string;
  active: boolean;
  description: string;
  created_at: string;
}

export interface IPlaceDatabase {
  _id: string;
  active: boolean;
  description: string;
  created_at: string;
}

export interface IUser {
  _id: string;
  email: string;
  name: string;
  type: string;
  created_at: string;
}

export interface IQuestion {
  _id: string;
  selected_answers: string[];
  question_value: string;
  type: string;
  answers: string[];
}

export interface ILogTemplateQuestion {
  question_id: IQuestion;
  selected_answer: string;
}

export interface ILogQuestion {
  question_id: IQuestion;
  selected_answer: string;
}

export interface IBehaviourAssignment {
  id: string;
  behaviours: IBehaviour[];
}

/**
 * Permissions
 */

export type PermissionsModuleType = "case_notes" | "client_contacts" | "info";

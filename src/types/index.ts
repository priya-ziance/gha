import { IToasterProps, IToastProps } from '@blueprintjs/core';
import { Moment } from 'moment';

export type PAGE_TYPES =
  'add-apd' |
  'add-appointment' |
  'add-bank-statement' |
  'add-clients' |
  'add-client-case-notes' |
  'add-client-contact' |
  'add-database-behaviour' |
  'add-database-goal' |
  'add-database-subgoal' |
  'add-database-task' |
  'add-expenses-account' |
  'add-expenses-list' |
  'add-medication' |
  'add-sp-goals' |
  'apd' |
  'appointments' |
  'bank-statement' |
  'behaviours' |
  'behaviours-problems' |
  'behaviours-assign' |
  'behaviours-database' |
  'dashboard' |
  'clients' |
  'client-case-notes' |
  'client-info' |
  'client-links' |
  'client-contacts' |
  'edit-bank-statement' |
  'edit-database-behaviour' |
  'edit-database-goal' |
  'edit-database-subgoal' |
  'edit-database-task' |
  'edit-expense-account' |
  'edit-expenses-list' |
  'expenses' |
  'expenses-account' |
  'expenses-list' |
  'goals' |
  'goals-data-collection' |
  'goals-database' |
  'goals-database-goals' |
  'goals-database-subgoals' |
  'goals-database-tasks' |
  'life-skills' |
  'logs' |
  'med-destruction' |
  'med-pass' |
  'medication' |
  'medication-list' |
  'personal-support' |
  'reshab-logs' |
  'respite-logs' |
  'sp-goals';


export type APD_FIELDS_TYPE =
  'critical_incident' |
  'county' |
  'incident_date_time' |
  'reportable_incident'


export type APPOINTMENT_FIELDS_TYPE = 
  'client_name' |
  'appointment_date' |
  'time' |
  'doctor' |
  'contact_type' |
  'type_of_appointment' |
  'staff_notes' |
  'physicain_notes' |
  'appt_notes' |
  'physician_documents' |
  'follow_up_date' |
  'active' |
  'annual_dental' |
  'annual_medical' |
  'reporgram_medication' |
  'labs'


export type BANK_STATEMENT_FIELDS_TYPE =
  'active' |
  'document' |
  'from_date' |
  'statement_name' |
  'statement_description' |
  'to_date' |
  'type'

export type CASE_NOTE_FIELDS_TYPE =
  'active' |
  'date' |
  'title' |
  'notes' |
  'significant_event' |
  'significant_event_notes'

export type CLIENT_CONTACT_FIELDS_TYPE = 
  'active' |
  'address' |
  'company' |
  'contact_type' |
  'date_of_birth' |
  'email' |
  'fax' |
  'first_name' |
  'last_name' |
  'mobile' |
  'notes' |
  'phone'


export type CLIENT_FIELDS_TYPE = 
  'email' |
  'first_name' |
  'middle_name' |
  'last_name' |
  'date_of_birth' |
  'sex' |
  'address_line_1' |
  'address_line_2' |
  'city' |
  'state' |
  'zip_code' |
  'phone' |
  'mobile' |
  'ssn' |
  'florida_id' |
  'medicaid' |
  'medicare' |
  'medicaid_waiver' |
  'current_month_weight' |
  'height' |
  'eye_color' |
  'hair_color' |
  'legal_status' |
  'language' |
  'primary_diagnosis' |
  'secondary_diagnosis' |
  'allergies' |
  'location' |
  'health_insurance' |
  'effective_date' |
  'monthly_ssi_amount' |
  'funds_method' |
  'special_equipments' |
  'bank_account_name' |
  'bank_account_number' |
  'race' |
  'home_entry_date' |
  'home_discharge_date' |
  'religion' |
  'vision' |
  'hearing' |
  'mobility' |
  'behaviours' |
  'likes' |
  'dislikes' |
  'active' |
  'definition_of_abuse' |
  'notes';

export type ACCOUNT_EXPENSE_FIELDS_TYPE =
  'active' |
  'community_activity_save' |
  'document' |
  'expense' |
  'expense_date' |
  'expense_description' |
  'expense_type' |
  'inventory_save' |
  'location' |
  'type';

export type BEHAVIOUR_FIELDS_TYPE =
  'active' |
  'description' |
  'behaviour_type' |
  'behaviour_description'

export type GOAL_FIELDS_TYPE =
  'active' |
  'description'

export type SUBGOAL_FIELDS_TYPE =
  'active' |
  'description' |
  'goal'

export type TASK_FIELDS_TYPE =
  'active' |
  'description' |
  'goal' |
  'sub_goal'

export type INSTRUCTION_FIELDS_TYPE =
  'active' |
  'description' |
  'task'

  export type BEHAVIOUR_PROBLEMS_FIELDS_TYPE =
  'notes' |
  'uri' |
  'frequency'

export type SP_GOALS_FIELDS_TYPE =
  'active' |
  'description' |
  'end_date' |
  'entries' |
  'notes' |
  'start_date' |
  'sub_goals'


export type MEDICATION_FIELDS_TYPE = 
  'control_meds' |
  'directions' |
  'doctor' |
  'dosage' |
  'medication' |
  'medication_reason' |
  'notes' |
  'off_cycyle_meds' |
  'prn_meds' |
  'quantity' |
  'refills' |
  'route' |
  'script_date' |
  'side_effect' |
  'status' |
  'taken_days' |
  'temp_meds' |
  'time' |
  'type' 

export type EXPENSES_LIST_FIELDS_TYPE =
  'expense_description' |
  'expense_type' |
  'expense' |
  'active' |
  'type'


export type DeviceType = 'sm' | 'xs' | 'md' | 'lg'

export type JOINED_FIELDS_TYPE = APD_FIELDS_TYPE |
  CLIENT_CONTACT_FIELDS_TYPE |
  CLIENT_FIELDS_TYPE |
  CASE_NOTE_FIELDS_TYPE |
  SP_GOALS_FIELDS_TYPE |
  GOAL_FIELDS_TYPE |
  SUBGOAL_FIELDS_TYPE;

export type FIELDS_TYPE = {
  [key in JOINED_FIELDS_TYPE]?: {
    name: string,
    default: string | null | boolean,
    validation: any
  }
}

export type ACCOUNT_EXPENSE_FIELDS_FORM_TYPE = {
  [key in ACCOUNT_EXPENSE_FIELDS_TYPE]?: {
    name: string,
    default: string | null | boolean | number,
    validation: any
  }
}

export type APPOINTMENT_FIELDS_FORM_TYPE = {
  [key in APPOINTMENT_FIELDS_TYPE]?: {
    name: string,
    default: string | null | boolean | number,
    validation: any
  }
}

export type BANK_STATEMENT_FIELDS_FORM_TYPE = {
  [key in BANK_STATEMENT_FIELDS_TYPE]?: {
    name: string,
    default: string | null | boolean | number,
    validation: any
  }
}

export type BEHAVIOUR_FIELDS_FORM_TYPE = {
  [key in BEHAVIOUR_FIELDS_TYPE]?: {
    name: string,
    default: string | null | boolean,
    validation: any
  }
}

export type CASE_NOTE_FIELDS_FORM_TYPE = {
  [key in CASE_NOTE_FIELDS_TYPE]?: {
    name: string,
    default: string | null | boolean,
    validation: any
  }
}

export type EXPENSES_LIST_FIELDS_FORM_TYPE = {
  [key in EXPENSES_LIST_FIELDS_TYPE]?: {
    name: string,
    default: string | null | boolean,
    validation: any
  }
}

export type SUBGOAL_FIELDS_FORM_TYPE = {
  [key in SUBGOAL_FIELDS_TYPE]?: {
    name: string,
    default: string | null | boolean,
    validation: any
  }
}

export type TASK_FIELDS_FORM_TYPE = {
  [key in TASK_FIELDS_TYPE]?: {
    name: string,
    default: string | null | boolean,
    validation: any
  }
}

export type INSTRUCTION_FIELDS_FORM_TYPE = {
  [key in INSTRUCTION_FIELDS_TYPE]?: {
    name: string,
    default: string | null | boolean,
    validation: any
  }
}

export type BEHAVIOUR_PROBLEMS_FIELDS_FORM_TYPE = {
  [key in BEHAVIOUR_PROBLEMS_FIELDS_TYPE]?: {
    name: string,
    default: string | null | boolean,
    validation: any
  }
}

export type GOAL_FIELDS_FORM_TYPE = {
  [key in GOAL_FIELDS_TYPE]?: {
    name: string,
    default: string | null | boolean,
    validation: any
  }
}

export type CLIENT_CONTACT_FIELDS_FORM_TYPE = {
  [key in CLIENT_CONTACT_FIELDS_TYPE]?: {
    name: string,
    default: string | null | boolean,
    validation: any
  }
}

export type MEDICATION_FIELDS_FORM_TYPE = {
  [key in MEDICATION_FIELDS_TYPE]? : {
    name: string,
    default: string | null | boolean,
    validation: any
  }
}

export interface IDimensionsContext {
  deviceType: DeviceType
}

export interface IClientContext {
  client?: IClient;
  id: string;
  loading?: boolean;
  name: string;
  onSetClient?: (client: IClientModel) => void;
  setLoadingClient?: (loading: boolean) => void
}

export interface ILocationContext {
  address?: string;
  id?: string;
  setLocation?: (locationId: string) => void
  loading?: boolean;
  locations?: ILocationModel[]
}

export interface IToastsContext {
  addToast: (toast: IToastProps, toaster?: IToasterProps) => string;
  removeToast?: (toastId: string) => void
}



/**
 * App Models
 */

export interface IAppointmentModel {
  id: string;
  clientName: string;
  appointmentDate?: Moment;
  time?: Moment;
  doctor?: string;
  contactType?: string;
  typeOfAppointment?: string;
  staffNotes?: string;
  physicianNotes?: string;
  apptNotes?: string;
  active?: boolean;
  annual_dental? : boolean;
  annual_medical? : boolean;
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
  clientsInvolved?: IClientModel[];
  createdAt: Moment;
}

export interface IClientBehaviourModel {
  id: string;
  behaviour: IBehaviourModel;
  frequency?: number;
  uri: string;
  clientsInvolved?: IClientModel[];
  clientBehaviour: IClientBehaviour;
  notes: string;
  createdAt: Moment;
}

 export interface IClientModel {
  id: string;
  name: string;
  client: IClient;
  profilePicture?: IFileModel;
  signature?: IFileModel;
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
  mobile?: string;
  notes?: string;
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

export interface IFileModel {
  createdAt?: string;
  id: string;
  file: IFile;
  publicUrl?: string;
  url?: string;
  loadFile: () => Promise<void>
  updatedAt?: string;
}

export interface IGoalModel {
  id: string;
  active: boolean;
  createdAt: Moment;
  description: string;
  goal: IGoal;
}

export interface IMedicationModel {
  id: string;
  client: string;
  proprietaryName?: string;
  routeName?: string;
  type?: string;
  dosage?: string;
  directions?: string;
  medTime?: string;
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
  medication: IMedication
}

export interface ISubGoalModel {
  id: string;
  active: boolean;
  createdAt: Moment;
  description: string;
  goal: IGoalModel;
  subGoal: ISubGoal
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
  subGoals: ISubGoalModel[]
}

export interface ILocationModel {
  address: string;
  id: string;
  city?: string;
  country?: string;
  coordinates?: [number, number]
  createdAt?: string;
  updatedAt?: string;
}

export interface IInstructionModel {
  id: string,
  description: string,
  active: boolean,
  instruction: IInstruction,
  task?: ITaskModel,
  createdAt: Moment
}

export interface ITaskModel {
  instructions: IInstructionModel[],
  id: string,
  description: string,
  active: boolean,
  goal: IGoalModel,
  subGoal?: ISubGoalModel,
  task: ITask,
  createdAt: Moment
}


/**
 * API Models
 */

 export interface IAppointment {
  id: string;
  clientName: string;
  appointmentDate?: Moment;
  time?: Moment;
  doctor?: string;
  contactType?: string;
  typeOfAppointment?: string;
  staffNotes?: string;
  physicianNotes?: string;
  apptNotes?: string;
  active?: boolean;
  annual_dental? : boolean;
  annual_medical? : boolean;
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
  clients_involved?: IClient[];
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
  notes?: string;
  active?: true;
  created_at?: string;
  updated_at?: string
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
  florida_id?: string;
  medicaid?: string;
  medicare?: string;
  medicaid_waiver?: string;
  current_month_weight?: string;
  height?: string;
  eye_color?: string;
  hair_color?: string;
  legal_status?: string;
  language?: string;
  primary_diagnosis?: string;
  secondary_diagnosis?: string;
  allergies?: string;
  location?: string;
  health_insurance?: string;
  effective_date?: string;
  monthly_ssi_amount?: string;
  funds_method?: string;
  special_equipments?: string;
  bank_account_name?: string;
  bank_account_number?: string;
  race?: string;
  home_entry_date?: string;
  home_discharge_date?: string;
  religion?: string;
  vision?: string;
  hearing?: string;
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
  client: IClient,
  expense_description: string,
  expense_type: string,
  expense: number,
  active: boolean,
  type: string,
  created_at: string
}

export interface IFile {
  _id: string;
  client?: string;
  creator?: string;
  key?: string;
  url?: string;
  type?: string;
  created_at?: string;
  updated_at?: string
}

export interface IGoal {
  _id: string;
  created_at: Moment;
  description: string; 
  active: false;
}

export interface IMedication {
  _id: string;
  client: string;
  creator: string;
  proprietary_name?: string;
  non_proprietary_name?: string;
  route_name?: string;
  type?: string;
  dosage?: string;
  directions?: string;
  med_time?: string;
  picture?: IFile;
  createdAt?: string;
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
  script_date?: string;
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
  city?: string;
  country?: string;
  loc?: {
    coordinates? :[number, number]
  },
  created_at?: string;
  updated_at?: string;
}

export interface ITask {
  instructions: IInstruction[],
  _id: string,
  description: string,
  active: boolean,
  goal: IGoal,
  sub_goal: ISubGoal,
  created_at: string
}

export interface IInstruction {
  _id: string;
  active: boolean;
  description: string;
  task?: ITask;
  created_at: string;
  updated_at?: string;
}

/**
 * Permissions
 */

export type PermissionsModuleType =
  'case_notes' |
  'client_contacts' |
  'info';

import { IToasterProps, IToastProps } from '@blueprintjs/core';
import { Moment } from 'moment';

export type PAGE_TYPES =
  'add-apd' |
  'add-bank-statement' |
  'add-clients' |
  'add-client-case-notes' |
  'add-client-contact' |
  'add-database-behaviour' |
  'add-database-goal' |
  'add-database-subgoal' |
  'add-database-task' |
  'add-expenses-account' |
  'add-sp-goals' |
  'apd' |
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
  'edit-database-behaviour' |
  'edit-database-goal' |
  'edit-database-subgoal' |
  'edit-database-task' |
  'edit-expense-account' |
  'expenses' |
  'expenses-account' |
  'goals' |
  'goals-data-collection' |
  'goals-database' |
  'goals-database-goals' |
  'goals-database-subgoals' |
  'goals-database-tasks' |
  'life-skills' |
  'logs' |
  'personal-support' |
  'reshab-logs' |
  'respite-logs' |
  'sp-goals';



export type APD_FIELDS_TYPE =
  'critical_incident' |
  'county' |
  'incident_date_time' |
  'reportable_incident'

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

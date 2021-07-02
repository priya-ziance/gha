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
}

export type DeviceType = 'sm' | 'xs' | 'md' | 'lg'

export type FIELDS_TYPE = {
  [key in CLIENT_FIELDS_TYPE]: {
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

export interface IClientModel {
  id: string;
  name: string;
  client: IClient;
}

export type PAGE_TYPES =
  'add-clients' |
  'add-client-contact' |
  'dashboard' |
  'clients' |
  'client-links' |
  'client-contacts'

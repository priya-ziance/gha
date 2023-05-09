// import IBaseModel from "./_baseModel";
// import moment, { Moment } from "moment";
// import { IPersonalFunds } from "../types";

// export default class PeronalFunds implements IBaseModel {
//   active?: boolean;
//   id: string;
//   hiredDate?: Moment;
//   community_activity_save?: boolean;
//   expense_type?: string;
//   expense_description?: string;
//   expense?: number;
//   document?: string;
//   expense_date?: Moment;
//   created_at?: Moment;
//   updated_at?: Moment;
//   mobile?: string;
//   personalFunds: IPersonalFunds;

//   constructor(personalFunds: IPersonalFunds) {
//     this.active = personalFunds.active;
//     this.id = personalFunds._id;
//     this.expense = personalFunds.expense;
//     this.expense_type = personalFunds.expense_type;
//     this.document = personalFunds.document;
//     this.expense_description = personalFunds.expense_description;
//     this.expense_date = personalFunds.expense_date
//       ? moment(personalFunds.expense_date)
//       : undefined;
//     this.created_at = personalFunds.created_at
//       ? moment(personalFunds.created_at)
//       : undefined;
//     this.updated_at = personalFunds.updated_at
//       ? moment(personalFunds.updated_at)
//       : undefined;
//     this.personalFunds = personalFunds;
//   }
// }

import IBaseModel from "./_baseModel";
import moment, { Moment } from "moment";
import { IPersonalFunds } from "../types";

export default class PeronalFunds implements IBaseModel {
  active?: boolean;
  id: string;
  hiredDate?: Moment;
  community_activity_save?: boolean;
  expense_type?: string;
  expense_description?: string;
  expense?: number;
  document?: string;
  expense_date?: Moment;
  created_at?: Moment;
  updated_at?: Moment;
  mobile?: string;
  personalFunds: IPersonalFunds;

  constructor(personalFunds: IPersonalFunds) {
    this.active = personalFunds.active;
    this.id = personalFunds._id;
    this.expense = personalFunds.expense;
    this.expense_type = personalFunds.expense_type;
    this.document = personalFunds.document;
    this.expense_description = personalFunds.expense_description;
    this.expense_date = personalFunds.expense_date
      ? moment(personalFunds.expense_date)
      : undefined;
    this.created_at = personalFunds.created_at
      ? moment(personalFunds.created_at)
      : undefined;
    this.updated_at = personalFunds.updated_at
      ? moment(personalFunds.updated_at)
      : undefined;
    this.personalFunds = personalFunds;
  }
}

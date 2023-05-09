import IBaseModel from "./_baseModel";
import moment, { Moment } from "moment";
import { IPersonalBankStatement } from "../types";

export default class PersonalBankStatement implements IBaseModel {
  id: string;
  client?: string;
  statementName?: string;
  statementDescription?: string;
  fromDate?: Moment;
  toDate?: Moment;
  document?: string;
  active?: boolean;
  PersonalBankStatement: IPersonalBankStatement;

  constructor(values: IPersonalBankStatement) {
   
    this.id = values._id;
    this.client = values.client;
    this.statementDescription = values.statement_description;
    this.statementName = values.statement_name;
    this.fromDate = values.from_date ? moment(values.from_date) : undefined;
    this.toDate = values.from_date ? moment(values.to_date) : undefined;
    this.document = values.document;
    this.active = values.active;
    this.PersonalBankStatement = values;
  }
}

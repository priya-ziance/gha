import IBaseModel from "./_baseModel";
import moment, { Moment } from "moment";
import { IMainBankStatement } from "../types";

export default class MainAccountBankStatement implements IBaseModel {
  id: string;
  client?: string;
  statementName?: string;
  statementDescription?: string;
  fromDate?: Moment;
  toDate?: Moment;
  document?: string;
  active?:boolean;
  MainBankStatement: IMainBankStatement;

  constructor(MainBankStatement: IMainBankStatement) {
   
    this.id = MainBankStatement._id;
    this.statementName = MainBankStatement.statement_name;
    this.statementDescription = MainBankStatement.statement_description;
    this.client = MainBankStatement.client;
    this.fromDate = MainBankStatement.from_date ? moment(MainBankStatement.from_date) : undefined;
    this.toDate = MainBankStatement.to_date ? moment(MainBankStatement.to_date) : undefined;
    this.document = MainBankStatement.document;
    this.active = MainBankStatement.active;
    this.MainBankStatement = MainBankStatement;
  }
}

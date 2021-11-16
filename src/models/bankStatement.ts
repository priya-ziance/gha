import IBaseModel from './_baseModel';
import moment, { Moment } from 'moment';
import { IBankStatement, IFileModel } from '../types'

export default class BankStatement implements IBaseModel {
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

  constructor(bankStatement: IBankStatement) {
    this.active = bankStatement.active;
    this.createdAt = moment(bankStatement.created_at);
    this.bankStatement = bankStatement;
    this.fromDate = moment(bankStatement.from_date);
    this.toDate = moment(bankStatement.to_date);
    this.statementDescription = bankStatement.statement_description;
    this.statementName = bankStatement.statement_name;
    this.id = bankStatement._id;
    this.type = bankStatement.type;
  }
}

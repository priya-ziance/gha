import IBaseModel from './_baseModel';
import moment, { Moment } from 'moment';
import { IExpense, IFileModel, IClientModel } from '../types'

export default class Expense implements IBaseModel {
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
  createdAt: Moment;
  apiExpense: IExpense;

  constructor(expense: IExpense) {
    this.active = expense.active;
    this.inventorySave = expense.inventory_save;
    this.communityActivitySave = expense.community_activity_save;
    this.createdAt = moment(expense.created_at);
    this.expense = expense.expense
    this.expenseDate = moment(expense.expense_date);
    this.expenseType = expense.expense_type;
    this.id = expense._id;
    this.type = expense.type;
    this.apiExpense = expense;
    this.expenseDescription = expense.expense_description;

   this.apiExpense = expense;
  }
}
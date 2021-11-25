import IBaseModel from './_baseModel';
import IClient from './client';
import moment, { Moment } from 'moment';
import { IExpenseList, IClientModel } from '../types'

export default class ExpenseList implements IBaseModel {
  id: string;
  expenseDescription: string;
  expenseType: string;
  expense: number;
  client: IClientModel;
  type: string;
  active: boolean;
  createdAt: Moment;
  expenseList: IExpenseList;

  constructor(expense: IExpenseList) {
    this.active = expense.active;
    this.createdAt = moment(expense.created_at);
    this.client = new IClient(expense.client);
    this.expense = expense.expense
    this.expenseType = expense.expense_type;
    this.id = expense._id;
    this.type = expense.type;
    this.expenseList = expense;
    this.expenseDescription = expense.expense_description;
  }
}
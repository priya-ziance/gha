import IBaseModel from './_baseModel';
import IClient from './client';
import moment, { Moment } from 'moment';
import { IExpenseList, IClientModel, IRecurringExpense } from '../types'

export default class RecurringExpense implements IBaseModel {
  id: string;
  expenseDescription: string;
  expenseType: string;
  expense: number;
  client: IClientModel;
  type: string;
  active: boolean;
  createdAt: Moment;
  recurringExpense: IRecurringExpense;

  constructor(recurringExpense: IRecurringExpense) {
    this.active = recurringExpense.active;
    this.createdAt = moment(recurringExpense.created_at);
    this.client = new IClient(recurringExpense.client);
    this.expense = recurringExpense.expense
    this.expenseType = recurringExpense.expense_type;
    this.id = recurringExpense._id;
    this.type = recurringExpense.type;
    this.recurringExpense = recurringExpense;
    this.expenseDescription = recurringExpense.expense_description;
  }
}
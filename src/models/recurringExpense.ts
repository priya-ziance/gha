import IBaseModel from './_baseModel';
import IClient from './client';
import moment, { Moment } from 'moment';
import { IExpenseList, IClientModel, IRecurringExpense } from '../types'

export default class RecurringExpense implements IBaseModel   {
  id: string;
  expenseDescription: string;
  expenseType: string;
  active: boolean;
  recurringExpense: IRecurringExpense;

  constructor(recurringExpense: IRecurringExpense) {
    this.active = recurringExpense.active;
    this.expenseType = recurringExpense.expense_type;
    this.expenseDescription = recurringExpense.expense_description;
    this.id = recurringExpense._id;
    this.recurringExpense = recurringExpense;
  }
}
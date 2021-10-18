import IBaseModel from './_baseModel';
import moment, { Moment } from 'moment';
import { ICaseNote } from '../types'

export default class CaseNote implements IBaseModel {
  active?: boolean;
  date?: Moment;
  id: string;
  notes?: string;
  significantEvent?: boolean;
  significantEventNotes?: string;
  title?: string;
  caseNote: ICaseNote;

  constructor(caseNote: ICaseNote) {
    this.active = caseNote.active;
    this.date = caseNote.date ? moment(caseNote.date) : undefined;
    this.id = caseNote._id;
    this.notes = caseNote.notes;
    this.significantEvent = caseNote.significant_event;
    this.significantEventNotes = caseNote.significant_event_notes;
    this.title = caseNote.title;

   this.caseNote = caseNote;
  }
}
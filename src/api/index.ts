import get from 'lodash/get';

import client from './client';

import Models from '../models';
import {
  IAppointment,
  IAppointmentModel,
  IBankStatement,
  IBankStatementModel,
  IBehaviour,
  IBehaviourModel,
  ICaseNote,
  ICaseNoteModel,
  IClient,
  IClientModel,
  IClientBehaviour,
  IClientBehaviourModel,
  IClientContact,
  IClientContactModel,
  IExpense,
  IExpenseModel,
  IExpenseList,
  IExpenseListModel,
  IFile,
  IFileModel,
  IGoal,
  IGoalModel,
  IInstruction,
  IInstructionModel,
  ILocation,
  ILocationModel,
  ILogTemplate,
  ILogTemplateModel,
  ILog,
  ILogModel,
  IMedication,
  IMedicationModel,
  INotesDatabase,
  INotesDatabaseModel,
  IPlaceDatabase,
  IPlaceDatabaseModel,
  IQuestion,
  IQuestionModel,
  ISpGoal,
  ISpGoalModel,
  ISubGoalModel,
  ISubGoal,
  ITaskModel,
  ITask,
  IUser,
  IUserModel
} from '../types';


import Normalizer from './normalizer';

type OPTIONS_TYPE = {
  page?: number;
  pageSize?: number;
  params?: {} 
}

//=============================APPOINTMENT API'S=========================

class AppointmentApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IAppointmentModel, IAppointment>(Models.Appointment)
  }

  async getAppointments(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, 'page', 0);
  
    const appointmentsResult = await client.get(`/appointments`, {
      clientId,
      page
    });
  
    return this.normalizer.normalizeArray(appointmentsResult.data.contents);
  }

  async getAppointment(appointmentId: string, options?: OPTIONS_TYPE) {
    const params = get(options, 'params', {});
  
    const appointmentsResult = await client.get(`/appointment/${appointmentId}`, params);
  
    return this.normalizer.normalize(appointmentsResult.data);
  }

  async createAppointment(body = {}, params = {}) {
    const appointmentsResult = await client.post('/appointment', body, { params });
  
    return this.normalizer.normalize(appointmentsResult.data);
  }

  async updateAppointment(appointmentId = '', body = {}, params = {}) {
    const appointmentResult = await client.patch(`/appointment/${appointmentId}`, body, { params });
  
    return this.normalizer.normalize(appointmentResult.data);
  }
}

//============================= CLIENT API'S=============================
class ClientsApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IClientModel, IClient>(Models.Client)
  }

  async getClients(options?: OPTIONS_TYPE) {
    const page = get(options, 'page', 0);
  
    const clientsResult = await client.get(`/clients?page=${page}`);
  
    return this.normalizer.normalizeArray(clientsResult.data.contents);
  }

  async getClientsForUser(options?: OPTIONS_TYPE) {
    const page = get(options, 'page', 0);

    const clientsResult = await client.get(`/clients/forUser?page=${page}`);
  
    return this.normalizer.normalizeArray(clientsResult.data);
  }

  async getClientsForUserByService(service: string, options?: OPTIONS_TYPE) {
    const page = get(options, 'page', 0);

    const clientsResult = await client.get(`/clients/byService?page=${page}&type=${service}`);
  
    return this.normalizer.normalizeArray(clientsResult.data);
  }

  async getClient(clientId: string) {
    const clientResult = await client.get(`/clients/${clientId}`);
  
    return this.normalizer.normalize(clientResult.data);
  }

  async createClient(body = {}) {
    const clientsResult = await client.post('/clients', body);
  
    return this.normalizer.normalize(clientsResult.data);
  }

  async updateClient(clientId: string, body = {}) {
    const clientsResult = await client.patch(`/clients/${clientId}`, body);
  
    return this.normalizer.normalize(clientsResult.data);
  }

  async searchClients(query: string) {
    const clientsResult = await client.post('/clients/search', { searchString: query });
  
    return this.normalizer.normalizeArray(clientsResult.data);
  }
}

//============================= CASE NOTE API'S=============================
class CaseNotesApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<ICaseNoteModel, ICaseNote>(Models.CaseNote)
  }

  async getCaseNotes(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, 'page', 0);
  
    const caseNotesResult = await client.get(`/case_notes`, {
      clientId,
      page
    });
  
    return this.normalizer.normalizeArray(caseNotesResult.data.contents);
  }

  async getCaseNote(caseNoteId: string, params = {}) {
    const caseNoteResult = await client.get(`/case_notes/${caseNoteId}`, params);
  
    return this.normalizer.normalize(caseNoteResult.data);
  }

  async createCaseNote(body = {}) {
    const caseNoteResult = await client.post('/case_notes', body);
  
    return this.normalizer.normalize(caseNoteResult.data);
  }

  async updateCaseNote(caseNoteId = '', body = {}, params = {}) {
    const caseNoteResult = await client.patch(`/case_notes/${caseNoteId}`, body, { params });
  
    return this.normalizer.normalize(caseNoteResult.data);
  }
}

//============================= CLIENT CONTACT API'S========================
class ClientContactApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IClientContactModel, IClientContact>(Models.ClientContact)
  }

  async getClientContacts(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, 'page', 0);
  
    const clientContactsResult = await client.get(`/client_contacts`, {
      clientId,
      page
    });
  
    return this.normalizer.normalizeArray(clientContactsResult.data.contents);
  }


  async getClientContact(clientContactId: string, options?: OPTIONS_TYPE) {
    const params = get(options, 'params', {});

    const clientContactResult = await client.get(`/client_contacts/${clientContactId}`, params);
  
    return this.normalizer.normalize(clientContactResult.data);
  }

  async createClientContact(body = {}) {
    const clientContactResult = await client.post('/client_contacts', body);
  
    return this.normalizer.normalize(clientContactResult.data);
  }

  async updateClientContact(clientContactId = '', body = {}) {
    const clientContactResult = await client.patch(`/client_contacts/${clientContactId}`, body);
  
    return this.normalizer.normalize(clientContactResult.data);
  }
}

//============================= GOAL API'S==================================
class GoalsApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IGoalModel, IGoal>(Models.Goal)
  }

  async getGoals(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, 'page', 0);
  
    const goalsResult = await client.get(`/goals`, {
      clientId,
      page
    });
  
    return this.normalizer.normalizeArray(goalsResult.data.contents);
  }

  async getGoal(goalId: string, options?: OPTIONS_TYPE) {
    const params = get(options, 'params', {});

    const goalResult = await client.get(`/goal/${goalId}`, params);
  
    return this.normalizer.normalize(goalResult.data);
  }

  async createGoal(body = {}, params = {}) {
    const goalResult = await client.post('/goal', body, { params });
  
    return this.normalizer.normalize(goalResult.data);
  }

  async updateGoal(goalId = '', body = {}, params = {}) {
    const goalResult = await client.patch(`/goal/${goalId}`, body, { params });
  
    return this.normalizer.normalize(goalResult.data);
  }
}

//============================= FILE API'S===================================
class FileApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IFileModel, IFile>(Models.File)
  }

  async uploadFile(clientId: string, type: string, file: Blob) {
    const formData = new FormData();
    formData.append('image', file);
    const fileResult = await client.post(`/files/upload/${clientId}?type=${type}`, formData);
  
    return this.normalizer.normalize(fileResult.data);
  }

  async getFile(fileId: string) {
    const fileResult = await client.get(`/files/presignedurl/${fileId}`);
  
    return this.normalizer.normalize(fileResult.data);
  }
}


//============================= LOCATION API'S===========================
class LocationApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<ILocationModel, ILocation>(Models.Location)
  }

  async getLocations() {
    const locationsResult = await client.get('/locations');
  
    return this.normalizer.normalizeArray(locationsResult.data.contents);
  }
}


//============================= LOG TEMPLATES API'S====================================
class LogTemplatesApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<ILogTemplateModel, ILogTemplate>(Models.LogTemplate)
  }

  async getLogTemplates(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, 'page', 0);
    const params = get(options, 'params', {});
  
    const logTemplatesResult = await client.get(`/templates`, {
      clientId,
      page,
      ...params
    });
  
    return this.normalizer.normalizeArray(logTemplatesResult.data.contents);
  }

  async getLogTemplateByType(type: string, options?: OPTIONS_TYPE) {
    const params = get(options, 'params', {});

    const logTemplateResult = await client.get(`/templates/type`, { type, ...params });
  
    if (logTemplateResult.data && logTemplateResult.data[0]) {
      return this.normalizer.normalize(logTemplateResult.data[0]);
    }
  }
  
  async getLogTemplate(logTemplateId: string, options?: OPTIONS_TYPE) {
    const params = get(options, 'params', {});

    const logTemplateResult = await client.get(`/templates/${logTemplateId}`, params);
  
    return this.normalizer.normalize(logTemplateResult.data);
  }

  async createLogTemplate(body = {}, params = {}) {
    const logTemplateResult = await client.post('/template', body, { params });
  
    return this.normalizer.normalize(logTemplateResult.data);
  }

  async updateLogTemplate(logTemplateId = '', body = {}, params = {}) {
    const logTemplateResult = await client.patch(`/templates/${logTemplateId}`, body, { params });
  
    return this.normalizer.normalize(logTemplateResult.data);
  }
}


//================================ Medication API's==========================
class MedicationApi{
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IMedicationModel, IMedication>(Models.Medication )
  }

  async getMedications(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, 'page', 0);
    const medicationResult = await client.get('/medications', {
      clientId,
      page
    });
  
    return this.normalizer.normalizeArray(medicationResult.data.contents);
  }

  async getMedication(medicationID: string, clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, 'page', 0);
    const medicationResult = await client.get(`/medication/${medicationID}`, {
      clientId,
      page
    });
  
    return this.normalizer.normalize(medicationResult.data);
  }

  async getMedicationDetails(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, 'page', 0);
    const params = get(options, 'params', {});

    const medicationResult = await client.get('/details', {
      clientId,
      page,
      ...params
    });
  }

  async createMedication(body = {}, params = {}) {
    const medicationResult = await client.post('/medication', body, { params });
  
    return this.normalizer.normalize(medicationResult.data);
  }

  async updateMedication(medicationId = '', body = {}, params = {}) {
    const medicationResult = await client.patch(`/medication/${medicationId}`, body, { params });
  
    return this.normalizer.normalize(medicationResult.data);
  }
}

//============================= SUBGOAL API'S==================================
class SubGoalsApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<ISubGoalModel, ISubGoal>(Models.SubGoal)
  }

  async getSubGoals(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, 'page', 0);
    const params = get(options, 'params', {});
  
    const goalsResult = await client.get(`/subgoals`, {
      clientId,
      page,
      ...params
    });
  
    return this.normalizer.normalizeArray(goalsResult.data.contents);
  }

  async getSubGoal(goalId: string, options?: OPTIONS_TYPE) {
    const params = get(options, 'params', {});

    const goalResult = await client.get(`/subgoal/${goalId}`, params);
  
    return this.normalizer.normalize(goalResult.data);
  }

  async createSubGoal(body = {}, params = {}) {
    const goalResult = await client.post('/subgoal', body, { params });
  
    return this.normalizer.normalize(goalResult.data);
  }

  async updateSubGoal(goalId = '', body = {}, params = {}) {
    const goalResult = await client.patch(`/subgoal/${goalId}`, body, { params });
  
    return this.normalizer.normalize(goalResult.data);
  }
}


//============================= TASK API'S====================================
class TasksApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<ITaskModel, ITask>(Models.Task)
  }

  async getTasks(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, 'page', 0);
    const params = get(options, 'params', {});
  
    const tasksResult = await client.get(`/tasks`, {
      clientId,
      page,
      ...params
    });
  
    return this.normalizer.normalizeArray(tasksResult.data.contents);
  }

  async getTask(taskId: string, options?: OPTIONS_TYPE) {
    const params = get(options, 'params', {});

    const taskResult = await client.get(`/task/${taskId}`, params);
  
    return this.normalizer.normalize(taskResult.data);
  }

  async createTask(body = {}, params = {}) {
    await client.post('/task', body, { params });
    // const taskResult = await client.post('/task', body, { params });
  
    // return this.normalizer.normalize(taskResult.data);
  }

  async updateTask(taskId = '', body = {}, params = {}) {
    await client.patch(`/task/${taskId}`, body, { params });
    // const taskResult = await client.patch(`/task/${taskId}`, body, { params });
  
    // return this.normalizer.normalize(taskResult.data);
  }
}

//============================= INSTRUCTION API'S==============================
class InstructionsApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IInstructionModel, IInstruction>(Models.Instruction)
  }

  async getInstructions(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, 'page', 0);
    const params = get(options, 'params', {});
  
    const instructionsResult = await client.get(`/instructions`, {
      clientId,
      page,
      ...params
    });
  
    return this.normalizer.normalizeArray(instructionsResult.data.contents);
  }

  async getInstruction(instructionId: string, options?: OPTIONS_TYPE) {
    const params = get(options, 'params', {});

    const instructionResult = await client.get(`/instruction/${instructionId}`, params);
  
    return this.normalizer.normalize(instructionResult.data);
  }

  async createInstruction(body = {}, params = {}) {
    await client.post('/instruction', body, { params });
    // const instructionResult = await client.post('/instruction', body, { params });
  
    // return this.normalizer.normalize(instructionResult.data);
  }

  async updateInstruction(instructionId = '', body = {}, params = {}) {
    await client.patch(`/instruction/${instructionId}`, body, { params });
    // const instructionResult = await client.patch(`/instruction/${instructionId}`, body, { params });
  
    // return this.normalizer.normalize(instructionResult.data);
  }
}


//============================= SP GOAL API'S===================================
class SpGoalsApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<ISpGoalModel, ISpGoal>(Models.SpGoal)
  }

  async getSpGoals(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, 'page', 0);
  
    const goalsResult = await client.get(`/sp_goals`, {
      clientId,
      page
    });
  
    return this.normalizer.normalizeArray(goalsResult.data.contents);
  }

  async getSpGoal(goalId: string, options?: OPTIONS_TYPE) {
    const params = get(options, 'params', {});

    const goalResult = await client.get(`/sp_goal/${goalId}`, params);
  
    return this.normalizer.normalize(goalResult.data);
  }

  async createSpGoal(body = {}, params = {}) {
    const goalResult = await client.post('/sp_goal', body, { params });
  
    // return this.normalizer.normalize(goalResult.data);
  }

  async updateSpGoal(goalId = '', body = {}, params = {}) {
    const goalResult = await client.patch(`/sp_goal/${goalId}`, body, { params });
  
    // return this.normalizer.normalize(goalResult.data);
  }
}


//============================= BEHAVIOUR'S API'S=================================
class BehavioursApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IBehaviourModel, IBehaviour>(Models.Behaviour)
  }

  async getBehaviours(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, 'page', 0);
  
    const behavioursResult = await client.get(`/behaviours`, {
      clientId,
      page
    });
  
    return this.normalizer.normalizeArray(behavioursResult.data.contents);
  }

  async getBehaviour(behaviourId: string, options?: OPTIONS_TYPE) {
    const params = get(options, 'params', {});

    const behaviourResult = await client.get(`/behaviour/${behaviourId}`, params);
  
    return this.normalizer.normalize(behaviourResult.data);
  }

  async createBehaviour(body = {}, params = {}) {
    const behaviourResult = await client.post('/behaviour', body, { params });
  
    return this.normalizer.normalize(behaviourResult.data);
  }

  async updateBehaviour(behaviourId = '', body = {}, params = {}) {
    const behaviourResult = await client.patch(`/behaviour/${behaviourId}`, body, { params });
  
    return this.normalizer.normalize(behaviourResult.data);
  }
}


//============================= CLIENT BEHAVIOUR'S API'S===========================
class ClientBehavioursApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IClientBehaviourModel, IClientBehaviour>(Models.ClientBehaviour)
  }

  async getClientBehaviours(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, 'page', 0);
  
    const behavioursResult = await client.get(`/client_behaviours`, {
      clientId,
      page
    });
  
    return this.normalizer.normalizeArray(behavioursResult.data.contents);
  }

  async getClientBehaviour(clientBehaviourId: string, options?: OPTIONS_TYPE) {
    const params = get(options, 'params', {});

    const clientBehaviourResult = await client.get(`/client_behaviour/${clientBehaviourId}`, params);
  
    return this.normalizer.normalize(clientBehaviourResult.data);
  }

  async createClientBehaviour(body = {}, params = {}) {
    const clientBehaviourResult = await client.post('/client_behaviour', body, { params });
  
    return this.normalizer.normalize(clientBehaviourResult.data);
  }

  async assignBehaviours(behaviours: string[], params = {}) {
    await client.post('/client_behaviours/assign', { behaviour_ids: behaviours }, { params });
  }

  async updateClientBehaviour(clientBehaviourId = '', body = {}, params = {}) {
    const clientBehaviourResult = await client.patch(`/client_behaviour/${clientBehaviourId}`, body, { params });
  
    return this.normalizer.normalize(clientBehaviourResult.data);
  }
}


//============================= EXPENSES API'S====================================
class ExpensesApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IExpenseModel, IExpense>(Models.Expense)
  }

  async getExpenses(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, 'page', 0);
    const params = get(options, 'params', {});
  
    const expensesResult = await client.get(`/expenses`, {
      clientId,
      page,
      ...params
    });
  
    return this.normalizer.normalizeArray(expensesResult.data.contents);
  }

  async getExpense(expenseId: string, options?: OPTIONS_TYPE) {
    const params = get(options, 'params', {});

    const expenseResult = await client.get(`/expense/${expenseId}`, params);
  
    return this.normalizer.normalize(expenseResult.data);
  }

  async createExpense(body = {}, params = {}) {
    const expenseResult = await client.post('/expense', body, { params });
  
    return this.normalizer.normalize(expenseResult.data);
  }

  async updateExpense(expenseId = '', body = {}, params = {}) {
    const expenseResult = await client.patch(`/expense/${expenseId}`, body, { params });
  
    return this.normalizer.normalize(expenseResult.data);
  }
}


//============================= BANK STATEMENT API'S===============================
class BankStatementsApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IBankStatementModel, IBankStatement>(Models.BankStatement)
  }

  async getBankStatements(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, 'page', 0);
    const params = get(options, 'params', {});
  
    const bankStatementsResult = await client.get(`/bank_statements`, {
      clientId,
      page,
      ...params
    });
  
    return this.normalizer.normalizeArray(bankStatementsResult.data.contents);
  }

  async getBankStatement(bank_statementId: string, options?: OPTIONS_TYPE) {
    const params = get(options, 'params', {});

    const bank_statementResult = await client.get(`/bank_statement/${bank_statementId}`, params);
  
    return this.normalizer.normalize(bank_statementResult.data);
  }

  async createBankStatement(body = {}, params = {}) {
    const bank_statementResult = await client.post('/bank_statement', body, { params });
  
    return this.normalizer.normalize(bank_statementResult.data);
  }

  async updateBankStatement(bank_statementId = '', body = {}, params = {}) {
    const bank_statementResult = await client.patch(`/bank_statement/${bank_statementId}`, body, { params });
  
    return this.normalizer.normalize(bank_statementResult.data);
  }
}


//============================= EXPENSES LIST API'S===============================
class ExpensesListApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IExpenseListModel, IExpenseList>(Models.ExpenseList)
  }

  async getExpenseLists(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, 'page', 0);
    const params = get(options, 'params', {});
  
    const expensesResult = await client.get(`/expense_lists`, {
      clientId,
      page,
      ...params
    });
  
    return this.normalizer.normalizeArray(expensesResult.data.contents);
  }

  async getExpenseList(expenseListId: string, options?: OPTIONS_TYPE) {
    const params = get(options, 'params', {});

    const expenseResult = await client.get(`/expense_list/${expenseListId}`, params);
  
    return this.normalizer.normalize(expenseResult.data);
  }

  async createExpenseList(body = {}, params = {}) {
    const expenseResult = await client.post('/expense_list', body, { params });
  
    return this.normalizer.normalize(expenseResult.data);
  }

  async updateExpenseList(expenseListId = '', body = {}, params = {}) {
    const expenseResult = await client.patch(`/expense_list/${expenseListId}`, body, { params });
  
    return this.normalizer.normalize(expenseResult.data);
  }
}


//============================= QUESTIONS API'S====================================
class QuestionsApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IQuestionModel, IQuestion>(Models.Question)
  }

  async getQuestions(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, 'page', 0);
    const params = get(options, 'params', {});
  
    const questionsResult = await client.get(`/questions`, {
      clientId,
      page,
      ...params
    });
  
    return this.normalizer.normalizeArray(questionsResult.data.contents);
  }

  async getQuestion(questionId: string, options?: OPTIONS_TYPE) {
    const params = get(options, 'params', {});

    const questionResult = await client.get(`/question/${questionId}`, params);
  
    return this.normalizer.normalize(questionResult.data);
  }

  async createQuestion(body = {}, params = {}) {
    const questionResult = await client.post('/question', body, { params });
  
    return this.normalizer.normalize(questionResult.data);
  }

  async updateQuestion(questionId = '', body = {}, params = {}) {
    const questionResult = await client.patch(`/question/${questionId}`, body, { params });
  
    return this.normalizer.normalize(questionResult.data);
  }
}

//============================= TEMPLATES API'S====================================
class LogsApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<ILogModel, ILog>(Models.Log)
  }

  async getLogsForPeriod(date_period: string, clientId: string, options?: OPTIONS_TYPE) {
    const params = get(options, 'params', {});
  
    const logsResult = await client.get(`/logs/client/month`, {
      clientId,
      date_period,
      ...params
    });
  
    return this.normalizer.normalizeArray(logsResult.data);
  }

  async getLogsForDate(log_date: string, options?: OPTIONS_TYPE) {
    const page = get(options, 'page', 0);
    const params = get(options, 'params', {});
  
    const logsResult = await client.get(`/logs/date`, {
      page,
      log_date,
      ...params
    });
  
    return this.normalizer.normalizeArray(logsResult.data.contents);
  }

  async getLogsByType(type: string, clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, 'page', 0);
    const params = get(options, 'params', {});
  
    const logsResult = await client.get(`/logs/type`, {
      clientId,
      page,
      type,
      ...params
    });
  
    return this.normalizer.normalizeArray(logsResult.data.contents);
  }

  async getLog(logId: string, options?: OPTIONS_TYPE) {
    const params = get(options, 'params', {});

    const logResult = await client.get(`/logs/${logId}`, params);
  
    return this.normalizer.normalize(logResult.data);
  }

  async updateLog(logId = '', body = {}, params = {}) {
    const logResult = await client.patch(`/logs/${logId}`, body, { params });
  
    return this.normalizer.normalize(logResult.data);
  }
}

//============================= PLACE DATABASE API'S==============================
class PlaceDatabasesApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IPlaceDatabaseModel, IPlaceDatabase>(Models.PlaceDatabase)
  }

  async getPlaces(clientId: string, type: string, options?: OPTIONS_TYPE) {
    const page = get(options, 'page', 0);
    const params = get(options, 'params', {});
  
    const placesResult = await client.get(`/places`, {
      clientId,
      type,
      page,
      ...params
    });
  
    return this.normalizer.normalizeArray(placesResult.data.contents);
  }

  async getPlace(placeId: string, options?: OPTIONS_TYPE) {
    const params = get(options, 'params', {});

    const placeResult = await client.get(`/places/${placeId}`, params);
  
    return this.normalizer.normalize(placeResult.data);
  }

  async createPlace(body = {}, params = {}) {
    const placeResult = await client.post('/places', body, { params });
  
    return this.normalizer.normalize(placeResult.data);
  }

  async updatePlace(placeId = '', body = {}, params = {}) {
    const placeResult = await client.patch(`/places/${placeId}`, body, { params });
  
    return this.normalizer.normalize(placeResult.data);
  }

  async deletePlace(placeId = '', body = {}, params = {}) {
    await client.delete(`/places/${placeId}`, body, { params });
  }
}


//============================= PLACE DATABASE API'S==============================
class NoteDatabasesApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<INotesDatabaseModel, INotesDatabase>(Models.NotesDatabase)
  }

  async getNotes(clientId: string, type: string, options?: OPTIONS_TYPE) {
    const page = get(options, 'page', 0);
    const params = get(options, 'params', {});
  
    const notesResult = await client.get(`/notes`, {
      clientId,
      type,
      page,
      ...params
    });
  
    return this.normalizer.normalizeArray(notesResult.data.contents);
  }

  async getNote(noteId: string, options?: OPTIONS_TYPE) {
    const params = get(options, 'params', {});

    const noteResult = await client.get(`/notes/${noteId}`, params);
  
    return this.normalizer.normalize(noteResult.data);
  }

  async createNote(body = {}, params = {}) {
    const noteResult = await client.post('/notes', body, { params });
  
    return this.normalizer.normalize(noteResult.data);
  }

  async updateNote(noteId = '', body = {}, params = {}) {
    const noteResult = await client.patch(`/notes/${noteId}`, body, { params });
  
    return this.normalizer.normalize(noteResult.data);
  }

  async deleteNote(noteId = '', body = {}, params = {}) {
    await client.delete(`/notes/${noteId}`, body, { params });
  }
}

//============================= USER API'S==============================
class UsersApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IUserModel, IUser>(Models.User)
  }

  async search(searchString: string) {
    const usersResult = await client.post(`/users/search`, { searchString });
  
    return this.normalizer.normalizeArray(usersResult.data);
  }
}



//========================================================================

export default (() => ({
  appointments: new AppointmentApi(),
  bankStatements: new BankStatementsApi(),
  behaviours: new BehavioursApi(),
  clients: new ClientsApi(),
  clientBehaviours: new ClientBehavioursApi(),
  clientContacts: new ClientContactApi(),
  caseNotes: new CaseNotesApi(),
  expenses: new ExpensesApi(),
  expensesList: new ExpensesListApi(),
  files: new FileApi(),
  goals: new GoalsApi(),
  instructions: new InstructionsApi(),
  locations: new LocationApi(),
  logTemplates: new LogTemplatesApi(),
  logs: new LogsApi(),
  medications: new MedicationApi(),
  notes: new NoteDatabasesApi(),
  places: new PlaceDatabasesApi(),
  questions: new QuestionsApi(),
  spGoals: new SpGoalsApi(),
  subgoals: new SubGoalsApi(),
  tasks: new TasksApi(),
  users: new UsersApi()
}))()

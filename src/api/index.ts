import get from 'lodash/get';

import client from './client';

import Models from '../models';
import {
  ICaseNote,
  ICaseNoteModel,
  IClient,
  IClientModel,
  IClientContact,
  IClientContactModel,
  IFile,
  IFileModel,
  IGoal,
  IGoalModel,
  ILocation,
  ILocationModel,
  ISubGoalModel,
  ISubGoal,
  ITaskModel,
  ITask
} from '../types';


import Normalizer from './normalizer';

type OPTIONS_TYPE = {
  page?: number;
  pageSize?: number;
  params?: {} 
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

  async getCaseNote(caseNoteId: string) {
    const caseNoteResult = await client.get(`/case_notes/${caseNoteId}`);
  
    return this.normalizer.normalize(caseNoteResult.data);
  }

  async createCaseNote(body = {}) {
    const caseNoteResult = await client.post('/case_notes', body);
  
    return this.normalizer.normalize(caseNoteResult.data);
  }

  async updateCaseNote(caseNoteId = '', body = {}) {
    const caseNoteResult = await client.patch(`/case_notes/${caseNoteId}`, body);
  
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

  async getGoal(goalId: string) {
    const goalResult = await client.get(`/goal/${goalId}`);
  
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

//============================= SUBGOAL API'S==================================
class SubGoalsApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<ISubGoalModel, ISubGoal>(Models.SubGoal)
  }

  async getSubGoals(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, 'page', 0);
  
    const goalsResult = await client.get(`/subgoals`, {
      clientId,
      page
    });
  
    return this.normalizer.normalizeArray(goalsResult.data.contents);
  }

  async getSubGoal(goalId: string) {
    const goalResult = await client.get(`/subgoal/${goalId}`);
  
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


//============================= TASK API'S==================================
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

  async getTask(taskId: string) {
    const taskResult = await client.get(`/task/${taskId}`);
  
    return this.normalizer.normalize(taskResult.data);
  }

  async createTask(body = {}, params = {}) {
    await client.post('/task', body, { params });
    // const taskResult = await client.post('/task', body, { params });
  
    // return this.normalizer.normalize(taskResult.data);
  }

  async updateTask(taskId = '', body = {}, params = {}) {
    const taskResult = await client.patch(`/task/${taskId}`, body, { params });
  
    return this.normalizer.normalize(taskResult.data);
  }
}




//========================================================================

export default (() => ({
  clients: new ClientsApi(),
  clientContacts: new ClientContactApi(),
  caseNotes: new CaseNotesApi(),
  files: new FileApi(),
  goals: new GoalsApi(),
  subgoals: new SubGoalsApi(),
  tasks: new TasksApi(),
  locations: new LocationApi()
}))()

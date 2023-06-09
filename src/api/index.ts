import get from "lodash/get";

import client from "./client";

import Models from "../models";
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
  IUserModel,
  IBehaviourAssignmentModel,
  IBehaviourAssignment,
  IStaffWithnessModel,
  ISeizureLogsModel,
  ISeizurelogs,
  IClientWithnessModel,
  IClientWithness,
  IStaffWithness,
  IAddTrainerModel,
  IPersonalFundsModel,
  IRelocateModel,
  IRelocate,
  IAddTrainer,
  IAddAdpModel,
  IAddAdp,
  IDischargeModel,
  IDischarge,
  IPersonalFunds,
  IRecurringExpenseModel,
  IRecurringExpense,
  IAddInventoryModel,
  IAddInventory,
  ICommunityActivitiesModel,
  ICommunityActivities,
  IPersonalBankStatement,
  IPersonalBankStatementModel,
  IMainBankStatementModel,
  IMainBankStatement,
} from "../types";

import Normalizer from "./normalizer";

type OPTIONS_TYPE = {
  page?: number;
  pageSize?: number;
  fetchAll?: boolean;
  params?: {};
};

class BaseApi {
  // TODO: Find everywhere this is used and consider taking it out
  // There is a possibility the browser can get stuck if the server
  // has an error where it keeps thinking there are more values to
  // return when there isn't
  async fetchAll(url: string, params: any) {
    let page = 0;
    let hasNext = true;
    const results: any = [];

    while (hasNext) {
      const result = await client.get(url, { ...params, page });

      results.push(result.data.contents);
      hasNext = result.data.hasNext;
      page++;
    }

    return results;
  }
}

//=============================APPOINTMENT API'S=========================

class AppointmentApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IAppointmentModel, IAppointment>(
      Models.Appointment
    );
  }

  async getAppointments(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);

    const appointmentsResult = await client.get(`/appointments`, {
      clientId,
      page,
    });

    return this.normalizer.normalizeArray(appointmentsResult.data.contents);
  }

  async getAppointment(appointmentId: string, options?: OPTIONS_TYPE) {
    const params = get(options, "params", {});

    const appointmentsResult = await client.get(
      `/appointment/${appointmentId}`,
      params
    );

    return this.normalizer.normalize(appointmentsResult.data);
  }

  async createAppointment(body = {}, params = {}) {
    const appointmentsResult = await client.post("/appointment", body, {
      params,
    });

    return this.normalizer.normalize(appointmentsResult.data);
  }

  async updateAppointment(appointmentId = "", body = {}, params = {}) {
    const appointmentResult = await client.patch(
      `/appointment/${appointmentId}`,
      body,
      { params }
    );

    return this.normalizer.normalize(appointmentResult.data);
  }
}

//============================= CLIENT API'S=============================
class ClientsApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IClientModel, IClient>(Models.Client);
  }

  async getClients(options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);
    const clientsResult = await client.get(`/clients?page=${page}`);
    return this.normalizer.normalizeArray(clientsResult.data.contents);
  }

  async getClientsForUser(options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);

    const clientsResult = await client.get(`/clients/forUser?page=${page}`);

    return this.normalizer.normalizeArray(clientsResult.data);
  }

  async getClientsForUserByService(service: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);

    const clientsResult = await client.get(
      `/clients/byService?page=${page}&type=${service}`
    );

    return this.normalizer.normalizeArray(clientsResult.data);
  }

  async getClient(clientId: string) {
    const clientResult = await client.get(`/clients/${clientId}`);

    return this.normalizer.normalize(clientResult.data);
  }

  async createClient(body = {}) {
    const clientsResult = await client.post("/clients", body);

    return this.normalizer.normalize(clientsResult.data);
  }

  async updateClient(clientId: string, body = {}) {
    const clientsResult = await client.patch(`/clients/${clientId}`, body);

    return this.normalizer.normalize(clientsResult.data);
  }

  async searchClients(query: string) {
    const clientsResult = await client.post("/clients/search", {
      searchString: query,
    });

    return this.normalizer.normalizeArray(clientsResult.data);
  }
}

//============================= CASE NOTE API'S=============================
class CaseNotesApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<ICaseNoteModel, ICaseNote>(
      Models.CaseNote
    );
  }

  async getCaseNotes(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);

    const caseNotesResult = await client.get(`/case_notes`, {
      clientId,
      page,
    });

    return this.normalizer.normalizeArray(caseNotesResult.data.contents);
  }

  async getCaseNote(caseNoteId: string, params = {}) {
    const caseNoteResult = await client.get(
      `/case_notes/${caseNoteId}`,
      params
    );

    return this.normalizer.normalize(caseNoteResult.data);
  }

  async createCaseNote(body = {}) {
    const caseNoteResult = await client.post("/case_notes", body);

    return this.normalizer.normalize(caseNoteResult.data);
  }

  async updateCaseNote(caseNoteId = "", body = {}, params = {}) {
    const caseNoteResult = await client.patch(
      `/case_notes/${caseNoteId}`,
      body,
      { params }
    );

    return this.normalizer.normalize(caseNoteResult.data);
  }
}

//============================= CLIENT CONTACT API'S========================
class ClientContactApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IClientContactModel, IClientContact>(
      Models.ClientContact
    );
  }

  async getMedicalClientContacts() {
    const clientContactsResult = await client.get(
      "/client_contacts/medicalContacts"
    );

    return this.normalizer.normalizeArray(clientContactsResult.data);
  }

  async getClientContacts(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);
    const pageSize = get(options, "pageSize", 0);
    const clientContactsResult = await client.get(`/client_contacts`, {
      clientId,
      page,
      pageSize
    });

    return this.normalizer.normalizeArray(clientContactsResult.data.contents);
  }

  async getClientContact(clientContactId: string, options?: OPTIONS_TYPE) {
    const params = get(options, "params", {});

    const clientContactResult = await client.get(
      `/client_contacts/${clientContactId}`,
      params
    );

    return this.normalizer.normalize(clientContactResult.data);
  }

  async getMedicalContact(clientContactId: string, options?: OPTIONS_TYPE) {
    const params = get(options, "params", {});

    const clientContactResult = await client.get(
      `/client_contacts/medicalcontact/${clientContactId}`,
      params
    );

    return this.normalizer.normalize(clientContactResult.data);
  }

  async createClientContact(body = {}) {
    const clientContactResult = await client.post("/client_contacts", body);

    return this.normalizer.normalize(clientContactResult.data);
  }

  async createMedicalContact(body = {}) {
    const clientContactResult = await client.post(
      "/client_contacts/medicalcontact",
      body
    );

    return this.normalizer.normalize(clientContactResult.data);
  }

  async search(searchString: string) {
    const clientContactsResult = await client.post(`/client_contacts/search`, {
      searchString,
    });

    return this.normalizer.normalizeArray(clientContactsResult.data);
  }

  async updateClientContact(clientContactId = "", body = {}) {
    const clientContactResult = await client.patch(
      `/client_contacts/${clientContactId}`,
      body
    );

    return this.normalizer.normalize(clientContactResult.data);
  }

  async updateMedicalContact(clientContactId = "", body = {}) {
    const clientContactResult = await client.patch(
      `/client_contacts/medicalcontact/${clientContactId}`,
      body
    );

    return this.normalizer.normalize(clientContactResult.data);
  }
}

//============================= CLIENT WITNESS API'S========================
class ClientWitnessApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IClientWithnessModel, IClientWithness>(
      Models.ClientWitness
    );
  }

  async getClientWitness(clientId?: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);
    const pageSize = get(options, "pageSize", 0);
    const clientWitnessResult = await client.get(`/client-witness`, {
      page,
      pageSize
    });

    return this.normalizer.normalizeArray(clientWitnessResult.data.contents);
  }

  async getClientWitnessById(clientWitnessId: string) {
    const clientWitnessResult = await client.get(
      `/client-witness/${clientWitnessId}`
    );
    return this.normalizer.normalize(clientWitnessResult.data);
  }

  async createClientWitness(body = {}) {
    const clientContactResult = await client.post("/client-witness", body);
    return this.normalizer.normalize(clientContactResult.data);
  }

  async updateClientWitness(clientWitnessId = "", body = {}) {
    const clientWitnessResult = await client.patch(
      `/client-witness/${clientWitnessId}`,
      body
    );
    return this.normalizer.normalize(clientWitnessResult.data);
  }
  async deleteClientWitness(clientWitnessId: String, body = {}) {
    const deleteResult =  await client.delete(`/client-witness/${clientWitnessId}`, body);
    return this.normalizer.normalize(deleteResult.data);
  }
}

//============================= CLIENT WITNESS API'S========================
class StaffWitnessApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IStaffWithnessModel, IStaffWithness>(
      Models.StaffWithness
    );
  }

  async getStaffWitness(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);
    const pageSize = get(options, "pageSize", 0);
    const staffWitnessResult = await client.get(`/staff-witness`, {
      clientId,
      page,
      pageSize
    });

    return this.normalizer.normalizeArray(staffWitnessResult.data.contents);
  }

  async createStaffWitness(body = {}) {
    const clientStaffResult = await client.post("/staff-witness", body);
    return this.normalizer.normalize(clientStaffResult.data);
  }

  async updateStaffWitness(staffWitnessId = "", body = {}) {
    const clientWitnessResult = await client.patch(
      `/staff-witness/${staffWitnessId}`,
      body
    );

    
    return this.normalizer.normalize(clientWitnessResult.data);
  }

  async getStaffWitnessById(staffWitnessId: string) {
    const staffWitnessResult = await client.get(
      `/staff-witness/${staffWitnessId}`
    );
    return this.normalizer.normalize(staffWitnessResult.data);
  }
  async deleteStaffWitness(staffWitnessId: String, body = {}) {
    const deleteResult =  await client.delete(`/staff-witness/${staffWitnessId}`, body);
    return this.normalizer.normalize(deleteResult.data);
  }
}
//============================= Seizure Logs API'S========================
class SeizureLogsApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<ISeizureLogsModel, ISeizurelogs>(
      Models.SeizureLogs
    );
  }

  async getSeizureLogs(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 1);
    const pageSize = get(options, "pageSize", 0);
    const SeizureLogsResult = await client.get(`/seizure-log`, {
      clientId,
      page,
      pageSize
    });
    return this.normalizer.normalizeArray(SeizureLogsResult.data.contents);
  }

  async createSeizureLogs(body = {}) {
    const clientStaffResult = await client.post("/seizure-log", body);
    return this.normalizer.normalize(clientStaffResult.data);
  }
  async deleteSeizureLogs(seizurelogId: String, body = {}) {
    const deleteResult =  await client.delete(`/seizure-log/${seizurelogId}`, body);
    return this.normalizer.normalize(deleteResult.data);
  }
  async updateSeizureLogs(seizurelogId: String, body = {}) {
    const clientWitnessResult = await client.patch(`/seizure-log/${seizurelogId}`,
      body
    );
    return this.normalizer.normalize(clientWitnessResult.data);
  }

  async getSeizureLogsById(seizurelogId: string) {
    const seizureLogByIdResult = await client.get(`/seizure-log/${seizurelogId}`);
    return this.normalizer.normalize(seizureLogByIdResult.data);
  }
}
//============================= ADD TRAINERS API'S========================================
class AddTrainerApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IAddTrainerModel, IAddTrainer>(
      Models.AddTrainers
    );
  }

  async getTrainer(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);
    const pageSize = get(options, "pageSize", 0);
    const addTrainerResult = await client.get(`/trainer`, {
      clientId,
      page,
      pageSize
    });
    return this.normalizer.normalizeArray(addTrainerResult.data.contents);
  }

  async createTrainer(body = {}) {
    const addTrainerResult = await client.post("/trainer", body);
    return this.normalizer.normalize(addTrainerResult.data);
  }
  async deleteTrainer(trainerId: String, body = {}) {
    const deleteResult =  await client.delete(`/trainer/${trainerId}`, body);
    return this.normalizer.normalize(deleteResult.data);
  }
  async updateTrainer(trainerId = String, body = {}) {
    const clientTrainerResult = await client.patch(
      `/trainer/${trainerId}`,
      body
    );
    return this.normalizer.normalize(clientTrainerResult.data);
  }
  async getTrainerById(clientId: string) {
    const addTrainersResult = await client.get(`/trainer/${clientId}`);
    return this.normalizer.normalize(addTrainersResult.data);
  }
}


//=============================COMMUNITY ACTIVITIES API'S========================================
class CommunityActivities {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<ICommunityActivitiesModel, ICommunityActivities>(
      Models.CommunityActivities
    );
  }

  async getCommunityActivities(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);
    const pageSize = get(options, "pageSize", 0);
    const addTrainerResult = await client.get(`/community-activities`, {
      clientId,
      page,
      pageSize
    });
    return this.normalizer.normalizeArray(addTrainerResult.data.contents);
  }

  async createCommunityActivities(body = {}) {
    const addTrainerResult = await client.post("/community-activities", body);
    return this.normalizer.normalize(addTrainerResult.data);
  }
  async deleteCommunityActivities(CommunityActivityId: String, body = {}) {
    const deleteResult =  await client.delete(`/community-activities/${CommunityActivityId}`, body);
    return this.normalizer.normalize(deleteResult.data);
  }
  async updateCommunityActivities(trainerId = String, body = {}) {
    const clientTrainerResult = await client.patch(
      `/community-activities/${trainerId}`,
      body
    );
    return this.normalizer.normalize(clientTrainerResult.data);
  }
  async getCommunityActivityById(clientId: string) {
    const addTrainersResult = await client.get(`/community-activities/${clientId}`);
    return this.normalizer.normalize(addTrainersResult.data);
  }
}

//============================= Personal bank api API'S========================================
class PersonalBankStatementApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IPersonalBankStatementModel, IPersonalBankStatement>(
      Models.PersonalBankStatement
    );
  }

  async getPersonalBankStatement(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);
    const pageSize = get(options, "pageSize", 0);
    const personalBankStatementrResult = await client.get(`/personal-bank-statement`, {
      clientId,
      page,
      pageSize,
    });
    return this.normalizer.normalizeArray(
      personalBankStatementrResult.data.contents
    );
  }

  async createPersonalBankStatement(body = {}) {
    const result = await client.post("/personal-bank-statement", body);
    return this.normalizer.normalize(result.data);
  }
  async deletePersonalBankStatement(personalBankStatementId: String, body = {}) {
    const deleteResult = await client.delete(`/personal-bank-statement/${personalBankStatementId}`, body);
    return this.normalizer.normalize(deleteResult.data);
  }
  async updatePersonalBankStatement(personalBankStatementId: String, body = {}) {
    const result = await client.patch(
      `/personal-bank-statement/${personalBankStatementId}`,
      body
    );
    return this.normalizer.normalize(result.data);
  }
  async getPersonalBankStatementId(clientId: string) {
    const result = await client.get(`/personal-bank-statement/${clientId}`);
    return this.normalizer.normalize(result.data);
  }
}


//============================= Personal Funds API'S========================================

class AddPersonalFundsApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IPersonalFundsModel, IPersonalFunds>(
      Models.Personalfunds
    );
  }

  async getPersonalFunds(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);
    const pageSize = get(options, "pageSize", 0);
    const personalFundsResult = await client.get(`/personal-funds`, {
      clientId,
      page,
      pageSize
    });
    return this.normalizer.normalizeArray(personalFundsResult.data.contents);
  }

  async createPersonalFund(body = {}) {
    const addTrainerResult = await client.post("/personal-funds", body);
    return this.normalizer.normalize(addTrainerResult.data);
  }
  async deltePersonalFund(PersonalFundsId: String, body = {}) {
    const deleteResult =  await client.delete(`/personal-funds/${PersonalFundsId}`, body);
    return this.normalizer.normalize(deleteResult.data);
  }
  async updatePersonalFund(PersonalFundsId = String, body = {}) {
    const updateResult = await client.patch(
      `/personal-funds/${PersonalFundsId}`,
      body
    );
    return this.normalizer.normalize(updateResult.data);
  }
  async getPersonalFundById(PersonalFundsId: string) {
    const PersonalFundById = await client.get(`/personal-funds/${PersonalFundsId}`);
    console.log("funnnnndddddd by id", PersonalFundById);
    
    return this.normalizer.normalize(PersonalFundById.data);
  }
}
// class AddPersonalFundsApi {
//   normalizer;

//   constructor() {
//     this.normalizer = new Normalizer<IPersonalFundsModel, IPersonalFunds>(
//       Models.Personalfunds
//     );
//   }

//   async getPersonalFunds(clientId: string, options?: OPTIONS_TYPE) {
//     const page = get(options, "page", 0);
//     const pageSize = get(options, "pageSize", 0);
//     const personalFundsResult = await client.get(`/personal-funds`, {
//       clientId,
//       page,
//       pageSize
//     });
//     return this.normalizer.normalizeArray(personalFundsResult.data.contents);
//   }

//   async createPersonalFund(body = {}) {
//     const addTrainerResult = await client.post("/personal-funds", body);
//     return this.normalizer.normalize(addTrainerResult.data);
//   }
//   async deltePersonalFund(PersonalFundsId: String, body = {}) {
//     console.log("personal fund id ==>",PersonalFundsId);
    
//     const deleteResult =  await client.delete(`/personal-funds/${PersonalFundsId}`, body);
//     return this.normalizer.normalize(deleteResult.data);
//   }
//   async updatePersonalFund(PersonalFundsId = String, body = {}) {
//     const updateResult = await client.patch(
//       `/personal-funds/${PersonalFundsId}`,
//       body
//     );
//     return this.normalizer.normalize(updateResult.data);
//   }
//   async getPersonalFundById(PersonalFundsId: string) {
//     const PersonalFundById = await client.get(`/personal-funds/${PersonalFundsId}`);
//     console.log("funnnnndddddd by id", PersonalFundById);
    
//     return this.normalizer.normalize(PersonalFundById.data);
//   }
// }

//============================= home Discharge API'S========================================
class DischargerApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IDischargeModel, IDischarge>(
      Models.Discharge
    );
  }

  async getDischarges(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);
    const pageSize = get(options, "pageSize", 0);
    const result = await client.get(`/home-discharge`, {
      clientId,
      page,
      pageSize
    });
    return this.normalizer.normalizeArray(result.data.contents);
  }

  async createDischarge(body = {}) {
    const result = await client.post("/home-discharge", body);
    return this.normalizer.normalize(result.data);
  }
  
  async deleteDischarge(dischargeId: String, body = {}) {
    const deleteResult =  await client.delete(`/home-discharge/${dischargeId}`, body);
    return this.normalizer.normalize(deleteResult.data);
  }
  async updateDischarge(dischargeId = String, body = {}) {
    const result = await client.patch(
      `/home-discharge/${dischargeId}`,
      body
    );
    return this.normalizer.normalize(result.data);
  }
  async getDischargeId(clientId: string) {
    const result = await client.get(`/home-discharge/${clientId}`);
    return this.normalizer.normalize(result.data);
  }
}
//============================= ADD MAIN ACCOUNT BANK STATEMENT API'S========================================
class MainAccountApi {
  normalizer;
  hasNext;

  constructor() {
    this.normalizer = new Normalizer<IMainBankStatementModel, IMainBankStatement>(
      Models.MainAccountBankStatement
    );
    this.hasNext = false
  }

  async getMainAccount(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);
    const pageSize = get(options, "pageSize", 0);
    const addMainAccountResult = await client.get(`/main-account-bank-statement`, {
      clientId,
      page,
      pageSize
    });
    this.hasNext = addMainAccountResult.data.hasNext;
    return {
      data: this.normalizer.normalizeArray(addMainAccountResult.data.contents),
      hasNext: this.hasNext
    }
  }

  async haveMoreRecords(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);
    const pageSize = get(options, "pageSize", 0);
    const addMainAccountResult = await client.get(`/main-account-bank-statement`, {
      clientId,
      page,
      pageSize
    });
    return this.hasNext = addMainAccountResult.data.hasNext;
  }

  async createMainAccount(body = {}) {
    const addMainAccountResult = await client.post("/main-account-bank-statement", body);
    return this.normalizer.normalize(addMainAccountResult.data);
  }
  async deleteMainAccount(mainBankStatementId: String, body = {}) {
    const deleteResult =  await client.delete(`/main-account-bank-statement/${mainBankStatementId}`, body);
    return this.normalizer.normalize(deleteResult.data);
  }
  async updateMainAccount(mainBankStatementId = String, body = {}) {
    const clientMainAccountResult = await client.patch(
      `/main-account-bank-statement/${mainBankStatementId}`,
      body
    );
    return this.normalizer.normalize(clientMainAccountResult.data);
  }
  async getMainAccountById(mainBankStatementId: string) {
    const addMainAccountResult = await client.get(`/main-account-bank-statement/${mainBankStatementId}`);
    return this.normalizer.normalize(addMainAccountResult.data);
  }
}
//============================= Relocate /transfer API'S========================================
class AddRelocateApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IRelocateModel, IRelocate>(
      Models.Relocate
    );
  }

  async getRelocate(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);
    const pageSize = get(options, "pageSize", 0);
    const addTrainerResult = await client.get(`/transfer`, {
      clientId,
      page,
      pageSize
    });

    
    return this.normalizer.normalizeArray(addTrainerResult.data.contents);
  }

  async createRelocate(body = {}) {
    const addTrainerResult = await client.post("/transfer", body);
    return this.normalizer.normalize(addTrainerResult.data);
  }
  async deleteRelocate(relocateId: String, body = {}) {
    const deleteResult =  await client.delete(`/transfer/${relocateId}`, body);
    return this.normalizer.normalize(deleteResult.data);
  }
  async updateRelocate(relocateId = String, body = {}) {
    const clientRelocateResult = await client.patch(
      `/transfer/${relocateId}`,
      body
    );
    return this.normalizer.normalize(clientRelocateResult.data);
  }
  async getRelocateyId(clientId: string) {
    const addTrainersResult = await client.get(`/transfer/${clientId}`);
    return this.normalizer.normalize(addTrainersResult.data);
  }
}

//============================= ADD ADP API'S========================================
class AddAdpApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IAddAdpModel, IAddAdp>(
      Models.AddAdp
    );
  }

  async getAdp(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);
    const pageSize = get(options, "pageSize", 0);
    const addAdpResult = await client.get(`/adp-uir`, {
      clientId,
      page,
      pageSize
    });
    return this.normalizer.normalizeArray(addAdpResult.data.contents);
  }

  async createAdp(body = {}) {
    const addAdpResult = await client.post("/adp-uir", body);
    return this.normalizer.normalize(addAdpResult.data);
  }
  async deleteAdp(adpId: String, body = {}) {
    const deleteResult =  await client.delete(`/adp-uir/${adpId}`, body);
    return this.normalizer.normalize(deleteResult.data);
  }
  async updateAdp(adpId = String, body = {}) {
    const clientAdpResult = await client.patch(
      `/adp-uir/${adpId}`,
      body
    );
    return this.normalizer.normalize(clientAdpResult.data);
  }
  async getAdpById(clientId: string) {
    const addAdpResult = await client.get(`/adp/${clientId}`);
    return this.normalizer.normalize(addAdpResult.data);
  }
}


//============================= GOAL API'S==================================
class GoalsApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IGoalModel, IGoal>(Models.Goal);
  }

  async getGoals(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);
    const pageSize = get(options, "pageSize", 0);
    const goalsResult = await client.get(`/goals`, {
      clientId,
      page,
      pageSize
    });

    return this.normalizer.normalizeArray(goalsResult.data.contents);
  }

  async getGoal(goalId: string, options?: OPTIONS_TYPE) {
    const params = get(options, "params", {});

    const goalResult = await client.get(`/goal/${goalId}`, params);

    return this.normalizer.normalize(goalResult.data);
  }

  async createGoal(body = {}, params = {}) {
    const goalResult = await client.post("/goal", body, { params });

    return this.normalizer.normalize(goalResult.data);
  }

  async updateGoal(goalId = "", body = {}, params = {}) {
    const goalResult = await client.patch(`/goal/${goalId}`, body, { params });

    return this.normalizer.normalize(goalResult.data);
  }
}

//============================= FILE API'S===================================
class FileApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IFileModel, IFile>(Models.File);
  }

  async uploadFile(clientId: string, type: string, file: Blob) {
    const formData = new FormData();
    formData.append("image", file);
    const fileResult = await client.post(
      `/files/upload/${clientId}?type=${type}`,
      formData
    );

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
    this.normalizer = new Normalizer<ILocationModel, ILocation>(
      Models.Location
    );
  }

  async getLocation(locationId: string, params = {}) {
    const locationResult = await client.get(`/locations/${locationId}`, params);

    return this.normalizer.normalize(locationResult.data);
  }

  async createLocation(body = {}) {
    const locationResult = await client.post("/locations", body);

    return this.normalizer.normalize(locationResult.data);
  }

  async updateLocation(locationId = "", body = {}, params = {}) {
    const locationResult = await client.patch(
      `/locations/${locationId}`,
      body,
      { params }
    );

    return this.normalizer.normalize(locationResult.data);
  }

  async getLocations(options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);
    const params = get(options, "params", {});
    const locationsResult = await client.get(`/locations`, {
      page,
      ...params,
    });

    return this.normalizer.normalizeArray(locationsResult.data.contents);
  }
}

//============================= LOG TEMPLATES API'S====================================
class LogTemplatesApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<ILogTemplateModel, ILogTemplate>(
      Models.LogTemplate
    );
  }

  async getLogTemplates(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);
    const params = get(options, "params", {});
    const pageSize = get(options, "pageSize", 0);
    const logTemplatesResult = await client.get(`/templates`, {
      clientId,
      page,
      pageSize,
      ...params,
    });

    return this.normalizer.normalizeArray(logTemplatesResult.data.contents);
  }

  async getLogTemplateByType(type: string, options?: OPTIONS_TYPE) {
    const params = get(options, "params", {});

    const logTemplateResult = await client.get(`/templates/type`, {
      type,
      ...params,
    });

    if (logTemplateResult.data && logTemplateResult.data[0]) {
      return this.normalizer.normalize(logTemplateResult.data[0]);
    }
  }

  async getLogTemplate(logTemplateId: string, options?: OPTIONS_TYPE) {
    const params = get(options, "params", {});

    const logTemplateResult = await client.get(
      `/templates/${logTemplateId}`,
      params
    );

    return this.normalizer.normalize(logTemplateResult.data);
  }

  async createLogTemplate(body = {}, params = {}) {
    const logTemplateResult = await client.post("/template", body, { params });

    return this.normalizer.normalize(logTemplateResult.data);
  }

  async updateLogTemplate(logTemplateId = "", body = {}, params = {}) {
    const logTemplateResult = await client.patch(
      `/templates/${logTemplateId}`,
      body,
      { params }
    );

    return this.normalizer.normalize(logTemplateResult.data);
  }
}

//================================ Medication API's==========================
class MedicationApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IMedicationModel, IMedication>(
      Models.Medication
    );
  }

  async getMedications(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);
    const pageSize = get(options, "pageSize", 0);
    const medicationResult = await client.get("/medications", {
      clientId,
      page,
      pageSize
    });

    return this.normalizer.normalizeArray(medicationResult.data.contents);
  }

  async getMedication(
    medicationID: string,
    clientId: string,
    options?: OPTIONS_TYPE
  ) {
    const page = get(options, "page", 0);
    const pageSize = get(options, "pageSize", 0);
    const medicationResult = await client.get(`/medication/${medicationID}`, {
      clientId,
      page,
      pageSize
    });

    return this.normalizer.normalize(medicationResult.data);
  }

  async createMedication(body = {}, params = {}) {
    const medicationResult = await client.post("/medication", body, { params });

    return this.normalizer.normalize(medicationResult.data);
  }

  async updateMedication(medicationId = "", body = {}, params = {}) {
    const medicationResult = await client.patch(
      `/medication/${medicationId}`,
      body,
      { params }
    );

    return this.normalizer.normalize(medicationResult.data);
  }
  async deleteMedication(medicationId: String,clientId:string, body = {}) {
    const deleteResult =  await client.delete(`/medication/${medicationId}?clientId=${clientId}`, body);
    return this.normalizer.normalize(deleteResult.data);
  }
}

//============================= SUBGOAL API'S==================================
class SubGoalsApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<ISubGoalModel, ISubGoal>(Models.SubGoal);
  }

  async getSubGoals(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);
    const params = get(options, "params", {});

    const goalsResult = await client.get(`/subgoals`, {
      clientId,
      page,
      ...params,
    });

    return this.normalizer.normalizeArray(goalsResult.data.contents);
  }

  async getSubGoal(goalId: string, options?: OPTIONS_TYPE) {
    const params = get(options, "params", {});

    const goalResult = await client.get(`/subgoal/${goalId}`, params);

    return this.normalizer.normalize(goalResult.data);
  }

  async createSubGoal(body = {}, params = {}) {
    const goalResult = await client.post("/subgoal", body, { params });

    return this.normalizer.normalize(goalResult.data);
  }

  async updateSubGoal(goalId = "", body = {}, params = {}) {
    const goalResult = await client.patch(`/subgoal/${goalId}`, body, {
      params,
    });

    return this.normalizer.normalize(goalResult.data);
  }
}

//============================= TASK API'S====================================
class TasksApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<ITaskModel, ITask>(Models.Task);
  }

  async getTasks(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);
    const params = get(options, "params", {});

    const tasksResult = await client.get(`/tasks`, {
      clientId,
      page,
      ...params,
    });

    return this.normalizer.normalizeArray(tasksResult.data.contents);
  }

  async getTask(taskId: string, options?: OPTIONS_TYPE) {
    const params = get(options, "params", {});

    const taskResult = await client.get(`/task/${taskId}`, params);

    return this.normalizer.normalize(taskResult.data);
  }

  async createTask(body = {}, params = {}) {
    await client.post("/task", body, { params });
    // const taskResult = await client.post('/task', body, { params });

    // return this.normalizer.normalize(taskResult.data);
  }

  async updateTask(taskId = "", body = {}, params = {}) {
    await client.patch(`/task/${taskId}`, body, { params });
    // const taskResult = await client.patch(`/task/${taskId}`, body, { params });

    // return this.normalizer.normalize(taskResult.data);
  }
}

//============================= INSTRUCTION API'S==============================
class InstructionsApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IInstructionModel, IInstruction>(
      Models.Instruction
    );
  }

  async getInstructions(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);
    const params = get(options, "params", {});

    const instructionsResult = await client.get(`/instructions`, {
      clientId,
      page,
      ...params,
    });

    return this.normalizer.normalizeArray(instructionsResult.data.contents);
  }

  async getInstruction(instructionId: string, options?: OPTIONS_TYPE) {
    const params = get(options, "params", {});

    const instructionResult = await client.get(
      `/instruction/${instructionId}`,
      params
    );

    return this.normalizer.normalize(instructionResult.data);
  }

  async createInstruction(body = {}, params = {}) {
    await client.post("/instruction", body, { params });
    // const instructionResult = await client.post('/instruction', body, { params });

    // return this.normalizer.normalize(instructionResult.data);
  }

  async updateInstruction(instructionId = "", body = {}, params = {}) {
    await client.patch(`/instruction/${instructionId}`, body, { params });
    // const instructionResult = await client.patch(`/instruction/${instructionId}`, body, { params });

    // return this.normalizer.normalize(instructionResult.data);
  }
}

//============================= SP GOAL API'S===================================
class SpGoalsApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<ISpGoalModel, ISpGoal>(Models.SpGoal);
  }

  async getSpGoals(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);
    const pageSize = get(options, "pageSize", 0);
    const goalsResult = await client.get(`/sp_goals`, {
      clientId,
      page,
      pageSize
    });
    
    return this.normalizer.normalizeArray(goalsResult.data.contents);
  }

  async getSpGoal(goalId: string,  clientId:String) {
    const goalResult = await client.get(`/sp_goal/${goalId}?clientId=${clientId}`);    
    return this.normalizer.normalize(goalResult.data);
  }

  async createSpGoal(body = {}, params = {}) {
    const goalResult = await client.post("/sp_goal", body, { params });
    return this.normalizer.normalize(goalResult.data);
  }
  async deleteSpGoal(spgoalId: String,clientId:string, body = {}) {
    const deleteResult =  await client.delete(`/sp_goal/${spgoalId}?clientId=${clientId}`, body);
    return this.normalizer.normalize(deleteResult.data);
  }

  async updateSpGoal(spGoalId:string, body = {},clientId:string) {
    console.log("goal id",spGoalId);
    console.log("clientId id",clientId);
    const goalResult = await client.patch(`/sp_goal/${spGoalId}?clientId=${clientId}`, body);

    return this.normalizer.normalize(goalResult.data);
  }
}

//============================= BEHAVIOUR'S API'S=================================
class BehavioursApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IBehaviourModel, IBehaviour>(
      Models.Behaviour
    );
  }

  async getBehaviours(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);
    const pageSize = get(options, "pageSize", 0);
    const behavioursResult = await client.get(`/behaviours`, {
      clientId,
      page,
      pageSize
    });
    return this.normalizer.normalizeArray(behavioursResult.data.contents);
  }

  async getBehaviour(clientId: string, options?: OPTIONS_TYPE) {
    const params = get(options, "params", {});

    const behaviourResult = await client.get(
      `/behaviour/${clientId}`,
      params
    );
console.log("behaviour",this.getBehaviour);

    return this.normalizer.normalize(behaviourResult.data);
  }

  async createBehaviour(body = {}, params = {}) {
    const behaviourResult = await client.post("/behaviour", body, { params });

    return this.normalizer.normalize(behaviourResult.data);
  }

  async updateBehaviour(behaviourId = "", body = {}, params = {}) {
    const behaviourResult = await client.patch(
      `/behaviour/${behaviourId}`,
      body,
      { params }
    );

    return this.normalizer.normalize(behaviourResult.data);
  }
}

//============================= CLIENT BEHAVIOUR'S API'S===========================
class ClientBehavioursApi extends BaseApi {
  normalizer;

  constructor() {
    super();
    this.normalizer = new Normalizer<IClientBehaviourModel, IClientBehaviour>(
      Models.ClientBehaviour
    );
  }

  async getClientBehaviours(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);
    const params = { clientId, page };
    const url = "/client_behaviours";

    if (options?.fetchAll) {
      return this.normalizer.normalizeArray(await this.fetchAll(url, params));
    }
    const behavioursResult = await client.get(url, params);
    return this.normalizer.normalizeArray(behavioursResult.data.contents);
  }

  async getClientBehaviour(clientBehaviourId: string, options?: OPTIONS_TYPE) {
    const params = get(options, "params", {});
    const clientBehaviourResult = await client.get(
      `/client_behaviour/${clientBehaviourId}`,
      params
    );
    return this.normalizer.normalize(clientBehaviourResult.data);
  }

  async createClientBehaviour(body = {}, params = {}) {
    const clientBehaviourResult = await client.post("/client_behaviour", body, {
      params,
    });
    return this.normalizer.normalize(clientBehaviourResult.data);
  }

  async deleteClientBehaviour(clientBehaviourId: String,clientId: string ,body: {}) {
    const deleteResult =  await client.delete(`/client_behaviour/${clientBehaviourId}?clientId=${clientId}` ,body);
    return this.normalizer.normalize(deleteResult.data);
  }

  async assignBehaviours(behaviours: string[], params = {}) {
    await client.post(
      "/client_behaviours/assign",
      { behaviour_ids: behaviours },
      { params }
    );
  }

  async updateClientBehaviour(clientBehaviourId = "", body = {}, params = {}) {
    const clientBehaviourResult = await client.patch(
      `/client_behaviour/${clientBehaviourId}`,
      body,
      { params }
    );

    return this.normalizer.normalize(clientBehaviourResult.data);
  }
}

//============================= EXPENSES API'S====================================
class ExpensesApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IExpenseModel, IExpense>(Models.Expense);
  }

  async getExpenses(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);
    const params = get(options, "params", {});
    const pageSize = get(options, "pageSize", 0);
    const expensesResult = await client.get(`/expenses`, {
      clientId,
      page,
      ...params,
      pageSize
    });

    return this.normalizer.normalizeArray(expensesResult.data.contents);
  }

  async getExpense(expenseId: string, options?: OPTIONS_TYPE) {
    const params = get(options, "params", {});

    const expenseResult = await client.get(`/expense/${expenseId}`, params);

    return this.normalizer.normalize(expenseResult.data);
  }

  async createExpense(body = {}, params = {}) {
    const expenseResult = await client.post("/expense", body, { params });

    return this.normalizer.normalize(expenseResult.data);
  }

  async updateExpense(expenseId = "", body = {}, params = {}) {
    const expenseResult = await client.patch(`/expense/${expenseId}`, body, {
      params,
    });

    return this.normalizer.normalize(expenseResult.data);
  }

  async getBalance(type = "", clientId = "") {
    return await client.get("/balance", { type, client: clientId });
  }
}

//============================= BANK STATEMENT API'S===============================
class BankStatementsApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IBankStatementModel, IBankStatement>(
      Models.BankStatement
    );
  }

  async getBankStatements(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);
    const params = get(options, "params", {});
    const pageSize = get(options, "pageSize", 0);
    const bankStatementsResult = await client.get(`/bank_statements`, {
      clientId,
      page,
      pageSize,
      ...params,
    });

    return this.normalizer.normalizeArray(bankStatementsResult.data.contents);
  }

  async getBankStatement(bank_statementId: string, options?: OPTIONS_TYPE) {
    const params = get(options, "params", {});

    const bank_statementResult = await client.get(
      `/bank_statement/${bank_statementId}`,
      params
    );

    return this.normalizer.normalize(bank_statementResult.data);
  }

  async createBankStatement(body = {}, params = {}) {
    const bank_statementResult = await client.post("/bank_statement", body, {
      params,
    });

    return this.normalizer.normalize(bank_statementResult.data);
  }

  async updateBankStatement(bank_statementId = "", body = {}, params = {}) {
    const bank_statementResult = await client.patch(
      `/bank_statement/${bank_statementId}`,
      body,
      { params }
    );

    return this.normalizer.normalize(bank_statementResult.data);
  }
}

//============================= EXPENSES LIST API'S===============================
class ExpensesListApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IExpenseListModel, IExpenseList>(
      Models.ExpenseList
    );
  }

  async getExpenseLists(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);
    const params = get(options, "params", {});
    const pageSize = get(options, "pageSize", 0);
    const expensesResult = await client.get(`/expense_lists`, {
      clientId,
      page,
      ...params,
      pageSize,
    });

    return this.normalizer.normalizeArray(expensesResult.data.contents);
  }

  async getExpenseList(expenseListId: string, options?: OPTIONS_TYPE) {
    const params = get(options, "params", {});

    const expenseResult = await client.get(
      `/expense_list/${expenseListId}`,
      params
    );

    return this.normalizer.normalize(expenseResult.data);
  }

  async createExpenseList(body = {}, params = {}) {
    const expenseResult = await client.post("/expense_list", body, { params });

    return this.normalizer.normalize(expenseResult.data);
  }

  async updateExpenseList(expenseListId = "", body = {}, params = {}) {
    const expenseResult = await client.patch(
      `/expense_list/${expenseListId}`,
      body,
      { params }
    );

    return this.normalizer.normalize(expenseResult.data);
  }
}

//=============================Recurring EXPENSES  API'S===============================
class RecurringExpenseApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IRecurringExpenseModel, IRecurringExpense>(
      Models.RecurringExpense
    );
  }

  async geRecurringtExpense(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);
    const params = get(options, "params", {});
    const pageSize = get(options, "pageSize", 0);
    const expensesResult = await client.get(`/recurring-expense`, {
      clientId,
      page,
      ...params,
      pageSize,
    });
console.log("res data: => ",expensesResult);

    return this.normalizer.normalizeArray(expensesResult.data.contents);
  }

  async getRecurringtExpenseById(expenseListId: string, options?: OPTIONS_TYPE) {
    const params = get(options, "params", {});

    const expenseResult = await client.get(
      `/recurring-expense/${expenseListId}`,
      params
    );

    return this.normalizer.normalize(expenseResult.data);
  }

  async createRecurringtExpense(body = {}, params = {}) {
    const expenseResult = await client.post("/recurring-expense", body, { params });

    return this.normalizer.normalize(expenseResult.data);
  }
  async deleteRecurringtExpense(expenseListId: String,clientId:string, body = {}) {
    const deleteResult =  await client.delete(`/recurring-expense/${expenseListId}?clientId=${clientId}`, body);
    return this.normalizer.normalize(deleteResult.data);
  }
  async updateRecurringtExpense(expenseListId = "", body = {}, params = {}) {
    const expenseResult = await client.patch(
      `/recurring-expense/${expenseListId}`,
      body,
      { params }
    );

    return this.normalizer.normalize(expenseResult.data);
  }
}
//============================= QUESTIONS API'S====================================
class QuestionsApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IQuestionModel, IQuestion>(
      Models.Question
    );
  }

  async getQuestions(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);
    const params = get(options, "params", {});

    const questionsResult = await client.get(`/questions`, {
      clientId,
      page,
      ...params,
    });

    return this.normalizer.normalizeArray(questionsResult.data.contents);
  }

  async getQuestion(questionId: string, options?: OPTIONS_TYPE) {
    const params = get(options, "params", {});

    const questionResult = await client.get(`/question/${questionId}`, params);

    return this.normalizer.normalize(questionResult.data);
  }

  async createQuestion(body = {}, params = {}) {
    const questionResult = await client.post("/question", body, { params });

    return this.normalizer.normalize(questionResult.data);
  }

  async updateQuestion(questionId = "", body = {}, params = {}) {
    const questionResult = await client.patch(`/question/${questionId}`, body, {
      params,
    });

    return this.normalizer.normalize(questionResult.data);
  }
}

//============================= TEMPLATES API'S====================================
class LogsApi {
  normalizer;
   constructor() {
    this.normalizer = new Normalizer<ILogModel, ILog>(Models.Log);
  }
  async getLogsForPeriod(
    date_period: string,
    clientId: string,
    options?: OPTIONS_TYPE
  ) {
    const params = get(options, "params", {});
    const logsResult = await client.get(`/logs/client/month`, {
      clientId,
      date_period,
      ...params,
    });

    return this.normalizer.normalizeArray(logsResult.data);
  }

  async getLogsForDate(log_date: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);
    const params = get(options, "params", {});
    const pageSize = get(options, "pageSize", 0);
    const logsResult = await client.get(`/`, {
      page,
      log_date,
      pageSize,
      ...params,
    });
    return this.normalizer.normalizeArray(logsResult.data.contents);
  }

  async getLogsByType(type: string, clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);
    const params = get(options, "params", {});
    const pageSize = get(options, "pageSize", 0);
    const logsResult = await client.get(`/logs/type`, {
      clientId,
      page,
      pageSize,
      type,
      ...params,
    });
    return this.normalizer.normalizeArray(logsResult.data.contents);
  }

  async getLog(logId: string, options?: OPTIONS_TYPE) {
    const params = get(options, "params", {});
    const logResult = await client.get(`/logs/${logId}`, params);
    return this.normalizer.normalize(logResult.data);
  }
  async createLog(body = {}) {
    const clientStaffResult = await client.post("/seizure-log", body); 
    return this.normalizer.normalize(clientStaffResult.data);
  }
  async updateLog(logId = "", body = {}, params = {}) {
    const logResult = await client.patch(`/logs/${logId}`, body, { params });
    return this.normalizer.normalize(logResult.data);
  }
}

//============================= PLACE DATABASE API'S==============================
class PlaceDatabasesApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IPlaceDatabaseModel, IPlaceDatabase>(
      Models.PlaceDatabase
    );
  }

  async getPlaces(clientId: string, type: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);
    const params = get(options, "params", {});
    const pageSize = get(options, "pageSize", 0);
    const placesResult = await client.get(`/places`, {
      clientId,
      type,
      page,
      pageSize,
      ...params,
    });

    return this.normalizer.normalizeArray(placesResult.data.contents);
  }

  async getPlace(placeId: string, options?: OPTIONS_TYPE) {
    const params = get(options, "params", {});

    const placeResult = await client.get(`/places/${placeId}`, params);

    return this.normalizer.normalize(placeResult.data);
  }

  async createPlace(body = {}, params = {}) {
    const placeResult = await client.post("/places", body, { params });

    return this.normalizer.normalize(placeResult.data);
  }

  async updatePlace(placeId = "", body = {}, params = {}) {
    const placeResult = await client.patch(`/places/${placeId}`, body, {
      params,
    });

    return this.normalizer.normalize(placeResult.data);
  }

  async deletePlace(placeId = "", body = {}, params = {}) {
    await client.delete(`/places/${placeId}`, body, { params });
  }
}

//============================= ADD INVENTORYS API'S========================================
class AddInventoryApi {
  normalizer;
  constructor() {
    this.normalizer = new Normalizer<IAddInventoryModel, IAddInventory>(
      Models.Addinventory
    );
  }
  async getInventory(clientId: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);
    const pageSize = get(options, "pageSize", 0);
    const addInventoryResult = await client.get(`/client-inventory`, {
      // clientId,
      page,
      pageSize
    });
    console.log("invent ",addInventoryResult);
    
    return this.normalizer.normalizeArray(addInventoryResult.data.contents);
  }
  async createInventory(body = {}) {
    const addInventoryResult = await client.post("/client-inventory", body);
    return this.normalizer.normalize(addInventoryResult.data);
  }
  async deleteInventory(InventoryId: String, body = {}) {
    const deleteResult =  await client.delete(`/client-inventory/${InventoryId}`, body);
    return this.normalizer.normalize(deleteResult.data);
  }
  async updateInventory(InventoryId = String, body = {}) {
    const clientInventoryResult = await client.patch(
      `/client-inventory/${InventoryId}`,
      body
    );
    return this.normalizer.normalize(clientInventoryResult.data);
  }
  async getInventoryById(InventoryId: string) {
    const addInventorysResult = await client.get(`/client-inventory/${InventoryId}`);
    return this.normalizer.normalize(addInventorysResult.data);
  }
}
//============================= PLACE DATABASE API'S==============================
class NoteDatabasesApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<INotesDatabaseModel, INotesDatabase>(
      Models.NotesDatabase
    );
  }

  async getNotes(clientId: string, type: string, options?: OPTIONS_TYPE) {
    const page = get(options, "page", 0);
    const params = get(options, "params", {});

    const notesResult = await client.get(`/notes`, {
      clientId,
      type,
      page,
      ...params,
    });

    return this.normalizer.normalizeArray(notesResult.data.contents);
  }

  async getNote(noteId: string, options?: OPTIONS_TYPE) {
    const params = get(options, "params", {});

    const noteResult = await client.get(`/notes/${noteId}`, params);

    return this.normalizer.normalize(noteResult.data);
  }

  async createNote(body = {}, params = {}) {
    const noteResult = await client.post("/notes", body, { params });

    return this.normalizer.normalize(noteResult.data);
  }

  async updateNote(noteId = "", body = {}, params = {}) {
    const noteResult = await client.patch(`/notes/${noteId}`, body, { params });

    return this.normalizer.normalize(noteResult.data);
  }

  async deleteNote(noteId = "", body = {}, params = {}) {
    await client.delete(`/notes/${noteId}`, body, { params });
  }
}

//============================= USER API'S==============================
class UsersApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<IUserModel, IUser>(Models.User);
  }

  async search(searchString: string) {
    const usersResult = await client.post(`/users/search`, { searchString });
    return this.normalizer.normalizeArray(usersResult.data);
  }
}

//======================= BEHAVIOUR ASSIGNMENT API'S======================
class BehaviourAssignmentApi {
  normalizer;

  constructor() {
    this.normalizer = new Normalizer<
      IBehaviourAssignmentModel,
      IBehaviourAssignment
    >(Models.BehaviourAssignment);
  }

  async getAssignments(clientId: string) {
    const assignmentsResult = await client.get(
      `/client_behaviours_assignments`,
      { clientId }
    );

    return this.normalizer.normalize(assignmentsResult?.data);
  }
}

//========================================================================

export default (() => ({
  appointments: new AppointmentApi(),
  bankStatements: new BankStatementsApi(),
  behaviours: new BehavioursApi(),
  behaviourAssignment: new BehaviourAssignmentApi(),
  clients: new ClientsApi(),
  clientBehaviours: new ClientBehavioursApi(),
  clientContacts: new ClientContactApi(),
  clientWitness: new ClientWitnessApi(),
  staffWitness: new StaffWitnessApi(),
  Trainers: new AddTrainerApi(),
  CommunityActivities: new CommunityActivities(),
  PersonalFunds: new AddPersonalFundsApi(),
  mainAccount: new MainAccountApi(),
  Discharge: new DischargerApi(),
  Relocate: new AddRelocateApi(),
  caseNotes: new CaseNotesApi(),
  expenses: new ExpensesApi(),
  expensesList: new ExpensesListApi(),
  recurringExpense: new RecurringExpenseApi(),
  files: new FileApi(),
  goals: new GoalsApi(),
  instructions: new InstructionsApi(),
  locations: new LocationApi(),
  logTemplates: new LogTemplatesApi(),
  logs: new LogsApi(),
  ADP: new AddAdpApi(),
  Inventorys: new AddInventoryApi(),
  personalBankStatement: new PersonalBankStatementApi(),
  seizureLogs: new  SeizureLogsApi(),
  medications: new MedicationApi(),
  notes: new NoteDatabasesApi(),
  places: new PlaceDatabasesApi(),
  questions: new QuestionsApi(),
  spGoals: new SpGoalsApi(),
  subgoals: new SubGoalsApi(),
  tasks: new TasksApi(),
  users: new UsersApi(),
}))();

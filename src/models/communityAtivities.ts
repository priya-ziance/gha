// import IBaseModel from './_baseModel';
// import moment, { Moment } from 'moment';
// import { ICommunityActivities, IFileModel, IClientModel } from '../types'

// export default class CommunityActivities implements IBaseModel {
//   id: string;
//   notes?: string;
//   date?: Moment;
//   place_5?: string;
//   place_3?: string;
//   location?: string;
//   significant_event?: string;
//   place_4?: string;
//   document?: IFileModel;
//   active?: boolean;
//   place_1?: string;
//   place_2?: string;
//   created_at?: Moment;
//   updated_at?: Moment;
//   updated_date?: Moment;
//   communityActivites: ICommunityActivities;

//   constructor(communityActivites: ICommunityActivities) {
//     this.active = communityActivites.active;
//     this.place_1 = communityActivites.place_1;
//     this.place_2 = communityActivites.place_2;
//     this.place_5 = communityActivites.place_5
//     this.created_at = moment(communityActivites.created_at);
//     this.date =moment(communityActivites.date)
//     this.updated_at = moment(communityActivites.updated_at);
//     this.updated_date = moment(communityActivites.updated_date);
//     this.place_3 = communityActivites.place_3;
//     this.id = communityActivites._id;
//     this.place_4 = communityActivites.place_4;
//     this.notes = communityActivites.notes;
//     this.significant_event = communityActivites.significant_event;

//    this.communityActivites = communityActivites;
//   }
// }

import IBaseModel from './_baseModel';
import moment, { Moment } from 'moment';
import { ICommunityActivities, IFileModel, IClientModel } from '../types'

export default class CommunityActivities implements IBaseModel {
  id: string;
  notes?: string;
  date?: Moment;
  place_5?: string;
  place_3?: string;
  location?: string;
  significant_event?: string;
  place_4?: string;
  document?: IFileModel;
  active?: boolean;
  place_1?: string;
  place_2?: string;
  updated_date?: Moment;
  communityActivities: ICommunityActivities;

  constructor(communityActivities: ICommunityActivities) {
    this.active = communityActivities.active;
    this.place_1 = communityActivities.place_1;
    this.place_2 = communityActivities.place_2;
    this.place_5 = communityActivities.place_5
    this.date =moment(communityActivities.date)
    this.updated_date = moment(communityActivities.updated_date);
    this.place_3 = communityActivities.place_3;
    this.id = communityActivities._id;
    this.place_4 = communityActivities.place_4;
    this.notes = communityActivities.notes;
    this.significant_event = communityActivities.significant_event;

   this.communityActivities = communityActivities;
  }
}
// import { Checkbox, Intent } from '@blueprintjs/core';
// import get from 'lodash/get';

// import { Button } from '../../../components';

// import { IClientContactModel } from '../../../types';


// export const firstNameColumn = (data: IClientContactModel) => {
//   return (
//     <>{data.firstName}</>
//   )
// }

// export const lastNameColumn = (data: IClientContactModel) => {
//   return (
//     <>{data.lastName}</>
//   )
// }

// export const addressColumn = (data: IClientContactModel) => {
//   return (
//     <>{data.address}</>
//   )
// }

// export const activeColumn = (data: IClientContactModel) => {
//   return (
//     <Checkbox checked={data.active} disabled/>
//   )
// }

// export const dateOfBirthColumn = (data: IClientContactModel) => {
//   const date = get(data, 'dateOfBirth');
  
//   if (date) {
//     return (
//       <>{date.format('MMMM Do YYYY')}</>
//     )
//   }

//   return (<></>)
// }

// export const actionColumn = (data: IClientContactModel) => {
//   return (
//     <>
//       <Button intent={Intent.PRIMARY} small>
//         <b>view</b>
//       </Button>
//     </>
//   )
// }
import { Intent } from "@blueprintjs/core";
import { AnchorButton, Button } from "../../../components";
import { IAddAdpModel, IStaffWithnessModel } from "../../../types";

export const nameColumn = (data: IAddAdpModel) => {
  return (
    <>
      {data.firstName}&nbsp;{data.lastName}
    </>
  );
};

export const clientNameColumn = (data: IAddAdpModel) => {
  return <>{data.client}</>;
};

export const countryNameColumn = (data: IAddAdpModel) => {
  return <>{data.contry}</>;
};

export const criticalIncidentTypeColumn = (data: IAddAdpModel) => {
  return <>{data.criticalIncidentType}</>;
};

export const telephoneColumn = (data: IAddAdpModel) => {
  return <>{data.telephone}</>;
};
export const facilityColumn = (data: IAddAdpModel) => {
  return <>{data.nameOfFacility}</>;
};

export const notifiedColumn = (data: IAddAdpModel) => {
  return <>{data.notified ? 'Yes' : 'No'}</>;
};

export const criticalIncidentColumn = (data: IAddAdpModel) => {
  return <>{data.criticalIncident  ? 'Yes' : 'No'}</>;
};

export const eventDescColumn = (data: IAddAdpModel) => {
  return <>{data.eventDescription }</>;
};

export const clientInvolvedColumn = (data: IAddAdpModel) => {
  if (data?.clientsInvolved && data.clientsInvolved.length > 0) {
    return <>{data.clientsInvolved.join("")}</>;
  }
  return <></>;
};

export const employeeInvolvedColumn = (data: IAddAdpModel) => {
  if (data?.employeeInvolved && data.employeeInvolved.length > 0) {
    return <>{data.employeeInvolved.join("")}</>;
  }
  return <></>;
};

export const incidentDateColumn = (data: IAddAdpModel) => {
  return <>{data.incidentDate?.format("DD-MM-YYYY")}</>;
};

export const reportedDateColumn = (data: IAddAdpModel) => {
  return <>{data.reportDate?.format("DD-MM-YYYY")}</>;
};

export const emailColumn = (data: IStaffWithnessModel) => {
  return <>{data.email}</>;
};

export const mobileColumn = (data: IStaffWithnessModel) => {
  return <>{data.mobile}</>;
};

export const addressColumn = (data: IStaffWithnessModel) => {
  return <>{data.address}</>;
};

export const actionColumn = (
  data: IStaffWithnessModel,
  { onDelete, viewLink }: any
) => {
  return (
    <>
      <AnchorButton
        linkProps={{
          to: viewLink,
        }}
        buttonProps={{
          intent: Intent.PRIMARY,
        }}
      >
        <b>view</b>
      </AnchorButton>{" "}
      <Button
        onClick={() => {
          if (onDelete) {
            onDelete(data);
          }
        }}
        icon="trash"
        intent={Intent.DANGER}
      />
    </>
  );
};

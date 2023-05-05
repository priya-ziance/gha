// @ts-nocheck
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
  return <>{data?.clientName ? data.clientName : "-"}</>;
};

export const clientsInvolvedColumn = (data: IAddAdpModel) => {
  return <>{data?.clientInvolvedNameList?.join(", ") ?? "-"}</>;
};

export const employeesInvolvedColumn = (data: IAddAdpModel) => {
  return <>{data?.employeeInvolvedNameList?.join(", ") ?? "-"}</>;
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
  return <>{data.notified ? "Yes" : "No"}</>;
};

export const ReportableIncidentColumn = (data: IAddAdpModel) => {
  return <>{data.reportableIncident ? "Yes" : "No"}</>;
};

export const PersonReportColumn = (data: IAddAdpModel) => {
  return <>{data.personReport ?? ""}</>;
};

export const ReportedPersonPhoneColumn = (data: IAddAdpModel) => {
  return <>{data.reportedPersonPhone ?? ""}</>;
};

export const reviewSupervisorPhoneColumn = (data: IAddAdpModel) => {
  return <>{data.reviewSupervisorPhone ?? ""}</>;
};

export const ReviewSupervisor = (data: IAddAdpModel) => {
  return <>{data.reviewSupervisor ?? ""}</>;
};

export const WaiverSupportCordinatorPhoneColumn = (data: IAddAdpModel) => {
  return <>{data.WaiverSupportCordinatorPhone ?? ""}</>;
};

export const WaiverSupportCordinatorColumn = (data: IAddAdpModel) => {
  return <>{data.WaiverSupportCordinator ?? ""}</>;
};

export const ReportableIncidentTypeColumn = (data: IAddAdpModel) => {
  return <>{data.reportableIncidentType ?? ""}</>;
};

export const criticalIncidentColumn = (data: IAddAdpModel) => {
  return <>{data.criticalIncident ? "Yes" : "No"}</>;
};

export const eventDescColumn = (data: IAddAdpModel) => {
  return <>{data.eventDescription}</>;
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

export const incidentTimeColumn = (data: IAddAdpModel) => {
  const timeZone = data.incidentTime;
  const isISoTime = !isNaN(Date.parse(timeZone));
  if (isISoTime) {
    const timeData = new Date(timeZone);
    return <>{timeData.toLocaleTimeString()}</>;
  } else {
    return <>{timeZone}</>;
  }
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

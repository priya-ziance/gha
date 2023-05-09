import { Checkbox, Intent } from '@blueprintjs/core';
import { AnchorButton, Button } from '../../../components';
import { IPersonalBankStatementModel } from '../../../types';

export const clientNameColumn = (data: IPersonalBankStatementModel) => {
  return <>{data?.clientName ? data.clientName : "-"}</>;
};

export const statementNameColumn = (data: IPersonalBankStatementModel) => {
  return <>{data?.statementName ? data.statementName : "-"}</>;
};

export const statementDescriptionColumn = (data: IPersonalBankStatementModel) => {
  return <>{data?.statementDescription ? data.statementDescription : "-"}</>;
};

export const documentColumn = (data: IPersonalBankStatementModel) => {
  return <>{data?.document ? data.document : "-"}</>;
};

export const activeColumn = (data: IPersonalBankStatementModel) => {
  return <Checkbox checked={data?.active} />
};

export const dateColumn = (data: IPersonalBankStatementModel) => {
  return <>{data?.fromDate ? data.fromDate.format("DD-MM-YYYY") : "-"}</>;
};


export const actionColumn = (data: IPersonalBankStatementModel, { onDelete,viewLink }: any) => {
  return (
    <>
      <AnchorButton
        linkProps={{
          to: viewLink
        }}
        buttonProps={{
          intent: Intent.PRIMARY
        }}
        
      >
        <b>view</b>
      </AnchorButton>
      {" "}
      {" "}
      <Button
        onClick={() => {
          if (onDelete) {
            onDelete(data)
          }
        }}
        icon='trash'
        intent={Intent.DANGER}
      />
    </>
  )
}
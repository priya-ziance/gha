import { Checkbox, Intent } from '@blueprintjs/core';
import { AnchorButton, Button } from '../../../components';
import { IMainBankStatementModel } from '../../../types';

export const clientColumn = (data: IMainBankStatementModel) => {
  return (
    <>{data.client}</>
  )
}

export const StatementNameColumn = (data: IMainBankStatementModel) => {
  return (
    <>{data.statementName}</>
  )
}

export const StatementDescColumn = (data: IMainBankStatementModel) => {
  return (
    <>{data.statementDescription}</>
  )
}

export const FromDateColumn = (data: IMainBankStatementModel) => {
  return (
    <>{data.fromDate?.format('DD MM YYYY')}</>
  )
}

export const ToDateColumn = (data: IMainBankStatementModel) => {
  return (
    <>{data.toDate?.format('DD MM YYYY')}</>
  )
}

export const DocuementColumn = (data: IMainBankStatementModel) => {
  return (
    <>{data.document}</>
  )
}

export const activeColumn = (data: IMainBankStatementModel) => {
  return (
    <Checkbox checked={data?.active} />
  )
}

export const actionColumn = (data: IMainBankStatementModel, { onDelete,viewLink }: any) => {
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
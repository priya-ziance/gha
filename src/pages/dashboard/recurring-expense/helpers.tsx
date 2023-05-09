import { Checkbox, Intent } from "@blueprintjs/core";
import { AnchorButton, Button } from "../../../components";
import { IRecurringExpenseModel } from "../../../types";

export const expenseTypeColumn = (data: IRecurringExpenseModel) => {
  console.log("data",data);
  
  return <p className="bp3-table-truncated-cell">{data.expenseType}</p>;
};

export const descriptionColumn = (data: IRecurringExpenseModel) => {
  return <p className="bp3-table-truncated-cell">{data.expenseDescription}</p>;
};

export const activeColumn = (data: IRecurringExpenseModel) => {
  return <Checkbox checked={data.active} disabled />;
};

export const actionColumn = (
  data: IRecurringExpenseModel,
  { viewLink, onDelete }: any
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

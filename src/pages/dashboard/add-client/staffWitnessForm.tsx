import { SyntheticEvent, useState } from "react";
import {
  Classes,
  Intent,
  Menu,
  MenuItem,
  RadioGroup,
  Radio,
} from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { Select, IItemRendererProps } from "@blueprintjs/select";

import {
  AnchorButton,
  Button,
  Col,
  Dialog,
  FormGroup,
  H4,
  InputGroup,
  Row,
} from "../../../components";

import {
  KEY_USE
} from "./constants";

import { IDialog } from "./types";

const formSelectItemRenderer = (item: string, props: IItemRendererProps) => {
  return (
    <MenuItem
      text={item}
      onClick={props.handleClick}
      shouldDismissPopover={false}
    />
  );
};

const Tile = (props: { children: string }) => {
  return <H4>{props.children}</H4>;
};

const StaffWitnessForm = (props: IDialog) => {
  const { isOpen, handleClose } = props;

  const FormSelect = Select.ofType<string>();

  const onFormSelectChange: any = (item: string, event: SyntheticEvent) => {};

  const getSelectField = (
    selectOptions: string[],
    options: { label: string; btnText: string; field: string }
  ) => (
    <FormGroup
      intent={Intent.PRIMARY}
      label={options.label}
      labelFor="text-input"
      labelInfo={"(required)"}
    >
      <FormSelect
        items={selectOptions}
        filterable={false}
        itemRenderer={formSelectItemRenderer}
        noResults={<MenuItem disabled={true} text="No results." />}
        onItemSelect={onFormSelectChange(options.field)}
      >
        <Button text={options.btnText} rightIcon="double-caret-vertical" />
      </FormSelect>
    </FormGroup>
  );

  return (
    <Dialog
      icon="info-sign"
      onClose={handleClose}
      title="Add Staff Witness Form"
      isOpen={isOpen}
    >
      <>
        <div className={`${Classes.DIALOG_BODY} add-client__levelsOfService`}>
          <div>
            <Tile>Key Use Acknowledge Form</Tile>
            {getSelectField(KEY_USE, {
              label: "Personal Copy",
              btnText: "Test",
              field: "",
            })}
            <hr />
          </div>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Tooltip2 content="This button is hooked up to close the dialog.">
              <Button onClick={handleClose}>Close</Button>
            </Tooltip2>
            <AnchorButton
              linkProps={{
                to: "",
              }}
              buttonProps={{
                intent: Intent.PRIMARY,
              }}
            >
              Add Staff Witness
            </AnchorButton>
          </div>
        </div>
      </>
    </Dialog>
  );
};

export default StaffWitnessForm;

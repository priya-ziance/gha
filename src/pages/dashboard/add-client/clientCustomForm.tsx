import { SyntheticEvent, useState } from "react";
import { Classes, Intent, Menu, MenuItem, RadioGroup, Radio } from "@blueprintjs/core";
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
  IMPLEMENTATION_PLAN,
  KEY_USE,
  MEDICAL_RELEASE_FORM,
  ROOM_AND_BOARD
} from './constants';

import { IDialog } from './types';


const formSelectItemRenderer = (item: string, props: IItemRendererProps) => {
  return (
      <MenuItem
          text={item}
          // active={active}
          onClick={props.handleClick}
          shouldDismissPopover={false}
      />
  )
}

const Tile = (props: { children: string }) => {
  return (
    <H4>
      {props.children}
    </H4>
  )
}

const LevelsOfService = (props: IDialog) => {
  const { isOpen, handleClose } = props;

  const FormSelect = Select.ofType<string>();

  const onFormSelectChange: any = (item: string, event: SyntheticEvent) => {}

  const getSelectField = (selectOptions: string[], options: { label: string, btnText: string, field: string }) => (
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
  )

  return (
    <Dialog
      icon='info-sign'
      onClose={handleClose}
      title='Add Client Custom Form'
      isOpen={isOpen}
    >
      <>
        <div className={`${Classes.DIALOG_BODY} add-client__levelsOfService`}>
          <div>
            <Tile>Key Use Acknowledge Form</Tile>
            {getSelectField(KEY_USE, { label: 'Personal Copy', btnText: 'Test', field: '' })}

            <hr />
            
            <Tile> Implementation Plan Acknowledgement Form </Tile>
            {getSelectField(IMPLEMENTATION_PLAN, { label: 'Consumer', btnText: 'Test', field: '' })}
            {getSelectField(IMPLEMENTATION_PLAN, { label: 'Family Guardian', btnText: 'Test', field: '' })}
            {getSelectField(IMPLEMENTATION_PLAN, { label: 'WS Coordinator', btnText: 'Test', field: '' })}

            <hr />

            <Tile> Room and Board Agreement </Tile>
            {getSelectField(ROOM_AND_BOARD, { label: 'Room and Board', btnText: 'Test', field: '' })}

            <hr />

            <Tile> Medical Release Form </Tile>
            {getSelectField(MEDICAL_RELEASE_FORM, { label: 'Family Guardian Allowed', btnText: 'Test', field: '' })}
            {getSelectField(MEDICAL_RELEASE_FORM, { label: 'WS Coordinator Allowed', btnText: 'Test', field: '' })}
          </div>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Tooltip2 content='This button is hooked up to close the dialog.'>
              <Button onClick={handleClose}>Close</Button>
            </Tooltip2>
            <AnchorButton
              linkProps={{
                to: ''
              }}
              buttonProps={{
                intent: Intent.PRIMARY,
              }}
            >
              Visit the Foundry website
            </AnchorButton>
          </div>
        </div>
      </>
    </Dialog>
  );
};

export default LevelsOfService;

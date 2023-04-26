import { useState } from "react";
import { Classes, Intent, RadioGroup, Radio } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";

import {
  AnchorButton,
  Button,
  Col,
  Dialog,
  InputGroup,
  Row,
} from "../../../components";

import { IDialog } from './types';


const LevelsOfService = (props: IDialog) => {
  const { isOpen, handleClose } = props;

  const handleRadioChange = (e: any) => {}

  return (
    <Dialog
      icon='info-sign'
      onClose={handleClose}
      title='Level of Service'
      isOpen={isOpen}
    >
      <>
        <div className={`${Classes.DIALOG_BODY} add-client__levelsOfService`}>
          <div>
            <p>
              <strong>
                1. How many prompts and or physical assistance does a client need
                daily to complete self care/ daily living activities?
              </strong>
            </p>
            <RadioGroup
              onChange={handleRadioChange}
              selectedValue=''
            >
              <Row>
                <Col>
                  <Radio
                    label='Verbal Prompts Only'
                    value='Verbal Prompts Only'
                  />
                  <Radio
                    label='both prompts & physical assistance'
                    value='both prompts & physical assistance'
                  />
                </Col>
                <Col>
                  <Radio
                    label='physical assistance'
                    value='physical assistance'
                  />
                  <Radio
                    label='Full care for all daily living activities'
                    value='Full care for all daily living activities'
                  />
                </Col>
              </Row>
            </RadioGroup>
            <Row>
              <Col>
                <p style={{ textAlign: "end" }}>
                  # of prompts or physical assistance a day =
                </p>
              </Col>
              <Col>
                <InputGroup />
              </Col>
            </Row>
            <Row>
              <Col>
                <p style={{ textAlign: "end" }}>
                  # of physical assistance daily =
                </p>
                <br />
              </Col>
              <Col>
                <InputGroup />
              </Col>
            </Row>
            <Row>
              <Col>
                <p style={{ textAlign: "end" }}>
                  If full care only, how many hours a day spent completing all
                  daily living activities?
                </p>
              </Col>
              <Col>
                <InputGroup />
              </Col>
            </Row>
          </div>
          <div>
            <p>
              <strong>
                2. Does the client need assistance or intervention to eat safely?
              </strong>
            </p>
            <RadioGroup
              onChange={handleRadioChange}
              selectedValue=''
            >
              {/* <Row> */}
                {/* <Col> */}
                  <Radio
                    label='Verbal assistance only'
                    value='verbal assistance only'
                  />
                  <Radio
                    label='fully dependent on staff to feed'
                    value='fully dependent on staff to feed'
                  />
                  <Radio
                    label='full observation to prevent choking'
                    value='full observation to prevent choking'
                  />
                {/* </Col> */}
                {/* <Col> */}
                  <Radio
                    label='physical assistance'
                    value='physical assistance'
                  />
                  <Radio
                    label='adaptive utensils used'
                    value='adaptive utensils used'
                  />
                {/* </Col> */}
              {/* </Row> */}
            </RadioGroup>
            <Row>
              <Col>
                <p style={{ textAlign: "end" }}>
                  # of intervention needed per meal =
                </p>
              </Col>
              <Col>
                <InputGroup />
              </Col>
            </Row>
          </div>
          <div>
            <p>
              <strong>3. Incontinent of Bowel or Bladder.</strong>
            </p>
            <RadioGroup
              onChange={handleRadioChange}
              selectedValue=''
            >
              <Row>
                <Col>
                  <Radio
                    label='client goes independently but requires scheduled toileting to avoid accidents'
                    value='client goes independently but requires scheduled toileting to avoid accidents'
                  />
                  <Radio
                    label='requires full staff assistance to properly clean them self'
                    value='requires full staff assistance to properly clean them self'
                  />
                </Col>
                <Col>
                  <Radio
                    label='physical assistance'
                    value='physical assistance'
                  />
                  <Radio
                    label='Full care for all daily living activities'
                    value='Full care for all daily living activities'
                  />
                </Col>
              </Row>
            </RadioGroup>
            <Row>
              <Col>
                <p style={{ textAlign: "end" }}>
                  How many times a day does this area require staff assistance =
                </p>
              </Col>
              <Col>
                <InputGroup />
              </Col>
            </Row>
          </div>
          <div>
            <p>
              <strong>4. Walking independently</strong>
            </p>
            <RadioGroup
              onChange={handleRadioChange}
              selectedValue=''
            >
              <Row>
                <Col>
                  <Radio
                    label='walks fully independent'
                    value='walks fully independent'
                  />
                  <Radio
                    label='requires a wheelchair at all times'
                    value='requires a wheelchair at all times'
                  />
                </Col>
                <Col>
                  <Radio label='uses a walker' value='uses a walker' />
                  <Radio
                    label='uses a wheelchair for long distances or if standing for a certain period'
                    value='uses a wheelchair for long distances or if standing for a certain period'
                  />
                </Col>
              </Row>
            </RadioGroup>
          </div>
          <div>
            <p>
              <strong>
                5. Requires assistance to change position in bed or elsewhere.
              </strong>
            </p>
            <RadioGroup
              onChange={handleRadioChange}
              selectedValue=''
            >
              <Row>
                <Col>
                  <Radio
                    label='fully rely on staff to change position'
                    value='fully rely on staff to change position'
                  />
                  <Radio
                    label='client does not sleep throughout the night and requires staff assistance to ensure health and safety'
                    value='client does not sleep throughout the night and requires staff assistance to ensure health and safety'
                  />
                </Col>
                <Col>
                  <Radio
                    label='sleeps independently without assistance'
                    value='sleeps independently without assistance'
                  />
                </Col>
              </Row>
            </RadioGroup>
            <Row>
              <Col>
                <p style={{ textAlign: "end" }}>
                  How many times a day is assistance needed to change positions
                  including while sleeping =
                </p>
              </Col>
              <Col>
                <InputGroup />
              </Col>
            </Row>
            <Row>
              <Col>
                <p style={{ textAlign: "end" }}>
                  How many hours a night does the client sleep =
                </p>
              </Col>
              <Col>
                <InputGroup />
              </Col>
            </Row>
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
              Submit
            </AnchorButton>
          </div>
        </div>
      </>
    </Dialog>
  );
};

export default LevelsOfService;

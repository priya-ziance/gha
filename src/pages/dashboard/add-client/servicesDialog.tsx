import { useEffect, useState } from "react";
import { Classes, Checkbox, RadioGroup, Radio } from "@blueprintjs/core";
import get from 'lodash/get';
import { Tooltip2 } from "@blueprintjs/popover2";

import {
  Dialog,
} from "../../../components";

import { IDialog } from './types';


interface ServicesProps {
  services: any;
  handleServicesChange: (values: any) => void
}

const Services = (props: IDialog & ServicesProps) => {
  const { isOpen, handleClose, services, handleServicesChange } = props;
  const [localServices, setLocalServices] = useState<any>({})

  useEffect(() => {
    if (services) {
      setLocalServices(services)
    }
  }, [services])

  useEffect(() => {
    if (localServices && Object.keys(localServices).length) {
      handleServicesChange(localServices)
    }
  }, [localServices])

  const updateServices = (key: string, value: any) => {
    setLocalServices((_services: any) => {
      // delete _services[key];
      return {
        ..._services,
        [key]: value
      }
    })
  }

  const handleRequiredRadioChange = (e: any) => {
    updateServices('required_log_type', e.target.value)
  }

  const handleCheckbox = (key: string) => (e: any) => {
    if (localServices[key]) {
      updateServices(key, false)
    } else {
      updateServices(key, true)
    }
  }

  return (
    <Dialog
      icon='info-sign'
      onClose={handleClose}
      title='Services'
      isOpen={isOpen}
    >
      <>
        <div className={`${Classes.DIALOG_BODY} add-client__levelsOfService`}>
          <div>
            <p>
              <strong>
                Please select a required log type
              </strong>
            </p>
            <RadioGroup
              onChange={handleRequiredRadioChange}
              selectedValue={get(localServices, 'required_log_type')}
            >
              <Radio
                label='Reshab'
                value='reshab'
              />
              <Radio
                label='Respite'
                value='respite'
              />
              <Radio
                label='Personal Support'
                value='personalsupport'
              />
            </RadioGroup>
          </div>
          <div>
            <p>
              <strong>
                Extra options
              </strong>
            </p>
            <Checkbox
              label='Life Skills Logs'
              checked={get(localServices, 'life_skill')}
              onChange={handleCheckbox('life_skill')}
            />
            <Checkbox
              label='Reshab/Respite/Personal Logs Auto Insert'
              checked={get(localServices, 'required_log_type_auto_insert')}
              onChange={handleCheckbox('required_log_type_auto_insert')}
            />
            <Checkbox
              label='Life Skills Auto Insert'
              checked={get(localServices, 'life_skill_auto_insert')}
              onChange={handleCheckbox('life_skill_auto_insert')}
            />
          </div>
        </div>
      </>
    </Dialog>
  );
};

export default Services;

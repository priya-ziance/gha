import { Switch, SwitchProps as _SwitchProps } from '@blueprintjs/core';

const CustomSwitch = (props: _SwitchProps) => {
  return (
    <Switch {...props} />
  )
}

export default CustomSwitch;

export type SwitchProps = _SwitchProps;
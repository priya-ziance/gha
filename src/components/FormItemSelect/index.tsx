import { Intent, MenuItem } from '@blueprintjs/core';
import { Select, IItemRendererProps } from '@blueprintjs/select';

import { Button, FormGroup } from '..';

interface FormItemSelectProps {
  buttonText: string;
  intent?: 'primary';
  items: any[],
  label?: string,
  menuRenderer: (item: any) => string,
  onFormSelectChange: (item: any) => void
  required?: boolean
}

const FormItemSelect = (props: FormItemSelectProps) => {
  const { buttonText, items, label, menuRenderer, onFormSelectChange, required } = props;

  const formSelectItemRenderer = (item: any, props: IItemRendererProps) => {
    return (
      <MenuItem
          text={menuRenderer(item)}
          // active={active}
          onClick={props.handleClick}
          shouldDismissPopover={false}
      />
    )
  }

  const FormSelect = Select.ofType<any>();

  return (
    <FormGroup
      intent={Intent.PRIMARY}
      label={label}
      labelFor="text-input"
      labelInfo={required ? "(required)" : ''}
    >
      <FormSelect
          items={items}
          filterable={false}
          itemRenderer={formSelectItemRenderer}
          noResults={<MenuItem disabled={true} text="No results." />}
          onItemSelect={onFormSelectChange}
      >
          {/* children become the popover target; render value here */}
          <Button text={buttonText} rightIcon="double-caret-vertical" />
      </FormSelect>
    </FormGroup>
  )
}

export default FormItemSelect;

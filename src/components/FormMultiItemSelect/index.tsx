import { Intent, MenuItem } from '@blueprintjs/core';
import { MultiSelect, IItemRendererProps } from '@blueprintjs/select';
import { ChangeEvent } from 'react';

import { FormGroup } from '..';

interface IFormSelectProps {
  tagRenderer: (item: any) => string | undefined;
  items: any[];
  onItemSelect: (e: any | ChangeEvent) => void;
  onRemove?: (value: any, index: number) => void;
  onQueryChange?: (q: string) => void;
  selectedItems?: any[];
}

interface FormMultiItemSelectProps {
  intent?: 'primary';
  label?: string,
  menuRenderer: (item: any) => string | JSX.Element,
  required?: boolean,
  formSelectProps: IFormSelectProps
}

function FormMultiItemSelect(props: FormMultiItemSelectProps) {
  const { label, menuRenderer, required, formSelectProps } = props;

  const formSelectItemRenderer = (item: any, props: IItemRendererProps) => {
    return (
      <MenuItem
          text={menuRenderer(item)}
          onClick={props.handleClick}
          shouldDismissPopover={false}
      />
    )
  }

  const FormSelect = MultiSelect.ofType<any>();

  return (
    <FormGroup
      intent={Intent.PRIMARY}
      label={label}
      labelFor="text-input"
      labelInfo={required ? "(required)" : ''}
    >
      <FormSelect
          itemRenderer={formSelectItemRenderer}
          noResults={<MenuItem disabled={true} text="No results." />}
          {...formSelectProps}
      />
    </FormGroup>
  )
}

export default FormMultiItemSelect;

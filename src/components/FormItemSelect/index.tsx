import { Intent, Menu, MenuItem } from '@blueprintjs/core';
import { Select2, ItemListRendererProps } from '@blueprintjs/select';

import { Button, FormGroup } from '..';

interface FormItemSelectProps {
  buttonText: string;
  defaultButtonText?: string;
  intent?: 'primary';
  items: any[],
  label?: string,
  menuRenderer: (item: any) => string,
  onFormSelectChange: (item: any) => void
  required?: boolean,
  disabled?: boolean
}

const FormItemSelect = (props: FormItemSelectProps) => {
  const { buttonText, defaultButtonText, disabled, items, label, menuRenderer, onFormSelectChange, required } = props;

  const listRenderer =  (props: ItemListRendererProps<string>) => {
    const { items, renderItem, menuProps } = props;

    const renderedItems = items.map(renderItem).filter(item => item != null);
    return (
        <Menu
          role="listbox"
          style={{
            marginTop: -20,
            marginLeft: -10
          }}
          {...menuProps}
        >
            <div
              style={{
                maxHeight: 300,
                overflow: "scroll",
                border: "1px solid rgba(0,0,0,0.1)"
              }}
            >
              {renderedItems}
            </div>
        </Menu>
    );
  };

  const formSelectItemRenderer = (item: any, props: any) => {
    return (
      <MenuItem
          text={menuRenderer(item)}
          // active={active}
          onClick={props.handleClick}
          shouldDismissPopover={false}
      />
    )
  }

  return (
    <FormGroup
      intent={Intent.PRIMARY}
      label={label}
      labelFor="text-input"
      labelInfo={required ? "(required)" : ''}
    >
      <Select2
          items={items}
          filterable={false}
          itemRenderer={formSelectItemRenderer}
          noResults={<MenuItem disabled={true} text="No results." />}
          onItemSelect={onFormSelectChange}
          itemListRenderer={listRenderer}
          disabled={disabled}
      >
          {/* children become the popover target; render value here */}
          <Button text={buttonText || defaultButtonText} rightIcon="double-caret-vertical" />
      </Select2>
    </FormGroup>
  )
}

FormItemSelect.defaultProps = {
  defaultButtonText: 'Please Select One'
}

export default FormItemSelect;

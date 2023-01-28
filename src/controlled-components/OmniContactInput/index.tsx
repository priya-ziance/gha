import { MenuItem } from '@blueprintjs/core';
import { ItemPredicate, ItemRendererProps, Omnibar } from "@blueprintjs/select";
import useSWR from 'swr';

import { IClientContactModel } from '../../types';
import api from '../../api';
import { highlightText } from '../../utils/text';

import './index.scss'


interface OmniContactsInputProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSelect?: (medicalContact: IClientContactModel) => void;
}


const OmniContactsInput = (props: OmniContactsInputProps) => {
  const { data } = useSWR<IClientContactModel[]>(
    "/api/clientContacts/medicalcontacts/input",
    () => api.clientContacts.getMedicalClientContacts()
  )
  const { isOpen, onClose, onSelect } = props;

  const handleItemChange = (medicalContact: IClientContactModel) => {
    if (onSelect) {
      onSelect(medicalContact);
    }
  }

  const itemRenderer = (item: IClientContactModel, props: ItemRendererProps) => {
    const { handleClick, handleFocus, modifiers, query } = props;

    return (
      <MenuItem
        text={highlightText(item.name || "", query)}
        onClick={handleClick}
        onFocus={handleFocus}
        active={modifiers.active}
        disabled={modifiers.disabled}
      />
    )
  }

  const filterContact: ItemPredicate<IClientContactModel> = (query, medicalContact, _index, exactMatch) => {
    const normalizedTitle = medicalContact.name?.toLowerCase();
    const normalizedQuery = query.toLowerCase();

     if (exactMatch) {
        return normalizedTitle === normalizedQuery;
    } else {
        return normalizedTitle ? normalizedTitle.indexOf(normalizedQuery) >= 0 : false;
    }
  };

  return (
    <Omnibar
      isOpen={isOpen || false}
      itemPredicate={filterContact}
      itemRenderer={itemRenderer}
      items={data || []}
      noResults={<MenuItem disabled={true} text="No results." />}
      onClose={onClose}
      onItemSelect={handleItemChange}
      resetOnSelect
    />
  )
}

export default OmniContactsInput;
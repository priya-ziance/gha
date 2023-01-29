/**
 * This component allows you select a medical contact
 * that belongs to a client
 */
import { useMemo } from 'react';
import { Button, MenuItem } from '@blueprintjs/core';
import { ItemPredicate, ItemRendererProps, Select2 } from "@blueprintjs/select";
import useSWR from 'swr';

import { IClientContactModel } from '../../types';
import api from '../../api';
import { highlightText } from '../../utils/text';


interface MedicalContactSelectProps {
  onSelect?: (medicalContact: IClientContactModel) => void;
  selectedMedicalContactId?: string;
  contactTypes?: string[];
  excludedTypes?: string[];
}


const MedicalContactSelect = (props: MedicalContactSelectProps) => {
  const { contactTypes, excludedTypes, onSelect, selectedMedicalContactId } = props;
  const { data } = useSWR<IClientContactModel[]>(
    `/api/clientContacts/medicalcontacts/input/${contactTypes ? JSON.stringify(contactTypes) : ''}`,
    () => api.clientContacts.getMedicalClientContacts()
  )

  const memoDocs = useMemo(() => {
    let objs = {};

    if (data) {
      let _data = data.filter(contact => {
        
        // Filter out medical contacts that don't have their type
        // in the list of allowed types
        if (contactTypes) {
          return  contactTypes.includes(contact.contactType || "")
        }

        return true;
      });

      _data = _data.filter(contact => {
        
        // Filter out medical contacts that are meant to be excluded
        if (excludedTypes) {
          return !excludedTypes.includes(contact.contactType || "")
        }

        return true;
      });

      objs = Object.assign({}, ..._data.map(doc => ({
        [doc.id]: doc
      })));
    }

    return objs;
  }, [data, contactTypes, excludedTypes]) as { [val: string]: IClientContactModel }

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
    <Select2<IClientContactModel>
        items={Object.values(memoDocs) || []}
        itemRenderer={itemRenderer}
        noResults={<MenuItem disabled={true} text="No results." roleStructure="listoption" />}
        onItemSelect={handleItemChange}
        itemPredicate={filterContact}
    >
        <Button
          text={
            selectedMedicalContactId && memoDocs[selectedMedicalContactId] ? 
            memoDocs[selectedMedicalContactId].name : 
            "No contacts found"
          }
          rightIcon="double-caret-vertical"
          placeholder="Select a film"
        />
    </Select2>
  )
}

export default MedicalContactSelect;


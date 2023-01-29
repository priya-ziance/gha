import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { InputGroup, InputGroupProps, Menu, MenuItem, Spinner } from "@blueprintjs/core";

import { GOOGLE_API_KEY } from '../../utils/config';
import { useState } from "react";


export type AutocompletResult = {
  address: string;
}

export type AutocompleteInputProps = {
  onSelect: (props: AutocompletResult) => void,
  defaultAddress?: string;
}

const AutocompleteInput = (props: AutocompleteInputProps & InputGroupProps) => {
  const [value, setValue] = useState("");
  const { onSelect, defaultAddress, ...otherProps } = props;
  const {
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = useGoogle({
    apiKey: GOOGLE_API_KEY,
    options: {
      types: ["street_address"]
    },
  });

  return (
    <div>
      <InputGroup
        type="text"
        defaultValue={defaultAddress}
        {...otherProps}
        value={value}
        onChange={(evt) => {
          getPlacePredictions({ input: evt.target.value });
          setValue(evt.target.value);
        }}
        rightElement={isPlacePredictionsLoading ? <Spinner size={20} /> : undefined}
      />
      {!isPlacePredictionsLoading && !!placePredictions.length &&
        <Menu className="absolute z-30 border shadow-md">
          {placePredictions.map(place => {
            return (
              <MenuItem
                key={place.description}
                text={place.description}
                onClick={() => { 
                  onSelect({
                    address: place.description,
                  })
                  setValue(place.description)

                  // This is to clear the predictions
                  getPlacePredictions({ input: "" })
                }}
              />
            )
          })}
        </Menu>
      }
    </div>
  )
};

export default AutocompleteInput;
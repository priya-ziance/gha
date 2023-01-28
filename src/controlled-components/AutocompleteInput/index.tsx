import { usePlacesWidget } from "react-google-autocomplete";
import { InputGroup, InputGroupProps } from "@blueprintjs/core";

import { GOOGLE_API_KEY } from '../../utils/config';


export type AutocompletResult = {
  address: string;
  city: string;
  country: string;
  coord?: number[]
}

export type AutocompleteInputProps = {
  onSelect: (props: AutocompletResult) => void,
  defaultAddress?: string;
}

const normalizePlaceResult = (result: any) => {
  let country = ''
  let city = ''
  let coord = [
    result.geometry.location.lat(),
    result.geometry.location.lng()
  ]
  let address = result.formatted_address

  const addressComponents = result.address_components || [];
  
  addressComponents.forEach((comp: any) => {
    const types = comp.types;

    if (types.includes('country')) {
      country = comp.long_name
    } else if (types.includes('locality')) {
      city = comp.long_name
    }
  });

  return {
    country,
    city,
    coord,
    address
  }
}

const AutocompleteInput = (props: AutocompleteInputProps & InputGroupProps) => {
  const { onSelect, defaultAddress, ...otherProps } = props;
  const { ref } = usePlacesWidget<InputGroup>({
    apiKey: GOOGLE_API_KEY,
    onPlaceSelected: (place) => {
      const normRes = normalizePlaceResult(place)

      onSelect({
        address: normRes.address,
        city: normRes.city,
        country: normRes.country,
        coord: normRes.coord
      })
    },
    options: {
      types: ["street_address"],
    },
  });

  return (
    <InputGroup type="text" ref={ref} {...otherProps}/>
  )
};

export default AutocompleteInput;
import { useContext } from "react";

import LocationContext from "../contexts/location";
import { NoLocation } from "../components";


/**
 * This will get paths from the URL and pass them in as props.
 * @param options 
 * @returns 
 */

const withLocation = () => (Component: any) => (props: any) => {
  const { id: selectedLocationId } = useContext(LocationContext)

  console.log(selectedLocationId)
  if (!selectedLocationId) {
    return (
      <NoLocation />
    )
  }

  return (
    <Component {...props} />
  )
}

export default withLocation;

import { useContext, useEffect, useState } from "react";
import { Spinner } from "@blueprintjs/core";
import api from "../../../api";
import withPathId from "../../../hoc/withPathId";
import { IRelocateModel } from "../../../types";
import ClientContext from "../../../contexts/client";
import AddRelocatePage from "../add-relocate-transfer";

interface relocatePathType {
  relocateId: string;
}

const EditRelocate = (props: relocatePathType) => {
  const [loading, setLoading] = useState(true);
  const [relocate, setRelocate] = useState< IRelocateModel | undefined>(undefined);
  const { id: clientId } = useContext(ClientContext);

  const { relocateId } = props;
 
  console.log("relocateId",props)
  
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const fetchedStaffWitness =
          await api.Relocate.getRelocateyId(relocateId);
          setRelocate(fetchedStaffWitness);
          console.log("resssss",relocate);
          
      } catch (e: any) {
        console.log(e);
      }
      setLoading(false);
    })();
  }, [clientId, relocateId]);

  if (loading) {
    return <Spinner />;
  }

  return <AddRelocatePage relocate={relocate} update />;
};

export default withPathId({ pathSlugs: ["relocateId"] })(
  EditRelocate
);

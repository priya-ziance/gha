import { useContext, useEffect, useState } from "react";
import { Spinner } from "@blueprintjs/core";
import api from "../../../api";
import withPathId from "../../../hoc/withPathId";
import AddClientWitness from "../add-client-witness";
import { IClientWithnessModel } from "../../../types";
import ClientContext from "../../../contexts/client";

interface ClientWitnessPathType {
  clientWitnessId: string;
}

const ClientWitnessInfo = (props: ClientWitnessPathType) => {
  const [loading, setLoading] = useState(true);
  const [clientWitness, setClientWitness] = useState<
    IClientWithnessModel | undefined
  >(undefined);
  const { id: clientId } = useContext(ClientContext);
  const { clientWitnessId } = props;
  
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const fetchedClientWitness =
          await api.clientWitness.getClientWitnessById(clientWitnessId);
        setClientWitness(fetchedClientWitness);
      } catch (e: any) {
        console.log(e);
      }
      setLoading(false);
    })();
  }, [clientId, clientWitnessId]);

  if (loading) {
    return <Spinner />;
  }

  return <AddClientWitness clientWitness={clientWitness} update />;
};

export default withPathId({ pathSlugs: ["clientWitnessId"] })(
  ClientWitnessInfo
);

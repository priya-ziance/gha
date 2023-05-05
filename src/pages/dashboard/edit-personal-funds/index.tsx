import { useContext, useEffect, useState } from "react";
import { Spinner } from "@blueprintjs/core";
import api from "../../../api";
import withPathId from "../../../hoc/withPathId";
import { IPersonalFundsModel } from "../../../types";
import ClientContext from "../../../contexts/client";
import AddPersonalFundsPage from "../add-personal-funds"

interface PersonalFundsPathType {
  PersonalFundsId: string;
}

const EditPersonalFunds = (props: PersonalFundsPathType) => {
  const [loading, setLoading] = useState(true);
  const [addPersonalFunds, setaddPersonalFunds] = useState<
  IPersonalFundsModel | undefined
  >(undefined);
  const { id: clientId } = useContext(ClientContext);

  const { PersonalFundsId } = props;
  console.log("presonal id ", PersonalFundsId);
  
    
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const fetchedPersonalFunds = await api.PersonalFunds.getPersonalFundById(PersonalFundsId);
          setaddPersonalFunds(fetchedPersonalFunds);
          console.log("add",fetchedPersonalFunds);
          
      } catch (e: any) {
        console.log(e);
      }
      setLoading(false);
    })();
  }, [clientId, PersonalFundsId]);

  if (loading) {
    return <Spinner />;
  }

  return <AddPersonalFundsPage addPersonalFunds={addPersonalFunds} update />;
};

export default withPathId({ pathSlugs: ["PersonalFundsId"] })(
  EditPersonalFunds
);

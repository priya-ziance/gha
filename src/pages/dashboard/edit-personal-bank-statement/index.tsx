import { useContext, useEffect, useState } from "react";
import { Spinner } from "@blueprintjs/core";
import api from "../../../api";
import withPathId from "../../../hoc/withPathId";
import {  IPersonalBankStatementModel } from "../../../types";
import ClientContext from "../../../contexts/client";
import AddTrainers from "../add-trainers";
import AddPersonalBankStatement from "../add-personal_bank_statement";

interface TrainersPathType {
  personalBankStatementId: string;
}

const EditPersonalBankStatement = (props: TrainersPathType) => {
  const [loading, setLoading] = useState(true);
  const [personalBankStatement, setPersonalBankStatement] = useState<
  IPersonalBankStatementModel | undefined
  >(undefined);
  const { id: clientId } = useContext(ClientContext);

  const { personalBankStatementId } = props;
    
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const fetchedAddTrainers = await api.personalBankStatement.getPersonalBankStatementId(personalBankStatementId);
          setPersonalBankStatement(fetchedAddTrainers);
          console.log("add",fetchedAddTrainers);
          
      } catch (e: any) {
        console.log(e);
      }
      setLoading(false);
    })();
  }, [clientId, personalBankStatementId]);

  if (loading) {
    return <Spinner />;
  }

  return <AddPersonalBankStatement PersonalBankStatement={personalBankStatement} update />;
};

export default withPathId({ pathSlugs: ["personalBankStatementId"] })(
  EditPersonalBankStatement
);

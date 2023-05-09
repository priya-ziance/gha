import { useContext, useEffect, useState } from "react";
import { Spinner } from "@blueprintjs/core";
import api from "../../../api";
import withPathId from "../../../hoc/withPathId";
import {  IMainBankStatementModel } from "../../../types";
import ClientContext from "../../../contexts/client";
import AddMainBankStatement from "../add-main-bank-statement";

interface IEditMainAccountProps {
  mainBankStatementId: string;
}

const EditPersonalBankStatement = (props: IEditMainAccountProps) => {
  const [loading, setLoading] = useState(true);
  const [mainBankStatement, setMainBankStatement] = useState<
  IMainBankStatementModel | undefined
  >(undefined);
  const { id: clientId } = useContext(ClientContext);
  const { mainBankStatementId } = props;
    
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const fetchedData = await api.mainAccount.getMainAccountById(mainBankStatementId);
          setMainBankStatement(fetchedData);          
      } catch (e: any) {
        console.log(e);
      }
      setLoading(false);
    })();
  }, [clientId, mainBankStatementId]);

  if (loading) {
    return <Spinner />;
  }

  return <AddMainBankStatement MainBankStatement={mainBankStatement} update />;
};

export default withPathId({ pathSlugs: ["mainBankStatementId"] })(
  EditPersonalBankStatement
);

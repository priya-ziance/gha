import { useContext, useEffect, useState } from 'react';

import { Spinner } from '@blueprintjs/core';

import AddBankStatement from '../add-bank-statement';

import api from '../../../api';

import ClientContext from '../../../contexts/client';

import IBankStatementModel from '../../../models/bankStatement';

import withPathId from '../../../hoc/withPathId';


interface BankStatementPathType {
  bankStatementId: string
}

const BankStatementInfo = (props: BankStatementPathType) => {
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState<IBankStatementModel | undefined>(undefined);
  const { id: clientId } = useContext(ClientContext);

  const { bankStatementId } = props;

  useEffect(() => {
    (async () => {
      setLoading(true);
      
      try {
        const fetchedBankStatement = await api.bankStatements.getBankStatement(bankStatementId, { params: { clientId } });

        setClient(fetchedBankStatement);
      } catch(e: any) {}

      setLoading(false);
    })()
  }, [clientId, bankStatementId]);

  if (loading) {
    return ( <Spinner /> )
  }

  return (
    <AddBankStatement bankStatement={client} update />
  );
};

export default withPathId({ pathSlugs:['bankStatementId'] })(BankStatementInfo);
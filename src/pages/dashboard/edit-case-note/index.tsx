import { useContext, useEffect, useState } from 'react';

import { Spinner } from '@blueprintjs/core';

import AddCaseNote from '../add-client-case-notes';

import api from '../../../api';

import ClientContext from '../../../contexts/client';

import ICaseNoteModel from '../../../models/caseNote';

import withPathId from '../../../hoc/withPathId';


interface CaseNotePathType {
  caseNoteId: string
}

const CaseNoteInfo = (props: CaseNotePathType) => {
  const [loading, setLoading] = useState(true);
  const [caseNote, setCaseNote] = useState<ICaseNoteModel | undefined>(undefined);
  const { id: clientId } = useContext(ClientContext);

  const { caseNoteId } = props;

  useEffect(() => {
    (async () => {
      setLoading(true);
      
      try {
        const fetchedCaseNote = await api.caseNotes.getCaseNote(caseNoteId, { clientId } );

        setCaseNote(fetchedCaseNote);
      } catch(e) {
        console.log(e)
      }

      setLoading(false);
    })()
  }, [clientId, caseNoteId]);

  if (loading) {
    return ( <Spinner /> )
  }

  return (
    <AddCaseNote caseNote={caseNote} update />
  );
};

export default withPathId({ pathSlugs:['caseNoteId'] })(CaseNoteInfo);
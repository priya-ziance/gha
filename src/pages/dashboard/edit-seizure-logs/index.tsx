import { useContext, useEffect, useState } from "react";
import { Spinner } from "@blueprintjs/core";
import api from "../../../api";
import withPathId from "../../../hoc/withPathId";
import { IStaffWithnessModel } from "../../../types";
import ClientContext from "../../../contexts/client";
import AddSeizureLogs from "../add-seozure-logs";

interface seizurelogPathType {
  seizurelogId: string;
}

const EditSeizureLogs = (props: seizurelogPathType) => {
  const [loading, setLoading] = useState(true);
  const [seizurelog, setSeizurelog] = useState<
    IStaffWithnessModel | undefined
  >(undefined);
  const { id: clientId } = useContext(ClientContext);

  const { seizurelogId } = props;
  
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const fetchedseizurelog =
          await api.logs.getLog(seizurelogId);
        setSeizurelog(fetchedseizurelog);
      } catch (e: any) {
        console.log(e);
      }
      setLoading(false);
    })();
  }, [clientId, seizurelogId]);

  if (loading) {
    return <Spinner />;
  }

  return <AddSeizureLogs
  //  seizurelog={seizurelog}
   update />;
};

export default withPathId({ pathSlugs: ["seizurelogId"] })(
  EditSeizureLogs
);

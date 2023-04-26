import { useContext, useEffect, useState } from "react";
import { Spinner } from "@blueprintjs/core";
import api from "../../../api";
import withPathId from "../../../hoc/withPathId";
import { ISeizureLogsModel } from "../../../types";
import ClientContext from "../../../contexts/client";
import AddSeizureLogs from "../add-seizure-logs";

interface seizurelogPathType {
  seizurelogId: string;
}

const EditSeizureLogs = (props: seizurelogPathType) => {
  const [loading, setLoading] = useState(true);
  const [seizureLog, setSeizureLog] = useState<ISeizureLogsModel | undefined>(undefined);
  const { id: clientId } = useContext(ClientContext);

  const { seizurelogId } = props;
  console.log("seizure id", props);
  console.log("staff id main add ,",props.seizurelogId);
  
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const fetchedSeizurelog =
         await api.seizureLogs.getSeizureLogsById(seizurelogId);
         setSeizureLog(fetchedSeizurelog);
 
      } catch (e: any) {
        console.log(e);
      }
      setLoading(false);
    })();
  }, [clientId, seizurelogId]);

  if (loading) {
    return <Spinner />;
  }

  return <AddSeizureLogs SeizureLogs={seizureLog} update />;
};

export default withPathId({ pathSlugs: ["seizurelogId"] })(
  EditSeizureLogs
);

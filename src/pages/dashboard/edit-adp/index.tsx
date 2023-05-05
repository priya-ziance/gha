import { useContext, useEffect, useState } from "react";
import { Spinner } from "@blueprintjs/core";
import api from "../../../api";
import withPathId from "../../../hoc/withPathId";
import { IAddAdpModel } from "../../../types";
import ClientContext from "../../../contexts/client";
import AddAdp from "../add-adp";

interface IEditAdpProps {
  adpId: string;
}

const EditAdpInfo = (props: IEditAdpProps) => {
  const [loading, setLoading] = useState(true);
  const [addAdp, setAddAdp] = useState<
  IAddAdpModel | undefined
  >(undefined);
  const { id: clientId } = useContext(ClientContext);

  const { adpId } = props;
    
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const fetchedAddAdp = await api.ADP.getAdpById(adpId);
          setAddAdp(fetchedAddAdp);
          
      } catch (e: any) {
        console.log(e);
      }
      setLoading(false);
    })();
  }, [clientId, adpId]);

  if (loading) {
    return <Spinner />;
  }

  return <AddAdp adp={addAdp} update />;
};

export default withPathId({ pathSlugs: ["adpId"] })(
  EditAdpInfo
);

import { useContext, useEffect, useState } from "react";
import { Spinner } from "@blueprintjs/core";
import api from "../../../api";
import withPathId from "../../../hoc/withPathId";
import { IDischargeModel } from "../../../types";
import ClientContext from "../../../contexts/client";
import AddDischarge from "../add-discharge";

interface IEditDischargeProps {
  dischargeId: string;
}

const EditDischarge = (props: IEditDischargeProps) => {
  const [loading, setLoading] = useState(true);
  const [addDischarge, setAddDischarge] = useState<IDischargeModel | undefined>(
    undefined
  );
  const { id: clientId } = useContext(ClientContext);

  const { dischargeId } = props;

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const fetchedDischarge = await api.Discharge.getDischargeId(
          dischargeId
        );
        setAddDischarge(fetchedDischarge);
      } catch (e: any) {
        console.log(e);
      }
      setLoading(false);
    })();
  }, [clientId, dischargeId]);

  if (loading) {
    return <Spinner />;
  }
  return <AddDischarge discharges={addDischarge} update />;
};

export default withPathId({ pathSlugs: ["dischargeId"] })(EditDischarge);

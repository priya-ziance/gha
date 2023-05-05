import { useContext, useEffect, useState } from "react";
import { Spinner } from "@blueprintjs/core";
import api from "../../../api";
import withPathId from "../../../hoc/withPathId";
import { IAddInventoryModel } from "../../../types";
import ClientContext from "../../../contexts/client";
import AddInventorys from "../add-inventorys";

interface TrainersPathType {
    inventoryId : string;
}

const EditInventorys = (props: TrainersPathType) => {
  const [loading, setLoading] = useState(true);
  const [addInventorys, setaddInventorys] = useState<
  IAddInventoryModel| undefined
  >(undefined);
  const { id: clientId } = useContext(ClientContext);

  const { inventoryId } = props;
    console.log("idddd invemt",inventoryId);
    
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const fetchAddInventorys= await api.Inventorys.getInventoryById(inventoryId);
        setaddInventorys(fetchAddInventorys)
          console.log("add",fetchAddInventorys);
          
      } catch (e: any) {
        console.log(e);
      }
      setLoading(false);
    })();
  }, [clientId,  inventoryId ]);

  if (loading) {
    return <Spinner />;
  }

  return <AddInventorys inventorys={addInventorys} update />;
};

export default withPathId({ pathSlugs: ["inventoryId"] })(
  EditInventorys
);

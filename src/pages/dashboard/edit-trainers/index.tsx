import { useContext, useEffect, useState } from "react";
import { Spinner } from "@blueprintjs/core";
import api from "../../../api";
import withPathId from "../../../hoc/withPathId";
import { IAddTrainerModel } from "../../../types";
import ClientContext from "../../../contexts/client";
import AddTrainers from "../add-trainers";

interface TrainersPathType {
  trainerId: string;
}

const TrainerInfo = (props: TrainersPathType) => {
  const [loading, setLoading] = useState(true);
  const [addTrainers, setaddTrainers] = useState<
  IAddTrainerModel | undefined
  >(undefined);
  const { id: clientId } = useContext(ClientContext);

  const { trainerId } = props;
    
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const fetchedAddTrainers = await api.Trainers.getTrainerById(trainerId);
          setaddTrainers(fetchedAddTrainers);
          console.log("add",fetchedAddTrainers);
          
      } catch (e: any) {
        console.log(e);
      }
      setLoading(false);
    })();
  }, [clientId, trainerId]);

  if (loading) {
    return <Spinner />;
  }

  return <AddTrainers trainers={addTrainers} update />;
};

export default withPathId({ pathSlugs: ["trainerId"] })(
  TrainerInfo
);

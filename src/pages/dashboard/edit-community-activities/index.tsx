import { useContext, useEffect, useState } from "react";
import { Spinner } from "@blueprintjs/core";
import api from "../../../api";
import withPathId from "../../../hoc/withPathId";
import { ICommunityActivitiesModel } from "../../../types";
import ClientContext from "../../../contexts/client";
import AddTrainers from "../add-trainers";
import AddCommunityActivities from "../add-community-activities";

interface TrainersPathType {
  trainerId: string;
}

const EditComunityActivities = (props: TrainersPathType) => {
  const [loading, setLoading] = useState(true);
  const [communityActivities, setCommunityActivities] = useState<
  ICommunityActivitiesModel | undefined
  >(undefined);
  const { id: clientId } = useContext(ClientContext);

  const { trainerId } = props;
    
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const fetchedAddTrainers = await api.Trainers.getTrainerById(trainerId);
          setCommunityActivities(fetchedAddTrainers);
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

  return <AddCommunityActivities communityActivities={communityActivities} update />;
};

export default withPathId({ pathSlugs: ["trainerId"] })(
  EditComunityActivities
);

// import { useContext, useEffect, useState } from "react";
// import { Spinner } from "@blueprintjs/core";
// import api from "../../../api";
// import withPathId from "../../../hoc/withPathId";
// import { ICommunityActivitiesModel } from "../../../types";
// import ClientContext from "../../../contexts/client";
// import AddTrainers from "../add-trainers";
// import AddCommunityActivities from "../add-community-activities";

// interface TrainersPathType {
//   communityActivityId: string;
// }

// const EditComunityActivities = (props: TrainersPathType) => {
//   const [loading, setLoading] = useState(true);
//   const [communityActivities, setCommunityActivities] = useState<
//   ICommunityActivitiesModel | undefined
//   >(undefined);
//   const { id: clientId } = useContext(ClientContext);


//   const { communityActivityId } = props;
//   console.log("props",props);
//   console.log("id",communityActivityId);
  
    
//   useEffect(() => {
//     (async () => {
//       setLoading(true);
//       try {
//         const fetchedAddTrainers = await api.CommunityActivities.getCommunityActivityById(communityActivityId);
//           setCommunityActivities(fetchedAddTrainers);
//           console.log("add",fetchedAddTrainers);
          
//       } catch (e: any) {
//         console.log(e);
//       }
//       setLoading(false);
//     })();
//   }, [clientId, communityActivityId]);

//   if (loading) {
//     return <Spinner />;
//   }

//   return <AddCommunityActivities communityActivities={communityActivities} update />;
// };

// export default withPathId({ pathSlugs: ["communityActivityId"] })(
//   EditComunityActivities
// );

import { useContext, useEffect, useState } from "react";
import { Spinner } from "@blueprintjs/core";
import api from "../../../api";
import withPathId from "../../../hoc/withPathId";
import { ICommunityActivitiesModel } from "../../../types";
import ClientContext from "../../../contexts/client";
import AddCommunityActivities from "../add-community-activities";

interface TrainersPathType {
  communityActivitiesId: string;
}

const EditComunityActivities = (props: TrainersPathType) => {
  const [loading, setLoading] = useState(true);
  const [communityActivities, setCommunityActivities] = useState<
  ICommunityActivitiesModel | undefined
  >(undefined);
  const { id: clientId } = useContext(ClientContext);

  const { communityActivitiesId } = props;
    
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await api.CommunityActivities.getCommunityActivityById(communityActivitiesId);
          setCommunityActivities(res);
          
      } catch (e: any) {
        console.log(e);
      }
      setLoading(false);
    })();
  }, [clientId, communityActivitiesId]);

  if (loading) {
    return <Spinner />;
  }

  return <AddCommunityActivities communityActivities={communityActivities} update />;
};

export default withPathId({ pathSlugs: ["communityActivitiesId"] })(
  EditComunityActivities
);

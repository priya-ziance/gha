import { useContext, useEffect, useState } from "react";
import { Spinner } from "@blueprintjs/core";
import api from "../../../api";
import withPathId from "../../../hoc/withPathId";
import AddStaffWitness from "../add-staff-witness";
import { IStaffWithnessModel } from "../../../types";
import ClientContext from "../../../contexts/client";

interface StaffWitnessPathType {
  staffWitnessId: string;
}

const StaffWitnessInfo = (props: StaffWitnessPathType) => {
  const [loading, setLoading] = useState(true);
  const [staffWitness, setStaffWitness] = useState< IStaffWithnessModel | undefined>(undefined);
  const { id: clientId } = useContext(ClientContext);

  const { staffWitnessId } = props;
 
  console.log("staffWitnessId",staffWitnessId    );
  
  
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const fetchedStaffWitness =
          await api.staffWitness.getStaffWitnessById(staffWitnessId);
        setStaffWitness(fetchedStaffWitness);
      } catch (e: any) {
        console.log(e);
      }
      setLoading(false);
    })();
  }, [clientId, staffWitnessId]);

  if (loading) {
    return <Spinner />;
  }

  return <AddStaffWitness staffWitness={staffWitness} update />;
};

export default withPathId({ pathSlugs: ["staffWitnessId"] })(
  StaffWitnessInfo
);

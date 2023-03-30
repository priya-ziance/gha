import { useEffect, useState } from "react";
import { Spinner } from "@blueprintjs/core";
import api from "../../api";
import { IStaffWithnessModel } from "../../types";
import withPathId from "../../hoc/withPathId";
import AddStaffWitness from "../../pages/add-staff-witness";

interface StaffWitnessPathType {
  staffWitnessId: string;
}

const StaffWitnessInfo = (props: StaffWitnessPathType) => {
  const [loading, setLoading] = useState(true);
  const [staffWitness, setStaffWitness] = useState<
    IStaffWithnessModel | undefined
  >(undefined);
  const clientId = "h9YwkW4gyE";

  // const { staffWitnessId } = props;
  const staffWitnessId = "tidJnPBFd";
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

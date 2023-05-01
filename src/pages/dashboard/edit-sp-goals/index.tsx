import { useContext, useEffect, useState } from "react";
import { Spinner } from "@blueprintjs/core";
import api from "../../../api";
import withPathId from "../../../hoc/withPathId";
import AddSpGoals from "../add-sp-goals"
import { ISpGoalModel } from "../../../types";
import ClientContext from "../../../contexts/client";

interface SpGoalsPathType {
  spGoalId: string;
}

const EditSpGoals = (props: SpGoalsPathType) => {
  const [loading, setLoading] = useState(false);
  const [spGoal, setSpGoal] = useState<ISpGoalModel | undefined>(undefined);
  const { id: clientId } = useContext(ClientContext);

  const { spGoalId } = props;
console.log(" SP goal id",spGoalId);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const fetchedStaffWitness =
          await api.spGoals.getSpGoal(spGoalId, clientId);
        // setSpGoal(fetchedStaffWitness);

      } 
      catch (e: any) {
        // console.log(e);
      }
      setLoading(false);
    })();
  }, [clientId,spGoalId]);

  if (loading) {
    return <Spinner />;
  }

  return <AddSpGoals spGoal={spGoal} update />;
};


export default withPathId({ pathSlugs: ["spGoalId"] })(
  EditSpGoals
);

// import { useContext, useEffect, useState } from "react";
// import { Spinner } from "@blueprintjs/core";
// import api from "../../../api";
// import withPathId from "../../../hoc/withPathId";
// import { IPersonalFundsModel } from "../../../types";
// import ClientContext from "../../../contexts/client";
// import AddPersonalFundsPage from "../add-personal-funds"

// interface PersonalFundsPathType {
//   personalFundsId: string;
// }

// const EditPersonalFunds = (props: PersonalFundsPathType) => {
//   const [loading, setLoading] = useState(true);
//   const [addPersonalFunds, setaddPersonalFunds] = useState<
//   IPersonalFundsModel | undefined
//   >(undefined);
//   const { id: clientId } = useContext(ClientContext);

//   const { personalFundsId } = props;
//   console.log("presonal id ", personalFundsId);
  
    
//   useEffect(() => {
//     (async () => {
//       setLoading(true);
//       try {
//           const fetchedPersonalFunds = await api.PersonalFunds.getPersonalFundById(personalFundsId);
//           setaddPersonalFunds(fetchedPersonalFunds);
//           console.log("add",fetchedPersonalFunds);
          
//       } catch (e: any) {
//         console.log(e);
//       }
//       setLoading(false);
//     })();
//   }, [clientId, personalFundsId]);

//   if (loading) {
//     return <Spinner />;
//   }

//   return <AddPersonalFundsPage addPersonalFunds={addPersonalFunds} update />;
// };

// export default withPathId({ pathSlugs: ["personalFundsId"] })(
//   EditPersonalFunds
// );
import { useContext, useEffect, useState } from "react";
import { Spinner } from "@blueprintjs/core";
import api from "../../../api";
import withPathId from "../../../hoc/withPathId";
import { IPersonalFundsModel } from "../../../types";
import ClientContext from "../../../contexts/client";
import AddPersonalFundsPage from "../add-personal-funds";

interface PersonalFundsPathType {
  personalFundId: string;
}

const EditPersonalFunds = (props: PersonalFundsPathType) => {
  const [loading, setLoading] = useState(true);
  const [addPersonalFunds, setaddPersonalFunds] = useState<
    IPersonalFundsModel | undefined
  >(undefined);
  const { id: clientId } = useContext(ClientContext);

  const { personalFundId } = props;

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const fetchedPersonalFunds =
          await api.PersonalFunds.getPersonalFundById(personalFundId);
        setaddPersonalFunds(fetchedPersonalFunds);
      } catch (e: any) {
        console.log(e);
      }
      setLoading(false);
    })();
  }, [clientId, personalFundId]);

  if (loading) {
    return <Spinner />;
  }

  return <AddPersonalFundsPage addPersonalFunds={addPersonalFunds} update />;
};

export default withPathId({ pathSlugs: ["personalFundId"] })(EditPersonalFunds);

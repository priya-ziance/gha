// import { Classes,Icon,Intent } from "@blueprintjs/core";
// import { Col, Dialog, FormMultiItemSelect, Table } from "../../../components";
// import { IDialog } from "./types";
// import { useContext, useEffect, useState } from "react";
// import { IStaffWithnessModel } from "../../../types";
// import ClientContext from "../../../contexts/client";
// import api from "../../../api";
// import * as helpers from "../../../utils/helpers";
// import { nameColumn } from "../staff-witness/helpers";
// import { Formik } from "formik";
// import formikWrapper from "../../../wrappers/formik";
// import { Row } from "reactstrap";
// import { FIELDS } from "./constants";

// const PAGE_SIZE = 10;

// const BehaviourDialog = (props: IDialog) => {
//   const { isOpen, handleClose } = props;
//   const [staffWitness, setStaffWitness] = useState<IStaffWithnessModel[] | []>(
//     []
//   );
//   const [staffWitnessActual, setStaffWitnessActual] = useState<
//     IStaffWithnessModel[] | []
//   >([]);
//   const [selectedUsers, setSelectedUsers] = useState<any>({})

//   const [page, setPage] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const { id: clientId } = useContext(ClientContext);

//   const hasNextPage = staffWitness.length === PAGE_SIZE;
//   const hasPrevPage = page > 0;

//   useEffect(() => {
//     (async () => {
//       setLoading(true);

//       try {
//         const results = await api.staffWitness.getStaffWitness(clientId, {
//           page,
//           pageSize: PAGE_SIZE,
//         });
//         setStaffWitness(results);
//         setStaffWitnessActual(results);
//       } catch (e: any) {}

//       setTimeout(() => {
//         setLoading(false);
//       }, 200);
//     })();
//   }, [clientId, page]);

//   const onNextPage = () => {
//     if (hasNextPage) {
//       setPage((page) => page + 1);
//     }
//   };

//   const onPrevPage = () => {
//     if (hasPrevPage) {
//       setPage((page) => page - 1);
//     }
//   };

//   const initialValues = {
//     search: "",
//   };
//   const menuRenderer = (item: any) => {
//     if (selectedUsers[item.id]) {
//       return (
//         <span>
//           <Icon icon={'tick'} />
//           {' '}
//           {item.firstName}
//         </span>
//       )
//     }
//     return item.firstName
//   }
//   return (
//     <Dialog
//       icon="info-sign"
//       onClose={handleClose}
//       title="Behaviour"
//       isOpen={isOpen}
//     >
//       <>
//         <div className={`${Classes.DIALOG_BODY} add-client__levelsOfService`}>
//           <div className="gha__users-input">
//             <Formik
//               initialValues={initialValues}
//               onSubmit={async (values, { setSubmitting }) => {
//                 if (values.search) {
//                   const filteredstaffWitness = [...staffWitnessActual].filter(
//                     (item) => {
//                       return (
//                         item?.firstName
//                           ?.toLowerCase()
//                           .includes(values.search.toLowerCase()) ||
//                         item?.lastName
//                           ?.toLowerCase()
//                           .includes(values.search.toLowerCase())
//                       );
//                     }
//                   );
//                   setStaffWitness(filteredstaffWitness);
//                 } else {
//                   setStaffWitness(staffWitnessActual);
//                 }
//               }}
//             >
//               {formikWrapper(
//                 ({
//                   wrapperProps: { getInputFormGroup },
//                   formikProps: { handleSubmit },
//                 }) => {
//                   return (
//                     <form onChange={handleSubmit}>
//                       <Row>
//                         <Col xs={12} md={6}>
//                         <FormMultiItemSelect
//                           intent={Intent.PRIMARY}
//                           label={'Select Users'}
//                           menuRenderer={menuRenderer}
//                           formSelectProps={{
//                             tagRenderer,
//                             items: trainer,
//                             onItemSelect: handleItemChange,
//                             selectedItems: Object.keys(selectedUsers),
//                             onRemove: onRemoveUser,
//                             onQueryChange: onUserQueryChange
//                           }}
//                         />                    
//                             </Col>
//                       </Row>
//                     </form>
//                   );
//                 },
//                 FIELDS
//               )}
//             </Formik>
//           </div>

//           <Table
//             loading={loading}
//             numRows={staffWitness.length}
//             getCellClipboardData={(row: any, col: any) => {
//               console.log("click");
              
//               return staffWitness[row];
//             }}
//             columns={[
//               {
//                 title: "Name",
//                 cellRenderer: nameColumn,
//                 width: helpers.getTableWith(0.5),
//               },
//             ]}
//             data={staffWitness}
//             enableRowHeader={false}
//             hasNextPage={hasNextPage}
//             hasPrevPage={hasPrevPage}
//             onNextPage={onNextPage}
//             onPrevPage={onPrevPage}
//             page={page}
//             emptyTableMessage="No Behaviour Found"
//           />
//         </div>
//       </>
//     </Dialog>
//   );
// };

// export default BehaviourDialog;

import { Classes, Icon, Intent } from "@blueprintjs/core";
import { IDialog } from "./types";
import { IAddTrainerModel, IBehaviourModel, IUserModel } from "../../../types";
import { Col, Dialog, FormMultiItemSelect, Table } from "../../../components";
import TrainersUsersInput from "../../../controlled-components/TrainerUserinput";
import { Formik } from "formik";
import api from "../../../api";
import { useContext, useEffect, useMemo, useState } from "react";
import ClientContext from "../../../contexts/client";
import formikWrapper from "../../../wrappers/formik";
import { Row } from "reactstrap";
import * as helpers from "../../../utils/helpers";
import { FIELDS } from "./constants";
import { nameColumn } from "../trainer/helpers";
import { debounce } from "lodash";

interface BehaviourProps {
  behaviour: IBehaviourModel[];
  handleBehaviourChange: (values: { [key: string]: IUserModel }) => void
}
const PAGE_SIZE = 10;
const BehaviourDialog = (props: IDialog & BehaviourProps) => {
  const { isOpen, handleClose, behaviour, handleBehaviourChange } = props;
  // const { isOpen, handleClose } = props;

  const [behaviours, setBehaviours] = useState<IBehaviourModel[] | []>([]);
  const [trainerActual, setTrainerActual] = useState<IBehaviourModel[] | []>([]);
  const [userQuery, setUserQuery] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<any>({})
  const [userResults, setUserResults] = useState<IUserModel[] | []>([])
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);

  const hasNextPage = behaviours.length === PAGE_SIZE;
  const hasPrevPage = page > 0;
  console.log("behaviour id ",props);
  
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const results = await api.behaviours.getBehaviours(clientId, {
          page,
          pageSize: PAGE_SIZE,
        });        
        setBehaviours(results);
        setTrainerActual(results);
      } catch (e: any) { }

      setTimeout(() => {
        setLoading(false);
      }, 200);
    })();
  }, [clientId, page]);


  // const debouncedCallback = useMemo(() => {
  //   const debounced = debounce(async () => {
  //     if (userQuery) {
  //       try {
  //         const results = await api.users.search(userQuery)
  //         setUserResults(results)
  //       } catch (e: any) { }
  //     } else {
  //       setUserResults([])
  //       debounced.cancel()
  //     }
  //   }, 200, { leading: true, trailing: false })

  //   return debounced
  // }, [userQuery])

  const onRemoveUser = (val: any) => {
    setSelectedUsers((users: any) => {
      delete users[val];

      return { ...users }
    })
  }

  const onNextPage = () => {
    if (hasNextPage) {
      setPage((page) => page + 1);
    }
  };

  const onPrevPage = () => {
    if (hasPrevPage) {
      setPage((page) => page - 1);
    }
  };

  const initialValues = {
    search: "",
  };

  const menuRenderer = (item: any) => {
    if (selectedUsers[item.id]) {
      return (
        <span>
          <Icon icon={'tick'} />
          {' '}
          {item.behaviourType}
        </span>
      )
    }
    return item.behaviourType
  }

  const handleItemChange = (e: IUserModel) => {
    const id = e.id;

    if (!selectedUsers[id]) {
      setSelectedUsers((users: any) => {
        users[id] = e;

        return { ...users }
      })
    }
  }

  const onUserQueryChange = (q: string) => {
    setUserQuery(q)
  }

  const tagRenderer = (item: any) => {
    if (item && behaviour[item]) {
      return "resss"
    }

    return ''
  }
  return (
    <Dialog
      icon='info-sign'
      onClose={handleClose}
      title='Behaviour'
      isOpen={isOpen}
    >

      <div className={`${Classes.DIALOG_BODY} add-client__levelsOfService`}>
        <div className="gha__users-input">
          <Formik
            initialValues={initialValues}
            onSubmit={async (values, { setSubmitting }) => {
              if (values.search) {
                const filteredtrainer = [...trainerActual].filter(
                  (item) => {
                    return (
                      item?.behaviourDescription
                        ?.toLowerCase()
                        .includes(values.search.toLowerCase()) ||
                      item?.behaviourType
                        ?.toLowerCase()
                        .includes(values.search.toLowerCase())
                    );
                  }
                );
                setBehaviours(filteredtrainer);
              } else {
                setBehaviours(trainerActual);
              }
            }}
          >
            {formikWrapper(
              ({
                wrapperProps: { getInputFormGroup },
                formikProps: { handleSubmit },
              }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col xs={12} md={6}>
                        <FormMultiItemSelect
                          intent={Intent.PRIMARY}
                          label={'Select behaviour type'}
                          menuRenderer={menuRenderer}
                          formSelectProps={{
                            tagRenderer,
                            items: behaviours,
                            onItemSelect: handleItemChange,
                            selectedItems: Object.keys(selectedUsers),
                            onRemove: onRemoveUser,
                            onQueryChange: onUserQueryChange
                          }}
                        />
                        {/* <TrainersUsersInput users={behaviour} onNewUsers={handleBehaviourChange} /> */}
                      </Col>
                    </Row>
                  </form>
                );
              },
              FIELDS
            )}
          </Formik>
        </div>

       
      </div>
    </Dialog>
  );
};

export default BehaviourDialog;


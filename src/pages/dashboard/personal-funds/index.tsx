// import { useContext, useEffect, useState } from "react";
// import { BreadcrumbProps, Intent } from "@blueprintjs/core";
// import { IconNames } from "@blueprintjs/icons";
// import { AnchorButton, Col, PageHeading, Table } from "../../../components";
// import URLS from "../../../utils/urls";
// import api from "../../../api";
// import * as helpers from "../../../utils/helpers";
// import {
//   actionColumn,
//   activeColumn,
//   expenseColumn,
//   expenseDateColumn,
//   expenseTypeColumn,
//   idColumn,
// } from "./helpers";
// import "./index.scss";
// import { IPersonalFundsModel } from "../../../types";
// import ClientContext from "../../../contexts/client";
// import ToastsContext from "../../../contexts/toasts";

// const PAGE_SIZE = 10;

// const PersonalFunds = () => {
//   const [personalFunds, setPersonalFunds] = useState<IPersonalFundsModel[] | []>(
//     []
//   );
//   const [page, setPage] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const { id: clientId } = useContext(ClientContext);
//   const { addToast } = useContext(ToastsContext);
//   const hasNextPage = personalFunds.length >= PAGE_SIZE;
//   const hasPrevPage = page > 0;

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       setPersonalFunds(
//         await api.PersonalFunds.getPersonalFunds(clientId, {
//           page,
//           pageSize: PAGE_SIZE,
//         })
//       );
//     } catch (e: any) { }
//     setTimeout(() => {
//       setLoading(false);
//     }, 200);
//   };
//   console.log("personal fundsss ==>",personalFunds);
  
//   useEffect(() => {
//     fetchData()
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

//   const BREADCRUMBS: BreadcrumbProps[] = [
//     {
//       href: URLS.getPagePath("dashboard"),
//       icon: "document",
//       text: URLS.getPagePathName("dashboard"),
//     },
//     {
//       href: URLS.getPagePath("clients"),
//       icon: "document",
//       text: URLS.getPagePathName("clients"),
//     },
//     {
//       href: URLS.getPagePath("client-links", { clientId }),
//       icon: "document",
//       text: URLS.getPagePathName("client-links"),
//     },
//     { text: URLS.getPagePathName("personal_funds") },
//   ];


//   const getAddButton = () => {
//     return (
//       <AnchorButton
//         buttonProps={{
//           intent: Intent.PRIMARY,
//           icon: IconNames.ADD,
//         }}
//         linkProps={{
//           to: URLS.getPagePath("add-personal_funds", { clientId }),
//         }}
//       >
//         {URLS.getPagePathName("add-personal_funds")}
//       </AnchorButton>
//     );
//   };
//   const deletePersonalFund = async (data: IPersonalFundsModel) => {
//     setLoading(true)

//     try {
     
      
//       await api.PersonalFunds.deltePersonalFund(data.personalFunds?._id || "")

//       await fetchData()
//       addToast({
//         message: 'Deleted...',
//         intent: 'success'
//       })
//     } catch (e: any) {
//       addToast({
//         message: 'Something went wrong',
//         intent: 'danger'
//       })
//     }

//     setLoading(false)
//   }
//   return (
//     <div className="dashboard">
//       <div className="dashboard__container">
//         <div>
//           <div className="personalFunds">
//             <PageHeading
//               title="Personal Funds"
//               breadCrumbs={BREADCRUMBS}
//               renderRight={getAddButton}
//             />
//             <div className="personalFunds__container">
//               <Col>
//                 <Table
//                   loading={loading}
//                   numRows={personalFunds.length}
//                   getCellClipboardData={(row: any, col: any) => {
//                     return personalFunds[row];
//                   }}
//                   columns={[
//                     {
//                       title: "Id",
//                       cellRenderer: idColumn,
//                       width: helpers.getTableWith(0.25),
//                     },
//                     {
//                       title: "Expense Type",
//                       cellRenderer: expenseTypeColumn,
//                       width: helpers.getTableWith(0.25),
//                     },
//                     {
//                       title: "Expense Date",
//                       cellRenderer: expenseDateColumn,
//                       width: helpers.getTableWith(0.2),
//                     },
//                     {
//                       title: "Active",
//                       cellRenderer: activeColumn,
//                       width: helpers.getTableWith(0.2),
//                     },
//                     {
//                       title: "Expense",
//                       cellRenderer: expenseColumn,
//                       width: helpers.getTableWith(0.2),
//                     },
//                     {
//                       title: "Actions",
//                       cellRenderer: (data: any) => {
//                         console.log("data iddddddddd",data.personalFunds.id);
                        
//                         return actionColumn(data, {
//                           viewLink: URLS.getPagePath("edit-personal_funds", {
//                             clientId,
//                             personalFundsId: data.personalFunds.id,
//                           }),
//                           onDelete() {
//                             deletePersonalFund(data.personalFunds)
//                           }
//                         });
//                       },
//                       width: helpers.getTableWith(0.1),
//                     },
//                   ]}
//                   data={personalFunds}
//                   enableRowHeader={true}
//                   hasNextPage={hasNextPage}
//                   hasPrevPage={hasPrevPage}
//                   onNextPage={onNextPage}
//                   onPrevPage={onPrevPage}
//                   page={page}
//                   emptyTableMessage="No personalFunds Found"
//                 />
//               </Col>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PersonalFunds;
import { useContext, useEffect, useState } from "react";
import { BreadcrumbProps, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { AnchorButton, Col, PageHeading, Table } from "../../../components";
import URLS from "../../../utils/urls";
import api from "../../../api";
import * as helpers from "../../../utils/helpers";
import {
  actionColumn,
  activeColumn,
  expenseColumn,
  expenseDateColumn,
  expenseTypeColumn,
  idColumn,
} from "./helpers";
import "./index.scss";
import { IPersonalFundsModel } from "../../../types";
import ClientContext from "../../../contexts/client";
import ToastsContext from "../../../contexts/toasts";

const PAGE_SIZE = 10;

const PersonalFunds = () => {
  const [personalFunds, setPersonalFunds] = useState<IPersonalFundsModel[] | []>(
    []
  );
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);
  const hasNextPage = personalFunds.length >= PAGE_SIZE;
  const hasPrevPage = page > 0;

  const fetchData = async () => {
    setLoading(true);
    try {
      setPersonalFunds(
        await api.PersonalFunds.getPersonalFunds(clientId, {
          page,
          pageSize: PAGE_SIZE,
        })
      );
    } catch (e: any) { }
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };
  console.log("personal fundsss ==>",personalFunds);
  
  useEffect(() => {
    fetchData()
  }, [clientId, page]);

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

  const BREADCRUMBS: BreadcrumbProps[] = [
    {
      href: URLS.getPagePath("dashboard"),
      icon: "document",
      text: URLS.getPagePathName("dashboard"),
    },
    {
      href: URLS.getPagePath("clients"),
      icon: "document",
      text: URLS.getPagePathName("clients"),
    },
    {
      href: URLS.getPagePath("client-links", { clientId }),
      icon: "document",
      text: URLS.getPagePathName("client-links"),
    },
    { text: URLS.getPagePathName("personal_funds") },
  ];


  const getAddButton = () => {
    return (
      <AnchorButton
        buttonProps={{
          intent: Intent.PRIMARY,
          icon: IconNames.ADD,
        }}
        linkProps={{
          to: URLS.getPagePath("add-personal_funds", { clientId }),
        }}
      >
        {URLS.getPagePathName("add-personal_funds")}
      </AnchorButton>
    );
  };
  const deleteTrainer = async (data: IPersonalFundsModel) => {
    setLoading(true)

    try {
      await api.Trainers.deleteTrainer(data.personalFunds?._id || "")

      await fetchData()
      addToast({
        message: 'Deleted...',
        intent: 'success'
      })
    } catch (e: any) {
      addToast({
        message: 'Something went wrong',
        intent: 'danger'
      })
    }

    setLoading(false)
  }
  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <div>
          <div className="personalFunds">
            <PageHeading
              title="Personal Funds"
              breadCrumbs={BREADCRUMBS}
              renderRight={getAddButton}
            />
            <div className="personalFunds__container">
              <Col>
                <Table
                  loading={loading}
                  numRows={personalFunds.length}
                  getCellClipboardData={(row: any, col: any) => {
                    return personalFunds[row];
                  }}
                  columns={[
                    {
                      title: "Id",
                      cellRenderer: idColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Expense Type",
                      cellRenderer: expenseTypeColumn,
                      width: helpers.getTableWith(0.25),
                    },
                    {
                      title: "Expense Date",
                      cellRenderer: expenseDateColumn,
                      width: helpers.getTableWith(0.2),
                    },
                    {
                      title: "Active",
                      cellRenderer: activeColumn,
                      width: helpers.getTableWith(0.2),
                    },
                    {
                      title: "Expense",
                      cellRenderer: expenseColumn,
                      width: helpers.getTableWith(0.2),
                    },
                    {
                      title: "Actions",
                      cellRenderer: (data: any) => {
                        return actionColumn(data, {
                          viewLink: URLS.getPagePath("edit-personal_funds", {
                            clientId,
                            personalFundsId: data.id,
                          }),
                          onDelete() {
                            deleteTrainer(data)
                          }
                        });
                      },
                      width: helpers.getTableWith(0.1),
                    },
                  ]}
                  data={personalFunds}
                  enableRowHeader={true}
                  hasNextPage={hasNextPage}
                  hasPrevPage={hasPrevPage}
                  onNextPage={onNextPage}
                  onPrevPage={onPrevPage}
                  page={page}
                  emptyTableMessage="No personalFunds Found"
                />
              </Col>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalFunds;

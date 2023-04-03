import { Classes, Icon, Intent } from "@blueprintjs/core";
import { Dialog, FormMultiItemSelect, Table } from "../../../components";
import { IDialog } from "./types";
import { useContext, useEffect, useMemo, useState } from "react";
import ClientContext from "../../../contexts/client";
import { IClientWithnessModel } from "../../../types";
import api from "../../../api";
import {
  nameColumn,
} from "../client-witness/helpers";
import * as helpers from "../../../utils/helpers";
import { debounce } from "lodash";

const PAGE_SIZE = 10;

const ClientWitnessForm = (props: IDialog) => {
  const { isOpen, handleClose } = props;
  const [clientWitness, setClientWitness] = useState<
    IClientWithnessModel[] | []
  >([]);
  const [userResults, setClientWitnessResults] = useState<IClientWithnessModel[] | []>([])
  const [userQuery, setUserQuery] = useState('')
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);
  const hasNextPage = clientWitness.length === PAGE_SIZE;
  const hasPrevPage = page > 0;

  const debouncedCallback = useMemo(() => {
    const debounced = debounce(async () => {
      if (userQuery) {
        try {
          const results = await api.users.search(userQuery)
          setClientWitnessResults(results)
        } catch(e: any) {}
      } else {
        setClientWitnessResults([])
        debounced.cancel()
      }
    }, 200, { leading: true, trailing: false })

    return debounced
  }, [userQuery])

  const onUserQueryChange = (q: string) => {
    setUserQuery(q)
  }
  
  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        setClientWitness(
          await api.clientWitness.getClientWitness(clientId, {
            page,
            pageSize: PAGE_SIZE,
          })
        );
      } catch (e: any) {}

      setTimeout(() => {
        setLoading(false);
      }, 200);
    })();
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

  const menuRenderer = (item: IClientWithnessModel) => {
    if (clientWitness[0]) {
      return (
        <span>
          <Icon icon={'tick'} />
          {' '}
          {item.firstName}
        </span>
      )
    }

    return item.firstName
  }

  const tagRenderer = (item: string) => {
    if (item && clientWitness[item]) {
      return clientWitness[item].name
    }

    return ''
  }

  return (
    <Dialog
      icon="info-sign"
      onClose={handleClose}
      title="Client Witness"
      isOpen={isOpen}
    >
      <>
        <div className={`${Classes.DIALOG_BODY} add-client__levelsOfService`}>
          <div className="gha__users-input">
            <FormMultiItemSelect
              intent={Intent.PRIMARY}
              label={"Select Client Witness"}
              menuRenderer={menuRenderer}
              formSelectProps={{
                tagRenderer,
                items: userResults,
                onItemSelect: handleItemChange,
                selectedItems: Object.keys(clientWitness),
                onRemove: onRemoveUser,
                onQueryChange: onUserQueryChange,
              }}
            />
          </div>

          <Table
            loading={loading}
            numRows={clientWitness.length}
            getCellClipboardData={(row: any, col: any) => {
              return clientWitness[row];
            }}
            columns={[
              {
                title: "Name",
                cellRenderer: nameColumn,
                width: helpers.getTableWith(0.50),
              }
            ]}
            data={clientWitness}
            enableRowHeader={false}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            onNextPage={onNextPage}
            onPrevPage={onPrevPage}
            page={page}
            emptyTableMessage="No Client Witness Found"
          />
        </div>
      </>
    </Dialog>
  );
};

export default ClientWitnessForm;

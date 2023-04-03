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
  const [clientWitnessResults, setClientWitnessResults] = useState<IClientWithnessModel[] | []>([])
  const [clientWitnessQuery, setClientWitnessQuery] = useState('')
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);
  const hasNextPage = clientWitness.length === PAGE_SIZE;
  const hasPrevPage = page > 0;

  const debouncedCallback = useMemo(() => {
    const debounced = debounce(async () => {
      if (clientWitnessQuery) {
        try {
          // const results = await api.users.search(clientWitnessQuery)
          // setClientWitnessResults(results)
        } catch(e: any) {}
      } else {
        setClientWitnessResults([])
        debounced.cancel()
      }
    }, 200, { leading: true, trailing: false })

    return debounced
  }, [clientWitnessQuery])

  const onClientWitnessChange = (q: string) => {
    setClientWitnessQuery(q)
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

  const menuRenderer = (item: any) => {
    if (clientWitness[item.id]) {
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

  const tagRenderer = (item: any) => {
    if (item && clientWitness[item]) {
      return clientWitness[item].firstName
    }
    return ''
  }

  const onRemoveClientWitness = (val: any) => {
    setClientWitnessResults((users: any) => {
      delete users[val];

      return {...users}
    })
  }

  const handleItemChange = (e: any) => {
    const id = e.id;
    if (!clientWitness[id]) {
      setClientWitnessResults((users: any) => {
        users[id] = e;

        return { ...users }
      })
    }
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
                items: clientWitnessResults,
                onItemSelect: handleItemChange,
                selectedItems: Object.keys(clientWitness),
                onRemove: onRemoveClientWitness,
                onQueryChange: onClientWitnessChange,
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

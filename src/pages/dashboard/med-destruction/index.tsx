import { useContext, useEffect, useState } from 'react';
import { BreadcrumbProps, Intent, MenuItem } from '@blueprintjs/core';
import { Select, IItemRendererProps } from "@blueprintjs/select";
import get from 'lodash/get';
import { Formik } from 'formik';
import moment from 'moment';

import { Button, Col, FormGroup, DateInput, InputGroup, PageHeading, Row, Table } from '../../../components';

import ClientContext from '../../../contexts/client';

import URLS from '../../../utils/urls';
import { TIME } from '../../../utils/time';

import api from '../../../api';

import * as helpers from '../../../utils/helpers';

import { IGoalModel } from '../../../types';

import Client from '../../../models/client';


import {
  actionColumn,
  activeColumn,
  dateOfBirthColumn,
  addressColumn,
  firstNameColumn,
  lastNameColumn,
} from './helpers';

import './index.scss';


const FormSelect = Select.ofType<string>();

const PAGE_SIZE = 10;


const EntryLogForm = (props: any) => {
  const { client, passDate } = props;

  const formSelectItemRenderer = (item: string, props: IItemRendererProps) => {
    return (
        <MenuItem
            text={item}
            // active={active}
            onClick={props.handleClick}
            shouldDismissPopover={false}
        />
    )
  }

  return (
    <Formik
      initialValues={{}}
      validationSchema={{}}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        setSubmitting(false);
      }}
      >

      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue
      }) => {
        const onFormSelectChange = (field: string) => (value: string) => {
          setFieldValue(field, value);
        }
        
        const onFormDateChange = (field: string) => (date: Date) => {
          setFieldValue(field, moment(date).toISOString());
        }

        return (
          <Col className='medpass__form'>
            <Row>
              <Col>
                <FormGroup label='Pass Date'>
                  <DateInput
                    value={passDate}
                    {...helpers.getMomentFormatter('LL')}
                  />
                </FormGroup>
                <FormGroup
                  intent={Intent.PRIMARY}
                  label={'Pass Time'}
                  labelFor="text-input"
                  labelInfo={"(required)"}
                >
                  <FormSelect
                      items={TIME}
                      filterable={false}
                      itemRenderer={formSelectItemRenderer}
                      noResults={<MenuItem disabled={true} text="No results." />}
                      onItemSelect={onFormSelectChange('legal_status')}
                  >
                      {/* children become the popover target; render value here */}
                      <Button text={''} rightIcon="double-caret-vertical" />
                  </FormSelect>
                </FormGroup>
              </Col>
            </Row>
            <Button>
              Find
            </Button>
            <Row>
              <Col xs={12} md={4}>
              <FormGroup label={'Cycle Start Date'}></FormGroup> 
                <InputGroup
                    id={`text-input`}
                  />
                </Col>
                <Col xs={12} md={4}>
                  <FormGroup label={'Cycle End Date'}></FormGroup> 
                  <InputGroup
                    id={`text-input`}
                  />
              </Col>
            </Row>
            <Row>
            
            </Row>
          </Col>
        )
      }}
      </Formik>
  );
}

const MedDestructionPage = () => {
  const [passDate, setPassDate] = useState<Date | null>(null)
  const [client, setClient] = useState<Client | {}>({});
  const [goals, setGoals] = useState<IGoalModel[] | []>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingClient, setLoadingClient] = useState(false);
  const { id: clientId } = useContext(ClientContext);

  const hasNextPage = goals.length === PAGE_SIZE;
  const hasPrevPage = page > 0;

  useEffect(() => {
    (async () => {
      setLoadingClient(true);

      if (clientId) {
        try {
          const _client = await api.clients.getClient(clientId);
          setClient(_client);
          
          if (_client.profilePicture) {
            await _client.profilePicture.loadFile();
          }
        } catch(e) {}
      }

      setLoadingClient(false);
    })()
  }, [clientId])

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        setGoals(
          await api.goals.getGoals(clientId, { page, pageSize: PAGE_SIZE })
        )
      } catch(e){}

      setTimeout(() => {
        setLoading(false);
      }, 200)
    })()
  }, [clientId, page]);

  const onNextPage = () => {
    if (hasNextPage) {
      setPage(page => page + 1)
    }
  }

  const onPrevPage = () => {
    if (hasPrevPage) {
      setPage(page => page - 1)
    }
  }

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard')},
    { href: URLS.getPagePath('clients'), icon: 'document', text: URLS.getPagePathName('clients') },
    { href: URLS.getPagePath('client-links', { clientId }), icon: 'document', text: URLS.getPagePathName('client-links')},
    { href: URLS.getPagePath('medication', { clientId }), icon: 'document', text: URLS.getPagePathName('medication') },
    { text: URLS.getPagePathName('med-destruction') }
  ];

  return (
    <div>
      <div className='medpass'>
        <PageHeading
          title={URLS.getPagePathName('med-destruction')}
          breadCrumbs={BREADCRUMBS}
        />

        <EntryLogForm client={client} passDate={passDate} />

        <div className='medpass__container' style={{margin:"10px"}}>
          <Col>
            <Table
              loading={loading}
              numRows={goals.length}
              getCellClipboardData={(row, col) => {
                return goals[row]
              }}
              columns={[
                {
                  title: 'First Name',
                  cellRenderer: firstNameColumn,
                  width: helpers.getTableWith(0.15)
                },
                {
                  title: 'Last Name',
                  cellRenderer: lastNameColumn,
                  width: helpers.getTableWith(0.15)
                },
                {
                  title: 'DOB',
                  cellRenderer: dateOfBirthColumn,
                  width: helpers.getTableWith(0.13)
                },
                {
                  title: 'Active',
                  cellRenderer: activeColumn,
                  width: helpers.getTableWith(0.07)
                },
                {
                  title: 'Address',
                  cellRenderer: addressColumn,
                  width: helpers.getTableWith(0.3)
                },
                {
                  title: 'Actions',
                  cellRenderer: actionColumn,
                  width: helpers.getTableWith(0.2)
                }
              ]}
              data={goals}
              enableRowHeader={false}
              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}
              onNextPage={onNextPage}
              onPrevPage={onPrevPage}
              page={page}
              emptyTableMessage="No Med Pass Found"
            />
          </Col>
        </div>
      </div>
    </div>
  );
}

export default MedDestructionPage;

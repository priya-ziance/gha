import { useContext, useEffect, useState } from 'react';
import { BreadcrumbProps, Intent , MenuItem } from '@blueprintjs/core';
import { Formik } from 'formik';
import { Select, IItemRendererProps } from "@blueprintjs/select";

import moment from 'moment';

import {
  AnchorButton,
  Button,
  Col,
  DateInput,
  FormGroup,
  PageHeading,
  Row,
  Table,
  TextArea
} from '../../../components';

import ClientContext from '../../../contexts/client';
import LocationContext from '../../../contexts/location';

import URLS from '../../../utils/urls';

import api from '../../../api';

import CaseNote from '../../../models/caseNote';

import * as helpers from '../../../utils/helpers';

import { TEMP_ANSWERS } from './constants'

import {
  actionColumn,
  activeColumn,
  dateColumn,
  descriptionColumn,
  titleColumn,
} from './helpers';

import MonthLog from './monthLog';

import './index.scss';

const PAGE_SIZE = 10;

const ClientCaseNotes = () => {
  const [caseNotes, setCaseNotes] = useState<CaseNote[] | []>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isMonthLogOpen, setIsMonthLogOpen] = useState(false);
  const { id: clientId } = useContext(ClientContext);
  const { id: selectedLocationId } = useContext(LocationContext)

  const hasNextPage = caseNotes.length === PAGE_SIZE;
  const hasPrevPage = page > 0;

  const FormSelect = Select.ofType<string>();

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        setCaseNotes(
          await api.caseNotes.getCaseNotes(clientId, { page, pageSize: PAGE_SIZE })
        )
      } catch(e){}

      setTimeout(() => {
        setLoading(false);
      }, 200)
    })()
  }, [clientId, page, selectedLocationId]);

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
  
  const onLogDateChange = (date: Date) => {
    
  }

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


  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard')},
    { href: URLS.getPagePath('clients'), icon: 'document', text: URLS.getPagePathName('clients') },
    { href: URLS.getPagePath('client-links', { clientId }), icon: 'document', text: URLS.getPagePathName('client-links') },
    { href: URLS.getPagePath('logs', { clientId }), icon: 'document', text: URLS.getPagePathName('logs') },
    { text: URLS.getPagePathName('reshab-logs') }
  ];

  return (
    <div>
      <div className='reshab-logs'>
        <PageHeading
          title='Reshab Logs'
          breadCrumbs={BREADCRUMBS}
        />

        <FormGroup
          intent='primary'
          label='Log Date'
        >
          <DateInput
            onChange={onLogDateChange}
            {...helpers.getMomentFormatter('LL')}
          />
        </FormGroup>

        <div className='reshab-logs__container'>
          <Col>
            <Table
              loading={loading}
              numRows={caseNotes.length}
              enableMinHeight
              columns={[
                {
                  title: 'ID',
                  cellRenderer: (data) => (<p>{data.id}</p>),
                  width: helpers.getTableWith(0.05)
                },
                {
                  title: 'First Name',
                  cellRenderer: titleColumn,
                  width: helpers.getTableWith(0.125)
                },
                {
                  title: 'Last Name',
                  cellRenderer: titleColumn,
                  width: helpers.getTableWith(0.125)
                },
                {
                  title: 'Address',
                  cellRenderer: descriptionColumn,
                  width: helpers.getTableWith(0.2)
                },
                {
                  title: 'Medicaid No',
                  cellRenderer: dateColumn,
                  width: helpers.getTableWith(0.11)
                },
                {
                  title: 'Location',
                  cellRenderer: dateColumn,
                  width: helpers.getTableWith(0.19)
                },
                {
                  title: 'Single',
                  cellRenderer: activeColumn,
                  width: helpers.getTableWith(0.07)
                },
                {
                  title: 'Actions',
                  cellRenderer: (data) => {
                    return actionColumn(data, {
                      onView() {
                        setIsMonthLogOpen(true);
                      }
                    })
                  },
                  width: helpers.getTableWith(0.13)
                }
              ]}
              data={caseNotes}
              enableRowHeader={false}
              onSelection={(focusedCell) => {
                console.log(focusedCell)
              }}
              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}
              onNextPage={onNextPage}
              onPrevPage={onPrevPage}
              page={page}
              emptyTableMessage="No Case Notes Found"
            />

            <Formik
              initialValues={{}}
              onSubmit={async (values, { setSubmitting }) => {
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

                return (
                  <form onSubmit={handleSubmit} className='reshab-logs__form'>
                    <Row className='reshab-logs__form__row'>
                      <Col md={6}>
                        <FormGroup
                          intent={Intent.PRIMARY}
                          labelFor="text-input"
                          label='Was the reshab service provided? '
                        >
                          <FormSelect
                              items={TEMP_ANSWERS}
                              filterable={false}
                              itemRenderer={formSelectItemRenderer}
                              noResults={<MenuItem disabled={true} text="No results." />}
                              onItemSelect={onFormSelectChange('legal_status')}
                          >
                              {/* children become the popover target; render value here */}
                              <Button text={'A'} rightIcon="double-caret-vertical" />
                          </FormSelect>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup
                          intent={Intent.PRIMARY}
                          labelFor="text-input"
                          label='Was the reshab service provided? '
                        >
                          <FormSelect
                              items={TEMP_ANSWERS}
                              filterable={false}
                              itemRenderer={formSelectItemRenderer}
                              noResults={<MenuItem disabled={true} text="No results." />}
                              onItemSelect={onFormSelectChange('legal_status')}
                          >
                              {/* children become the popover target; render value here */}
                              <Button text={'A'} rightIcon="double-caret-vertical" />
                          </FormSelect>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup
                          intent={Intent.PRIMARY}
                          labelFor="text-input"
                          label='Was the reshab service provided? '
                        >
                          <FormSelect
                              items={TEMP_ANSWERS}
                              filterable={false}
                              itemRenderer={formSelectItemRenderer}
                              noResults={<MenuItem disabled={true} text="No results." />}
                              onItemSelect={onFormSelectChange('legal_status')}
                          >
                              {/* children become the popover target; render value here */}
                              <Button text={'A'} rightIcon="double-caret-vertical" />
                          </FormSelect>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup
                          intent={Intent.PRIMARY}
                          labelFor="text-input"
                          label='Was the reshab service provided? '
                        >
                          <FormSelect
                              items={TEMP_ANSWERS}
                              filterable={false}
                              itemRenderer={formSelectItemRenderer}
                              noResults={<MenuItem disabled={true} text="No results." />}
                              onItemSelect={onFormSelectChange('legal_status')}
                          >
                              {/* children become the popover target; render value here */}
                              <Button text={'A'} rightIcon="double-caret-vertical" />
                          </FormSelect>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup
                          intent={Intent.PRIMARY}
                          labelFor="text-input"
                          label='Was the reshab service provided? '
                        >
                          <FormSelect
                              items={TEMP_ANSWERS}
                              filterable={false}
                              itemRenderer={formSelectItemRenderer}
                              noResults={<MenuItem disabled={true} text="No results." />}
                              onItemSelect={onFormSelectChange('legal_status')}
                          >
                              {/* children become the popover target; render value here */}
                              <Button text={'A'} rightIcon="double-caret-vertical" />
                          </FormSelect>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup
                          intent={Intent.PRIMARY}
                          labelFor="text-input"
                          label='Was the reshab service provided? '
                        >
                          <FormSelect
                              items={TEMP_ANSWERS}
                              filterable={false}
                              itemRenderer={formSelectItemRenderer}
                              noResults={<MenuItem disabled={true} text="No results." />}
                              onItemSelect={onFormSelectChange('legal_status')}
                          >
                              {/* children become the popover target; render value here */}
                              <Button text={'A'} rightIcon="double-caret-vertical" />
                          </FormSelect>
                        </FormGroup>
                      </Col>
                    </Row>

                    <FormGroup
                      label='Log Notes'
                      labelFor={`text-area__log_notes`}
                    >
                      <TextArea
                        id={`text-area__log_notes`}
                      />
                    </FormGroup>
                    

                    <Button type="submit" disabled={isSubmitting} loading={isSubmitting} large intent={Intent.PRIMARY}>
                      Save
                    </Button>
                  </form>
                )
              }}
          </Formik>
          </Col>
        </div>
      </div>

      <MonthLog isOpen={isMonthLogOpen} onClose={() => setIsMonthLogOpen(false)}/>
    </div>
  );
}

export default ClientCaseNotes;
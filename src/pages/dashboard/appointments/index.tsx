import { useContext, useEffect, useState } from 'react';
import { BreadcrumbProps, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import { AnchorButton, Col, PageHeading, Table } from '../../../components';

import ClientContext from '../../../contexts/client';

import URLS from '../../../utils/urls';

import api from '../../../api';

import * as helpers from '../../../utils/helpers';

import { IAppointment, IAppointmentModel } from '../../../types';

import {
  actionColumn,
  activeColumn,
  clientNameColumn,
  doctorColumn,
  appointmentDateColumn,
  timeColumn,
} from './helpers';

import './index.scss';

const PAGE_SIZE = 10;

const AppointmentsPage = () => {
  const [appointment, setAppointment] = useState<IAppointmentModel[] | []>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { id: clientId } = useContext(ClientContext);

  const hasNextPage = appointment.length === PAGE_SIZE;
  const hasPrevPage = page > 0;

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        setAppointment(
          await api.appointments.getAppointments(clientId, { page, pageSize: PAGE_SIZE })
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
    { text: URLS.getPagePathName('appointments') }
  ];

  const getAddButton = () => {
    return (
      <AnchorButton
        buttonProps={{
          intent: Intent.PRIMARY,
          icon: IconNames.ADD
        }}
        linkProps={{
          to: URLS.getPagePath('add-appointment', { clientId })
        }}
      >
        Add 
      </AnchorButton>
    );
  }
  

  return (
    <div>
      <div className='appointmentlist'>
        <PageHeading
          title='Client Appointment List'
          breadCrumbs={BREADCRUMBS}
          renderRight={getAddButton}
        />
        <div className='appointmet-list__container'>
          <Col>
            <Table
              loading={loading}
              numRows={appointment.length}
              getCellClipboardData={(row, col) => {
                return appointment[row]
              }}
              columns={[
                {
                  title: 'Client Name',
                  cellRenderer: clientNameColumn,
                  width: helpers.getTableWith(0.15)
                },
                {
                  title: 'Doctor ',
                  cellRenderer: doctorColumn,
                  width: helpers.getTableWith(0.15)
                },
                {
                  title: 'Date',
                  cellRenderer: appointmentDateColumn,
                  width: helpers.getTableWith(0.13)
                },
                {
                  title: 'Time',
                  cellRenderer: timeColumn,
                  width: helpers.getTableWith(0.3)
                },
                {
                  title: 'Active',
                  cellRenderer: activeColumn,
                  width: helpers.getTableWith(0.07)
                },
                {
                  title: 'Actions',
                  cellRenderer: actionColumn,
                  width: helpers.getTableWith(0.2)
                }
              ]}
              data={appointment}
              enableRowHeader={false}
              onSelection={(focusedCell) => {
                console.log(focusedCell)
              }}
              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}
              onNextPage={onNextPage}
              onPrevPage={onPrevPage}
              page={page}
              emptyTableMessage="No Client Appointments Found"
            />
          </Col>
        </div>
      </div>
    </div>
  );
}

export default AppointmentsPage;

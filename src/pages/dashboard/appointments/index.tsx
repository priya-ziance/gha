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
  contactNameColumn,
  appointmentTypeColumn,
  contactTypeColumn,
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
        Add Appointment
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
              columns={[
                {
                  title: 'Contact Name',
                  cellRenderer: contactNameColumn,
                  width: helpers.getTableWith(0.25)
                },
                {
                  title: 'Contact Type',
                  cellRenderer: contactTypeColumn,
                  width: helpers.getTableWith(0.13)
                },
                {
                  title: 'Appointment Type',
                  cellRenderer: appointmentTypeColumn,
                  width: helpers.getTableWith(0.2)
                },
                {
                  title: 'AppointmentDate',
                  cellRenderer: appointmentDateColumn,
                  width: helpers.getTableWith(0.15)
                },
                {
                  title: 'Time',
                  cellRenderer: timeColumn,
                  width: helpers.getTableWith(0.1)
                },
                {
                  title: 'Active',
                  cellRenderer: activeColumn,
                  width: helpers.getTableWith(0.07)
                },
                {
                  title: 'Actions',
                  cellRenderer: (data) => {
                    return actionColumn(
                      data,
                      {
                        viewLink: URLS.getPagePath(
                          'edit-appointment',
                          { clientId, appointmentId: data.id })
                      }
                    )
                  },
                  width: helpers.getTableWith(0.1)
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

import { useContext } from 'react';
import { BreadcrumbProps, Intent } from '@blueprintjs/core';
import { Formik } from 'formik';
import get from 'lodash/get';
import pick from 'lodash/pick';
import Autocomplete from "react-google-autocomplete";

import { ILocationModel } from '../../../types';

import api from '../../../api';

import URLS from '../../../utils/urls';

import { Button, FormGroup, PageHeading } from '../../../components';

import ToastsContext from '../../../contexts/toasts';

import formikWrapper from '../../../wrappers/formik';

import * as helpers from './helpers';
import { FIELDS } from './constants';
import { GOOGLE_API_KEY } from '../../../utils/config';

import './index.scss';


interface LocationProps {
  location?: ILocationModel;
  update?: boolean;
}


const normalizePlaceResult = (result: any) => {
  let country = ''
  let city = ''
  let coord = [
    result.geometry.location.lat(),
    result.geometry.location.lng()
  ]
  let address = result.formatted_address

  const addressComponents = result.address_components || [];
  
  addressComponents.forEach((comp: any) => {
    const types = comp.types;

    if (types.includes('country')) {
      country = comp.long_name
    } else if (types.includes('locality')) {
      city = comp.long_name
    }
  });

  return {
    country,
    city,
    coord,
    address
  }
}

const Location = (props: LocationProps) => {
  const { addToast } = useContext(ToastsContext);
  let initialValues;

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard')},
    { href: URLS.getPagePath('locations'), icon: 'document', text: URLS.getPagePathName('locations') },
  ];

  if (props.update) {
    BREADCRUMBS.push({ text: URLS.getPagePathName('edit-location') })
  } else {
    BREADCRUMBS.push({ text: URLS.getPagePathName('add-location') })
  }

  /**
   * This assigns the client's info as the initial values if a client
   * is passed in
   */
  if (props.location) {
    initialValues = Object.assign(
      {},
      helpers.initialValues,
      pick(props.location.location, Object.keys(helpers.initialValues))
    );
  } else {
    initialValues = helpers.initialValues;
  }
  

  return (
    <div className='add-location'>
      <PageHeading
        title={props.update ? 'Update Location' : 'Add Location'}
        breadCrumbs={BREADCRUMBS}
      />
      <div className='add-location__container'>
        <Formik
            initialValues={initialValues}
            validationSchema={helpers.validationSchema}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
              setSubmitting(true);
              const locationId = get(props, 'location.id', '')

              try {
                if (props.update) {
                  await api.locations.updateLocation(locationId, values);

                  addToast({
                    message: 'Location Updated',
                    intent: 'primary'
                  })
                } else {
                  await api.locations.createLocation(values);

                  addToast({
                    message: 'Location Created',
                    intent: 'primary'
                  })

                  // Reset the form
                  resetForm();
                }
              } catch(e: any) {
                addToast({
                  message: 'Something went wrong',
                  intent: 'danger'
                })
              }

              setSubmitting(false);
            }}
            >
              {formikWrapper(({
              wrapperProps: {
                getInputFormGroup
              },
              formikProps: {
                handleSubmit,
                isSubmitting,
                setFieldValue,
                errors,
                values
              }
            }) => {
              return (
                <form onSubmit={handleSubmit}>

                  {getInputFormGroup('phoneNumber')}
                  <FormGroup
                    intent={Intent.DANGER}
                    label={get(FIELDS, 'address', { name: '' }).name}
                    helperText={errors['address']}
                  >
                    <Autocomplete
                      options={{
                        types: 'street_address'
                      }}
                      className='bp3-input'
                      style={{ width: "100%" }}
                      apiKey={GOOGLE_API_KEY}
                      defaultValue={values.address}
                      onPlaceSelected={(place) => {
                        const normRes = normalizePlaceResult(place)
                        setFieldValue('address', normRes.address)
                        setFieldValue('city', normRes.city)
                        setFieldValue('country', normRes.country)
                      }}
                    />
                  </FormGroup>

                  <div className='add-client-case-note__submit-container'>
                    <Button type="submit" disabled={isSubmitting} loading={isSubmitting} intent={Intent.PRIMARY} large>
                      <b>
                        {props.update ? 'Update' : 'Submit'}
                      </b>
                    </Button>
                  </div>
                </form>
              )
            }, FIELDS)}
        </Formik>
      </div>
    </div>
  );
}

export default Location;
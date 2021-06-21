import { useEffect, useState } from 'react';
import { BreadcrumbProps, Intent } from '@blueprintjs/core';
import { Formik } from 'formik';
import { IconNames } from '@blueprintjs/icons';

import api from '../../../api';

import { AnchorButton, Button, Col, FormGroup, InputGroup, LoadingView, ModuleCard, PageHeading, Row } from '../../../components';

import './index.scss';


const BREADCRUMBS: BreadcrumbProps[] = [
  { href: '/dashboard', icon: "document", text: 'Dashboard'},
  { href: '/dashboard/clients', icon: 'document', text: "Clients" },
  { text: 'Client' }
];

const AddClient = () => {

  const [loading, setLoading] = useState(false);

  return (
    <LoadingView loading={loading}>
      <div className='client'>
        <PageHeading
          title='Client Detail'
          breadCrumbs={BREADCRUMBS}
        />
        <div className='client__container'>
          <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
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
              /* and other goodies */

            }) => (
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"First Name"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" placeholder=""/>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Middle"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" placeholder=""/>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Last Name"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" placeholder=""/>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Date Of Birth"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" placeholder=""/>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Email"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" placeholder=""/>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Sex"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" placeholder=""/>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Address 1"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" placeholder=""/>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Address 2"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" placeholder=""/>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"City"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" placeholder=""/>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"State"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" placeholder=""/>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Zip Code"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" placeholder=""/>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Phone #"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" placeholder=""/>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"SS #"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Behaviours"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Active"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Signature"}
                      labelFor="text-input"
                    >
                      <Button intent={Intent.PRIMARY}>Add Signature</Button>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Trainers"}
                      labelFor="text-input"
                    >
                      <Button intent={Intent.PRIMARY}>Add Trainers</Button>
                    </FormGroup>
                  </Col>

                  {/* ---------------------------------------------------------- */}
                  <Col>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Florida Id"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Medicaid #"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Medicare #"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Medicaid Waiver #"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Current Month Weight"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Height"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Eye Color"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Hair Color"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Legal Status"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Secondary Diagnosis"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Allergies"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Location"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Health Insurance"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Likes"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Definition of Abuse"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Witnessess"}
                      labelFor="text-input"
                    >
                      <Button intent={Intent.PRIMARY}>Add Witnessess</Button>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Services"}
                      labelFor="text-input"
                    >
                      <Button intent={Intent.PRIMARY}>Services</Button>
                    </FormGroup>
                  </Col>

                  {/* ---------------------------------------------------------- */}
                  <Col>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Effective Date"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Monthly SSI Amount"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Funds Methods"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Special Equipments"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Bank Account Name"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Bank Account Number"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Race"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Home Entry Date"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Home Discharge Date"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Religion"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Vision"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Hearing"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Mobility"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"DisLikes"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Notes"}
                      labelFor="text-input"
                      labelInfo={"(required)"}
                    >
                      <InputGroup id="text-input" />
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Custom Forms"}
                      labelFor="text-input"
                    >
                      <Button intent={Intent.PRIMARY}>Add Custom Forms</Button>
                    </FormGroup>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={"Level of Service"}
                      labelFor="text-input"
                    >
                      <Button intent={Intent.PRIMARY}>Level of Service</Button>
                    </FormGroup>
                  </Col>
                </Row>
                <Button type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </LoadingView>
  );
}

export default AddClient;
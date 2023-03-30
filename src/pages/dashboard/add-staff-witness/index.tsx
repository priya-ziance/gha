import { useContext, useState } from "react";
import { BreadcrumbProps, Button, Intent } from "@blueprintjs/core";
import { Formik, FormikHelpers } from "formik";
import get from "lodash/get";
import { Col, PageHeading, Row } from "../../../components";
import OmniContactsInput from "../../../controlled-components/OmniContactInput";
import api from "../../../api";
import URLS from "../../../utils/urls";
import ToastsContext from "../../../contexts/toasts";
import * as helpers from "./helpers";
import formikWrapper from "../../../wrappers/formik";
import { FIELDS } from "./constants";
import "./index.scss";

import { pick } from "lodash";
import { IStaffWithnessModel } from "../../../types";

interface AddStaffWitnessProps {
  staffWitness?: IStaffWithnessModel;
  update?: boolean;
}

const AddStaffWitness = (props: AddStaffWitnessProps) => {
  const [isOmniOpen, setIsOmniOpen] = useState(false);
  const [selectedMedical, setSelectedMedical] = useState<
    IStaffWithnessModel | undefined
  >(undefined);
  const clientId = "h9YwkW4gyE";
  const { addToast } = useContext(ToastsContext);
  let initialValues;

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
    {
      href: URLS.getPagePath("staff-witness", { clientId }),
      icon: "document",
      text: URLS.getPagePathName("staff-witness"),
    },
  ];

  if (props.update) {
    BREADCRUMBS.push({ text: URLS.getPagePathName("edit-staff-witness") });
  } else {
    BREADCRUMBS.push({ text: URLS.getPagePathName("add-staff-witness") });
  }

  /**
   * This assigns the client's info as the initial values if a client
   * is passed in
   */
  if (props.staffWitness) {
    initialValues = Object.assign(
      {},
      helpers.initialValues,
      pick(props.staffWitness.staffWitness, Object.keys(helpers.initialValues))
    );
  } else {
    initialValues = helpers.initialValues;
  }

  const handleSelectStaffWitnessClose = () => {
    setIsOmniOpen(false);
  };

  const onSubmit = async (values: any, options: FormikHelpers<any>) => {
    const { resetForm, setSubmitting } = options;
    setSubmitting(true);
    const staffWitnessId = get(props, "staffWitness.id", "");
    try {
      if (props.update) {
        await api.staffWitness.updateStaffWitness(staffWitnessId, values);
        addToast({
          message: "Staff Witness Updated",
          intent: Intent.SUCCESS,
        });
      } else {
        values.emp_id = clientId;
        values.image = "dasd";

        await api.staffWitness.createStaffWitness(values);
        addToast({
          message: "Staff Witness Created",
          intent: Intent.SUCCESS,
        });

        // Reset the form
        resetForm();
      }
    } catch (e: any) {
      addToast({
        message: "Something went wrong",
        intent: Intent.DANGER,
      });
    }

    setSubmitting(false);
  };

  return (
    <div className="dashboard">
      <div className="dashboard_container">
        <div className="add-staff-witness">
          <PageHeading
            title={
              props.update
                ? "Update Staff Witness Detail"
                : "Add Staff Witness Detail"
            }
            breadCrumbs={BREADCRUMBS}
          />
          <div className="add-staff-witness__container">
            <Formik
              initialValues={initialValues}
              validationSchema={helpers.validationSchema}
              onSubmit={onSubmit}
            >
              {formikWrapper(
                ({
                  wrapperProps: {
                    getDateInputFormGroup,
                    getSelectFieldInputFormGroup,
                    getInputFormGroup,
                    getAutocompleteInputFormGroup,
                    getPhoneInputFormGroup,
                  },
                  formikProps: {
                    handleSubmit,
                    isSubmitting,
                    setFieldValue,
                    validateForm,
                  },
                }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <OmniContactsInput
                        isOpen={isOmniOpen}
                        onClose={handleSelectStaffWitnessClose}
                        onSelect={(staffWitness: IStaffWithnessModel) => {
                          setFieldValue("first_name", staffWitness.firstName);
                          setFieldValue("last_name", staffWitness.lastName);
                          setFieldValue("address", staffWitness.address);
                          setFieldValue("mobile", staffWitness.mobile);
                          setFieldValue("email", staffWitness.email);
                          setFieldValue("hired_date", staffWitness.hiredDate);
                          setFieldValue("location", staffWitness.location);
                          validateForm();
                          setIsOmniOpen(false);
                          setSelectedMedical(staffWitness);
                        }}
                      />

                      <Row>
                        <Col xs={12} md={6}>
                          {getInputFormGroup("first_name", {
                            childProps: { disabled: !!selectedMedical },
                          })}
                        </Col>
                        <Col xs={12} md={6}>
                          {getInputFormGroup("last_name", {
                            childProps: { disabled: !!selectedMedical },
                          })}
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={6}>
                          {getInputFormGroup("email", {
                            childProps: { disabled: !!selectedMedical },
                          })}
                        </Col>

                        <Col xs={12} md={6}>
                          {getPhoneInputFormGroup("mobile", {
                            childProps: {
                              type: "tel",
                              disabled: !!selectedMedical,
                            },
                          })}
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={6}>
                          {getInputFormGroup("location", {
                            childProps: { disabled: !!selectedMedical },
                          })}
                        </Col>
                        <Col xs={6}>
                          {getDateInputFormGroup("hired_date", {
                            childProps: {
                              type: "date",
                              disabled: !!selectedMedical,
                            },
                          })}
                        </Col>
                      </Row>

                      <Row>
                        <Col xs={12} md={12}>
                          {getAutocompleteInputFormGroup("address", {
                            childProps: { disabled: !!selectedMedical },
                          })}
                        </Col>
                      </Row>

                      <div className="add-staff-witness__submit-container">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          loading={isSubmitting}
                          intent={Intent.PRIMARY}
                          large
                        >
                          <b>{props.update ? "Update" : "Submit"}</b>
                        </Button>
                      </div>
                    </form>
                  );
                },
                FIELDS
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStaffWitness;

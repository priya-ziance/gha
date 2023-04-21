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
import { ISeizureLogsModel } from "../../../types";
import ClientContext from "../../../contexts/client";

interface AddSeizureLogsProps {
  SeizureLogs?: ISeizureLogsModel;
  update?: boolean;
}

const AddSeizureLogs = (props: AddSeizureLogsProps) => {
  const [isOmniOpen, setIsOmniOpen] = useState(false);
  const [selectedMedical, setSelectedMedical] = useState<
    ISeizureLogsModel | undefined
  >(undefined);
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);
  let initialValues;

  const BREADCRUMBS: BreadcrumbProps[] = [
    {
      href: URLS.getPagePath("dashboard"),
      icon: "document",
      text: URLS.getPagePathName("dashboard"),
    },
    {
      href: URLS.getPagePath("logs"),
      icon: "document",
      text: URLS.getPagePathName("logs"),
    },
    {
      href: URLS.getPagePath("seizure-logs", { clientId }),
      icon: "document",
      text: URLS.getPagePathName("seizure-logs"),
    },
  ];

  if (props.update) {
    BREADCRUMBS.push({ text: URLS.getPagePathName("edit-seizure-logs") });
  } else {
    BREADCRUMBS.push({ text: URLS.getPagePathName("add-seizure-logs") });
  }

  /**
   * This assigns the client's info as the initial values if a client
   * is passed in
   */
  if (props.SeizureLogs) {
    // console.log("props.staffWitness : ", props.staffWitness)

    initialValues = Object.assign(
      {},
      helpers.initialValues,
      pick(props.SeizureLogs.seizurelogs, Object.keys(helpers.initialValues))
    );
    console.log("helper.staffWitness", initialValues);

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
          message: "seizure log Updated",
          intent: Intent.SUCCESS,
        });
      } else {
        // values.emp_id = staffWitnessId;
        values.image = "dasd";

        await api.logs.createLog(values);
        addToast({
          message: "seizure logCreated",
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
        <div className="add-seizure-log">
          <PageHeading
            title={
              props.update
                ? "Update Seizure Log"
                : "Add Seizure Log"
            }
            breadCrumbs={BREADCRUMBS}
          />
          <div className="add-seizure-log__container">
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
                        onSelect={(SeizureLogs: ISeizureLogsModel) => {
                          setFieldValue("emp_id",SeizureLogs.emp_id)
                          setFieldValue("date", SeizureLogs.date);
                          setFieldValue("time", SeizureLogs.time);
                          setFieldValue("Injuries", SeizureLogs.Injuries);
                          setFieldValue("activity_preceding", SeizureLogs.activity_preceding);
                          setFieldValue("duration", SeizureLogs.duration);
                          setFieldValue("notes", SeizureLogs.notes);
                          setFieldValue("active", SeizureLogs.active);
                          setFieldValue("patient_have_seizure", SeizureLogs.patient_have_seizure);
                          validateForm();
                          setIsOmniOpen(false);
                          setSelectedMedical(SeizureLogs);
                        }}
                      />

                      <Row>
                      <Col xs={12} md={6}>
                          {getInputFormGroup("emp_id", {
                            childProps: { disabled: !!selectedMedical },
                          })}
                        </Col>
                        <Col xs={12} md={6}>
                          {getInputFormGroup("active", {
                            childProps: { disabled: !!selectedMedical },
                          })}
                        </Col>
                        <Col xs={12} md={6}>
                          {getInputFormGroup("time", {
                            childProps: { disabled: !!selectedMedical },
                          })}
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={6}>
                          {getInputFormGroup("duration", {
                            childProps: { disabled: !!selectedMedical },
                          })}
                        </Col>
                        <Col xs={12} md={6}>
                          {getInputFormGroup("Injuries", {
                            childProps: { disabled: !!selectedMedical },
                          })}
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={6}>
                          {getInputFormGroup("activity_preceding", {
                            childProps: {
                              disabled: !!selectedMedical,
                            },
                          })}
                        </Col>
                        <Col xs={6}>
                          {getDateInputFormGroup("date", {
                            childProps: {
                              type: "date",
                              disabled: !!selectedMedical,
                            },
                          })}
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={6}>
                          {getInputFormGroup("patient_have_seizure", {
                            childProps: { disabled: !!selectedMedical },
                          })}
                        </Col>
                        <Col xs={6}>
                          {getInputFormGroup("notes", {
                            childProps: { disabled: !!selectedMedical },
                          })}
                        </Col>
                        
                      </Row>

                      {/* <Row>
                        <Col xs={12} md={12}>
                          {getAutocompleteInputFormGroup("Inguries", {
                            childProps: { disabled: !!selectedMedical },
                          })}
                        </Col>
                       
                      </Row> */}

                      <div className="add-seizure-log__submit-container">
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

export default AddSeizureLogs;

import { Classes, Intent } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { Button, Col, Dialog, Row } from "../../../components";
import { FIELDS } from "./constants";
import { IDialog } from "./types";
import { IStaffWithnessModel } from "../../../types";
import { useContext, useState } from "react";
import ToastsContext from "../../../contexts/toasts";
import * as helpers from "../add-staff-witness/helpers";
import api from "../../../api";
import { Formik, FormikHelpers } from "formik";
import formikWrapper from "../../../wrappers/formik";
import OmniContactsInput from "../../../controlled-components/OmniContactInput";
import ClientContext from "../../../contexts/client";

const StaffWitnessForm = (props: IDialog) => {
  const { isOpen, handleClose } = props;
  const [isOmniOpen, setIsOmniOpen] = useState(false);
  const [selectedMedical, setSelectedMedical] = useState<
    IStaffWithnessModel | undefined
  >(undefined);
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);
  let initialValues = helpers.initialValues;

  const handleSelectStaffWitnessClose = () => {
    setIsOmniOpen(false);
  };

  const onSubmit = async (values: any, options: FormikHelpers<any>) => {
    const { resetForm, setSubmitting } = options;
    setSubmitting(true);
    try {
      values.emp_id = clientId;
      values.image = "dasd";

      await api.staffWitness.createStaffWitness(values);
      addToast({
        message: "Staff Witness Created",
        intent: Intent.SUCCESS,
      });
      handleClose();
      // Reset the form
      resetForm();
    } catch (e: any) {
      addToast({
        message: "Something went wrong",
        intent: Intent.DANGER,
      });
    }

    setSubmitting(false);
  };

  return (
    <Dialog
      icon="info-sign"
      onClose={handleClose}
      title="Add Staff Witness Form"
      isOpen={isOpen}
    >
      <>
        <div className={`${Classes.DIALOG_BODY} add-client__levelsOfService`}>
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
                      <Tooltip2 content="This button is hooked up to close the dialog.">
                        <Button onClick={handleClose}>Close</Button>
                      </Tooltip2>
                      &nbsp;
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        loading={isSubmitting}
                        intent={Intent.PRIMARY}
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                );
              },
              FIELDS
            )}
          </Formik>
        </div>
      </>
    </Dialog>
  );
};

export default StaffWitnessForm;

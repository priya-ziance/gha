import { Classes, Intent } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { AnchorButton, Button, Col, Dialog, Row } from "../../../components";
import { FIELDS } from "./constants";
import { IDialog } from "./types";
import { IClientWithnessModel } from "../../../types";
import { useContext, useState } from "react";
import ToastsContext from "../../../contexts/toasts";
import * as helpers from "../add-client-witness/helpers";
import api from "../../../api";
import { Formik, FormikHelpers } from "formik";
import formikWrapper from "../../../wrappers/formik";
import OmniContactsInput from "../../../controlled-components/OmniContactInput";
import {
  FAMILY_CONTACT_LIST,
  MEDICAL_CONTACT_LIST,
} from "../../../utils/constants";

const ClientWitnessForm = (props: IDialog) => {
  const { isOpen, handleClose } = props;

  const [isOmniOpen, setIsOmniOpen] = useState(false);
  const [selectedMedical, setSelectedMedical] = useState<
    IClientWithnessModel | undefined
  >(undefined);
  const clientId = "h9YwkW4gyE";
  const { addToast } = useContext(ToastsContext);
  let initialValues = helpers.initialValues;

  const handleSelectClientWitnessClose = () => {
    setIsOmniOpen(false);
  };

  const onSubmit = async (values: any, options: FormikHelpers<any>) => {
    const { resetForm, setSubmitting } = options;
    setSubmitting(true);
    values.client = clientId;

    try {
      await api.clientWitness.createClientWitness(values);
      addToast({
        message: "Client Witness Created",
        intent: Intent.SUCCESS,
      });

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
      title="Add Client Witness Form"
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
                      onClose={handleSelectClientWitnessClose}
                      onSelect={(clientWitness: any) => {
                        setFieldValue("first_name", clientWitness.first_name);
                        setFieldValue("last_name", clientWitness.lastName);
                        setFieldValue("address", clientWitness.add);
                        setFieldValue("mobile", clientWitness.mobile);
                        setFieldValue("email", clientWitness.email);
                        setFieldValue(
                          "contact_type",
                          clientWitness.contactType
                        );
                        setFieldValue("hired_date", clientWitness.hiredDate);
                        setFieldValue("location", clientWitness.location);
                        validateForm();
                        setIsOmniOpen(false);
                        setSelectedMedical(clientWitness);
                      }}
                    />

                    <div className="flex flex-row items-center gap-4">
                      <div>
                        {getSelectFieldInputFormGroup("contact_type", {
                          childProps: {
                            selectOptions: [
                              ...MEDICAL_CONTACT_LIST,
                              ...FAMILY_CONTACT_LIST,
                            ],
                            capitalizeFirst: true,
                            disabled: selectedMedical,
                          },
                        })}
                      </div>
                    </div>
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

                    <div className="add-client-witness__submit-container">
                      <Tooltip2 content="This button is hooked up to close the dialog.">
                        <Button onClick={handleClose}>Close</Button>
                      </Tooltip2>
                      &nbsp;
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        loading={isSubmitting}
                        intent={Intent.PRIMARY}
                        large
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

export default ClientWitnessForm;

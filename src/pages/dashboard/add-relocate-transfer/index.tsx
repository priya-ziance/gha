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
import { IRelocateModel } from "../../../types";
import ClientContext from "../../../contexts/client";

interface RelocateProps {
  relocate?: IRelocateModel;
  update?: boolean;
}

const AddRelocatePage = (props: RelocateProps) => {
  const [isOmniOpen, setIsOmniOpen] = useState(false);
  const [selectedMedical, setSelectedMedical] = useState<
    IRelocateModel | undefined
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
      href: URLS.getPagePath("relocate", { clientId }),
      icon: "document",
      text: URLS.getPagePathName("relocate"),
    },
  ];

  if (props.update) {
    BREADCRUMBS.push({ text: URLS.getPagePathName("edit-relocate") });
  } else {
    BREADCRUMBS.push({ text: URLS.getPagePathName("add-relocate") });
  }

  if (props.relocate) {
    initialValues = Object.assign(
      {},
      helpers.initialValues,
      pick(props.relocate.relocate, Object.keys(helpers.initialValues))
    );
  } else {
    initialValues = helpers.initialValues;
  }

  const handleSelectTrainersClose = () => {
    setIsOmniOpen(false);
  };

  const onSubmit = async (values: any, options: FormikHelpers<any>) => {
    const { resetForm, setSubmitting } = options;
    setSubmitting(true);
    const relocateId: any = props.relocate?.relocate?._id


    try {
      if (props.update) {
        await api.Relocate.updateRelocate(relocateId, values);
        addToast({
          message: "Add relocate Updated",
          intent: Intent.SUCCESS,
        });
      } else {
        await api.Relocate.createRelocate({
          id: values.id,
          contact_type: values?.contact_type,
          client: values?.client,
          group_home_name: values?.group_home_name,
          phone: values?.phone,
          location: values?.location,
          home_transfer_date: values?.home_transfer_date,
        });
        addToast({
          message: "Relocate / Transfer Created",
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
  // const profilePictureUrl = get(props, 'addTrainer.image', '')

  return (
    <div className="dashboard">
      <div className="dashboard_container">
        <div className="add-trainers">
          <PageHeading
            title={
              props.update
                ? "Update Relocate / Transfer Detail"
                : "Add relocate / transfer Detail"
            }
            breadCrumbs={BREADCRUMBS}
          />
          <div className="add-trainers__container">
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
                  const profilePictureUrl = get(
                    props,
                    "client.profilePicture.publicUrl",
                    ""
                  );
                  return (
                    <form onSubmit={handleSubmit}>
                      <OmniContactsInput
                        isOpen={isOmniOpen}
                        onClose={handleSelectTrainersClose}
                        onSelect={(addRelocate: IRelocateModel) => {
                          setFieldValue("contact_type", addRelocate.contact_type);
                          setFieldValue("client", addRelocate.client);
                          setFieldValue("group_home_name", addRelocate.group_home_name);
                          setFieldValue("phone", addRelocate.phone);
                          setFieldValue("location", addRelocate.location);
                          setFieldValue("home_transfer_date", addRelocate.home_transfer_date)
                          validateForm();
                          setIsOmniOpen(false);
                          setSelectedMedical(addRelocate);
                        }}
                      />
                      <Row>
                        <Col xs={12} md={6}>
                          {getInputFormGroup("contact_type", {
                            childProps: { disabled: !!selectedMedical },
                          })}
                        </Col>
                        <Col xs={12} md={6}>
                          {getInputFormGroup("client", {
                            childProps: { disabled: !!selectedMedical },
                          })}
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={6}>
                          {getInputFormGroup("group_home_name", {
                            childProps: { disabled: !!selectedMedical },
                          })}
                        </Col>

                        <Col xs={12} md={6}>
                          {getPhoneInputFormGroup("phone", {
                            childProps: {
                              type: "tel",
                              disabled: !!selectedMedical,
                            },
                          })}
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={6}>
                          {getInputFormGroup("location", {
                            childProps: { disabled: !!selectedMedical },
                          })}
                        </Col>
                        <Col xs={12} md={6}>
                          {getDateInputFormGroup("home_transfer_date", {
                            childProps: {
                              type: "date",
                              disabled: !!selectedMedical,
                            },
                          })}
                        </Col>
                      </Row>

                      <div className="add-trianers__submit-container">
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

export default AddRelocatePage;

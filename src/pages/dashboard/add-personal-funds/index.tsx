// @ts-nocheck
import { useContext, useState } from "react";
import { BreadcrumbProps, Button, Intent } from "@blueprintjs/core";
import { Formik } from "formik";
import get from "lodash/get";
import {
  Col,
  FileInput,
  FormGroup,
  FormItemSelect,
  PageHeading,
  Row,
  Switch,
} from "../../../components";
import OmniContactsInput from "../../../controlled-components/OmniContactInput";
import api from "../../../api";
import URLS from "../../../utils/urls";
import ToastsContext from "../../../contexts/toasts";
import * as helpers from "./helpers";
import formikWrapper from "../../../wrappers/formik";
import { FIELDS, EXPENSE_TYPES } from "./constants";
import "./index.scss";
import { pick } from "lodash";
import { IPersonalFundsModel } from "../../../types";
import ClientContext from "../../../contexts/client";

interface AddPersonalFundsProps {
  addPersonalFunds?: IPersonalFundsModel;
  update?: boolean;
}

const AddPersonalFunds = (props: AddPersonalFundsProps) => {
  const [isOmniOpen, setIsOmniOpen] = useState(false);
  const [selectedMedical, setSelectedMedical] = useState<
    IPersonalFundsModel | undefined
  >(undefined);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
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
      href: URLS.getPagePath("personal_funds", { clientId }),
      icon: "document",
      text: URLS.getPagePathName("personal_funds"),
    },
  ];

  if (props.update) {
    BREADCRUMBS.push({ text: URLS.getPagePathName("edit-personal_funds") });
  } else {
    BREADCRUMBS.push({ text: URLS.getPagePathName("add-personal_funds") });
  }

  /**
   * This assigns the client's info as the initial values if a client
   * is passed in
   */

  if (props.addPersonalFunds) {
    initialValues = Object.assign(
      {},
      helpers.initialValues,
      pick(
        props.addPersonalFunds.personalFunds,
        Object.keys(helpers.initialValues)
      )
    );
    console.log("helper.addTrainer", initialValues);
  } else {
    initialValues = helpers.initialValues;
  }

  const uploadDocument = async () => {
    if (documentFile) {
      console.log("doc file", documentFile);
      return {
        uploadFile: async (file: any) => {
          console.log("file", file);

          if (file) {
            return api.files.uploadFile("h9YwkW4gyE", "image", file);
          }
        },
      };
    }
  };

  const onDocumentChange = (e: any) => {
    setDocumentFile(get(e, "target.files", [])[0]);
  };

  const getDocumentText = () => {
    if (documentFile) {
      return documentFile.name;
    } else {
      return get(props, "PersonalFunds.document.key");
    }
  };

  const handleSelectTrainersClose = () => {
    setIsOmniOpen(false);
  };

  const onSubmit = async (values: any, options: FormikHelpers<any>) => {
    const { resetForm, setSubmitting } = options;
    setSubmitting(true);
    const personalFundsId: any = get(props, "addPersonalFunds.id", "");
    if (documentFile) {
      try {
        let file = await uploadDocument();
        values.document = file;
      } catch (e: any) {}
    }
    try {
      if (props.update) {
        await api.PersonalFunds.updatePersonalFund(personalFundsId, values);
        addToast({
          message: "Personal Fund Updated",
          intent: Intent.SUCCESS,
        });
      } else {
        await api.PersonalFunds.createPersonalFund({
          id: values.id,
          document: values.document,
          active: values?.active,
          expense: values?.expense,
          expense_description: values?.expense_description,
          expense_type: values?.expense_type,
          inventory_save: values?.inventory_save,
          community_activity_save: values?.community_activity_save,
          location: values?.location,
          expense_date: values?.expense_date,
        });
        addToast({
          message: "Personal Fund Created",
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
            title={props.update ? "Update Personal Fund" : "Add Personal Fund"}
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
                    values,
                    handleSubmit,
                    handleChange,
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
                        onSelect={(personalFunds: IPersonalFundsModel) => {
                          setFieldValue("active", personalFunds.active);
                          setFieldValue(
                            "community_activity_save",
                            personalFunds.community_activity_save
                          );
                          setFieldValue("document", personalFunds.document);
                          setFieldValue("expense", personalFunds.expense);
                          setFieldValue(
                            "expense_date",
                            personalFunds.expense_date
                          );
                          setFieldValue(
                            "expense_description",
                            personalFunds.expense_description
                          );
                          // setFieldValue("expense_type", personalFunds.expense_type);
                          setFieldValue(
                            "inventory_save",
                            personalFunds.inventory_save
                          );
                          setFieldValue("location", personalFunds.location);
                          validateForm();
                          setIsOmniOpen(false);
                          setSelectedMedical(personalFunds);
                        }}
                      />

                      <Row>
                        <Col xs={12} md={12}>
                          <FormGroup intent={Intent.PRIMARY} label={"Document"}>
                            <FileInput
                              text={getDocumentText()}
                              onChange={onDocumentChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      {/* <Row>
                        <Col xs={12} md={12}>
                          {getInputFormGroup("trainer_id", {
                            childProps: { disabled: !!selectedMedical },
                          })}
                        </Col>
                      </Row> */}
                      <Row>
                        <Col xs={12} md={6}>
                          {getInputFormGroup("expense", {
                            childProps: { disabled: !!selectedMedical },
                          })}
                        </Col>
                        <Col xs={12} md={6}>
                          {getInputFormGroup("expense_description", {
                            childProps: { disabled: !!selectedMedical },
                          })}
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={6}>
                          <FormItemSelect
                            buttonText={values.expense_type}
                            items={EXPENSE_TYPES}
                            label={
                              get(FIELDS, "expense_type", { name: "" }).name
                            }
                            menuRenderer={(item) => item}
                            onFormSelectChange={handleChange("expense_type")}
                          />
                        </Col>

                        <Col xs={12} md={6}>
                          {getInputFormGroup("location", {
                            childProps: { disabled: !!selectedMedical },
                          })}
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={6}>
                          {getDateInputFormGroup("expense_date", {
                            childProps: {
                              type: "date",
                              disabled: !!selectedMedical,
                            },
                          })}
                        </Col>
                      </Row>

                      <Row>
                        <Switch
                          label="Active"
                          checked={values.active}
                          onChange={(e) => {
                            setFieldValue("active", get(e, "target.checked"));
                          }}
                        />
                        <Switch
                          label="Community Activity Save"
                          checked={values.community_activity_save}
                          onChange={(e) => {
                            setFieldValue(
                              "community_activity_save",
                              get(e, "target.checked")
                            );
                          }}
                        />
                        <Switch
                          label="Inventory Save"
                          checked={values.inventory_save}
                          onChange={(e) => {
                            setFieldValue(
                              "inventory_save",
                              get(e, "target.checked")
                            );
                          }}
                        />
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

export default AddPersonalFunds;

// @ts-nocheck
import { useContext, useEffect, useState } from "react";
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
} from "../../../components";
import OmniContactsInput from "../../../controlled-components/OmniContactInput";
import api from "../../../api";
import URLS from "../../../utils/urls";
import ToastsContext from "../../../contexts/toasts";
import * as helpers from "./helpers";
import formikWrapper from "../../../wrappers/formik";
import { FIELDS } from "./constants";
import "./index.scss";
import { pick } from "lodash";
import { IPersonalBankStatementModel } from "../../../types";
import ClientContext from "../../../contexts/client";
import Client from "../../../models/client";
import { IOptionProps } from "../add-adp/multiSelectComponent";

interface PersonalBankStatementProps {
  PersonalBankStatement?: IPersonalBankStatementModel;
  update?: boolean;
}

const AddPersonalBankStatement = (props: PersonalBankStatementProps) => {
  const [isOmniOpen, setIsOmniOpen] = useState(false);
  const [selectedClientData, setSelectedClientData] =
    useState<IOptionProps | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedMedical, setSelectedMedical] = useState<
    IPersonalBankStatementModel | undefined
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
      href: URLS.getPagePath("personal_bank_statement", { clientId }),
      icon: "document",
      text: URLS.getPagePathName("personal_bank_statement"),
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        setClients(await api.clients.getClients());
      } catch (e: any) {}
    })();
  }, []);

  if (props.update) {
    BREADCRUMBS.push({
      text: URLS.getPagePathName("edit-personal_bank_statement"),
    });
  } else {
    BREADCRUMBS.push({
      text: URLS.getPagePathName("add-personal_bank_statement"),
    });
  }

  /**
   * This assigns the client's info as the initial values if a client
   * is passed in
   */

  if (props.PersonalBankStatement) {
    initialValues = Object.assign(
      {},
      helpers.initialValues,
      pick(
        props.PersonalBankStatement.PersonalBankStatement,
        Object.keys(helpers.initialValues)
      )
    );
  } else {
    initialValues = helpers.initialValues;
  }

  const handleClose = () => {
    setIsOmniOpen(false);
  };

  const uploadDocument = async () => {
    if (documentFile) {
      return {
        uploadFile: async (file: any) => {
          if (file) {
            return api.files.uploadFile(clientId, "image", file);
          }
        },
      };
    }
  };

  const onSubmit = async (values: any, options: FormikHelpers<any>) => {
    const { resetForm, setSubmitting } = options;
   if (documentFile) {
      try {
        let file = await uploadDocument();
        values.document = file;
      } catch (e: any) {}
    }

    setSubmitting(true);
    const personalBankStatementId: any = get(
      props,
      "PersonalBankStatement.id",
      ""
    );

    try {
      if (props.update) {
        await api.personalBankStatement.updatePersonalBankStatement(
          personalBankStatementId,
          values
        );
        addToast({
          message: "Personal Bank Statement Updated",
          intent: Intent.SUCCESS,
        });
      } else {
        await api.personalBankStatement.createPersonalBankStatement({
          id: values.id,
          active: values?.active,
          document: values?.document,
          to_date: values?.to_date,
          from_date: values?.from_date,
          statement_description: values?.statement_description,
          statement_name: values?.statement_name,
          client: values?.client,
        });
        addToast({
          message: "Personal Bank Statement Created",
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

  const onDocumentChange = (e: any) => {
    setDocumentFile(get(e, "target.files", [])[0]);
  };

  const getDocumentText = () => {
    if (documentFile) {
      return documentFile.name;
    } else {
      return get(props, "MainBankStatement.document.key");
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard_container">
        <div className="PersonalBankStatement">
          <PageHeading
            title={
              props.update
                ? "Update Personal Bank Statement Detail"
                : "Add Personal Bank Statement Detail"
            }
            breadCrumbs={BREADCRUMBS}
          />
          <div className="PersonalBankStatement__container">
            <Formik
              initialValues={initialValues}
              validationSchema={helpers.validationSchema}
              onSubmit={onSubmit}
            >
              {formikWrapper(
                ({
                  wrapperProps: {
                    getDateInputFormGroup,
                    getInputFormGroup,
                    getSwitchInputFormGroup,
                  },
                  formikProps: {
                    handleSubmit,
                    isSubmitting,
                    setFieldValue,
                    validateForm,
                  },
                }) => {
                  const documentUrl = get(
                    props,
                    "client.profilePicture.publicUrl",
                    ""
                  );
                  return (
                    <form onSubmit={handleSubmit}>
                      <OmniContactsInput
                        isOpen={isOmniOpen}
                        onClose={handleClose}
                        onSelect={(
                          addPersonalBankStatement: IPersonalBankStatementModel
                        ) => {
                          setFieldValue(
                            "statement_name",
                            addPersonalBankStatement.statementName
                          );
                          setFieldValue(
                            "statement_description",
                            addPersonalBankStatement.statementDescription
                          );
                          setFieldValue(
                            "from_date",
                            addPersonalBankStatement.fromDate
                          );
                          setFieldValue(
                            "to_date",
                            addPersonalBankStatement.toDate
                          );
                          setFieldValue(
                            "active",
                            addPersonalBankStatement.active
                          );
                          validateForm();
                          setIsOmniOpen(false);
                          setSelectedMedical(addPersonalBankStatement);
                        }}
                      />

                      <Row>
                        <Col xs={12} md={6}>
                          <FormItemSelect
                            buttonText={
                              selectedClientData?.name ?? "Select Client"
                            }
                            items={clients?.map((client: Client) => {
                              return { name: client.name, id: client.id };
                            })}
                            menuRenderer={(item) => item.name}
                            onFormSelectChange={(field) => {
                              setFieldValue("client", field.id);
                              setSelectedClientData(field);
                            }}
                          />
                        </Col>
                        <Col xs={12} md={6}>
                          {getInputFormGroup("statement_name", {
                            childProps: { disabled: !!selectedMedical },
                          })}
                        </Col>
                      </Row>

                      <Row>
                        <Col xs={12} md={6}>
                          {getInputFormGroup("statement_description", {
                            childProps: { disabled: !!selectedMedical },
                          })}
                        </Col>

                        <Col xs={12} md={6}>
                          {getDateInputFormGroup("from_date", {
                            childProps: {
                              disabled: !!selectedMedical,
                            },
                          })}
                        </Col>
                      </Row>

                      <Row>
                        <Col xs={12} md={6}>
                          {getDateInputFormGroup("to_date", {
                            childProps: {
                              disabled: !!selectedMedical,
                            },
                          })}
                        </Col>
                        <Col xs={12} md={6}>
                          {getSwitchInputFormGroup("active", {
                            childProps: { disabled: !!selectedMedical },
                          })}
                        </Col>
                      </Row>

                      <Row>
                        <Col xs={12} md={6}>
                        <FormGroup
                            intent={Intent.PRIMARY}
                            label={"Upload Document"}
                          >
                            <FileInput
                              text={getDocumentText()}
                              onChange={onDocumentChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <div className="PersonalBankStatement__submit-container">
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

export default AddPersonalBankStatement;

// @ts-nocheck
import { useContext, useEffect, useState } from "react";
import { BreadcrumbProps, Button, Intent } from "@blueprintjs/core";
import { Formik } from "formik";
import get from "lodash/get";
import {
  Col,
  FormGroup,
  FormItemSelect,
  PageHeading,
  Row,
  FileInput,
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
import { IMainBankStatementModel } from "../../../types";
import ClientContext from "../../../contexts/client";
import Client from "../../../models/client";
import { IOptionProps } from "../add-adp/multiSelectComponent";

interface MainBankStatementProps {
  MainBankStatement?: IMainBankStatementModel;
  update?: boolean;
}

const AddMainBankStatement = (props: MainBankStatementProps) => {
  const [isOmniOpen, setIsOmniOpen] = useState(false);
  const [selectedClientData, setSelectedClientData] =
    useState<IOptionProps | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [selectedMainBankData, setSelectedMainBankData] = useState<
    IMainBankStatementModel | undefined
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
      href: URLS.getPagePath("main-bank-statement", { clientId }),
      icon: "document",
      text: URLS.getPagePathName("main-bank-statement"),
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        setClients(await api.clients.getClients());
      } catch (e: any) {}
    })();
  }, []);

  useEffect(() => {
    handleClientData();
  }, [props.MainBankStatement?.MainBankStatement?.client, clients]);

  const handleClientData = () => {
    if (props.MainBankStatement?.MainBankStatement?.client) {
      const clientDetails: any =
        clients.find(
          (cl) => cl.id === props.MainBankStatement?.MainBankStatement?.client
        ) || [];
      if (clientDetails)
        setSelectedClientData({
          id: clientDetails?.id ?? "",
          name: `${clientDetails?.firstName ?? ""} ${
            clientDetails?.lastName ?? ""
          }`,
        });
    }
  };

  if (props.update) {
    BREADCRUMBS.push({
      text: URLS.getPagePathName("edit-main-bank-statement"),
    });
  } else {
    BREADCRUMBS.push({ text: URLS.getPagePathName("add-main-bank-statement") });
  }

  /**
   * This assigns the client's info as the initial values if a client
   * is passed in
   */

  if (props.MainBankStatement) {
    initialValues = Object.assign(
      {},
      helpers.initialValues,
      pick(
        props.MainBankStatement.MainBankStatement,
        Object.keys(helpers.initialValues)
      )
    );
  } else {
    initialValues = helpers.initialValues;
  }

  const handleSelectTrainersClose = () => {
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
    const mainAccountId: any = get(props, "MainBankStatement.id", "");

    try {
      if (props.update) {
        await api.mainAccount.updateMainAccount(mainAccountId, values);
        addToast({
          message: "Main Bank Statement Updated",
          intent: Intent.SUCCESS,
        });
      } else {
        await api.mainAccount.createMainAccount({
          id: values.id,
          document: values?.document,
          client: values?.client,
          statement_name: values?.statement_name,
          statement_description: values?.statement_description,
          from_date: values?.from_date,
          to_date: values?.to_date,
          active: values?.active,
        });
        addToast({
          message: "Main Bank Statement Created",
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
        <div className="MainBankStatement">
          <PageHeading
            title={
              props.update
                ? "Update Main Bank Statement Detail"
                : "Add Main Bank Statement Detail"
            }
            breadCrumbs={BREADCRUMBS}
          />
          <div className="MainBankStatement__container">
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
                  return (
                    <form onSubmit={handleSubmit}>
                      <OmniContactsInput
                        isOpen={isOmniOpen}
                        onClose={handleSelectTrainersClose}
                        onSelect={(addMainAccount: IMainBankStatementModel) => {
                          setFieldValue("active", addMainAccount.active);
                          setFieldValue(
                            "statement_name",
                            addMainAccount.statementName
                          );
                          setFieldValue(
                            "statement_description",
                            addMainAccount.statementDescription
                          );
                          // setFieldValue("document", addMainAccount.document);
                          setFieldValue("to_date", addMainAccount.toDate);
                          setFieldValue("from_date", addMainAccount.fromDate);
                          validateForm();
                          setIsOmniOpen(false);
                          setSelectedMainBankData(addMainAccount);
                        }}
                      />

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
                      </Row>

                      <Row>
                        <Col xs={12} md={6}>
                          {getInputFormGroup("statement_name", {
                            childProps: { disabled: !!selectedMainBankData },
                          })}
                        </Col>

                        <Col xs={12} md={6}>
                          {getInputFormGroup("statement_description", {
                            childProps: { disabled: !!selectedMainBankData },
                          })}
                        </Col>
                      </Row>

                      <Row>
                        <Col xs={12} md={6}>
                          {getDateInputFormGroup("from_date", {
                            childProps: { disabled: !!selectedMainBankData },
                          })}
                        </Col>

                        <Col xs={12} md={6}>
                          {getDateInputFormGroup("to_date", {
                            childProps: { disabled: !!selectedMainBankData },
                          })}
                        </Col>
                      </Row>

                      <Row>
                        <Col xs={12} md={6}>
                          {getSwitchInputFormGroup("active", {
                            childProps: { disabled: !!selectedMainBankData },
                          })}
                        </Col>
                      </Row>

                      <div className="MainBankStatement__submit-container">
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

export default AddMainBankStatement;

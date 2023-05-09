// @ts-nocheck
import { useContext, useEffect, useState } from "react";
import { BreadcrumbProps, Button, Intent } from "@blueprintjs/core";
import { Formik, FormikHelpers } from "formik";
import get from "lodash/get";
import {
  Col,
  FileDropzone,
  FormGroup,
  FormItemSelect,
  ImageDropzone,
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
import { IDischargeModel } from "../../../types";
import ClientContext from "../../../contexts/client";
import { IOptionProps } from "../add-adp/multiSelectComponent";
import Client from "../../../models/client";

interface AddDichargeProps {
  discharges?: IDischargeModel;
  update?: boolean;
}

const AddDischarge = (props: AddDichargeProps) => {
  const [isOmniOpen, setIsOmniOpen] = useState(false);
  const [selectedDischarge, setSelectedDischarge] = useState<
    IDischargeModel | undefined
  >(undefined);
  const [selectedClientData, setSelectedClientData] =
    useState<IOptionProps | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);
  let initialValues;

  useEffect(() => {
    (async () => {
      try {
        setClients(await api.clients.getClients());
      } catch (e: any) {}
    })();
  }, []);

  useEffect(
    async() => {
      if (props?.discharges?.discharge?.client) {
        const clientData = clients?.find(
          (clientDetails) =>
            clientDetails?.id === props?.discharges?.discharge?.client
        );
        if (clientData)
       setSelectedClientData({
            name: `${clientData?.firstName} ${clientData?.lastName}` || "",
            id: clientData.id,
          });
      }
    },
    [props?.discharges?.discharge?.client]
  );

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
      href: URLS.getPagePath("discharge", { clientId }),
      icon: "document",
      text: URLS.getPagePathName("discharge"),
    },
  ];

  if (props.update) {
    BREADCRUMBS.push({ text: URLS.getPagePathName("edit-discharge") });
  } else {
    BREADCRUMBS.push({ text: URLS.getPagePathName("add-discharge") });
  }

  /**
   * This assigns the client's info as the initial values if a client
   * is passed in
   */

  if (props.discharges) {
    initialValues = Object.assign(
      {},
      helpers.initialValues,
      pick(props.discharges.discharge, Object.keys(helpers.initialValues))
    );
  } else {
    initialValues = helpers.initialValues;
  }

  const handleSelectDischargeClose = () => {
    setIsOmniOpen(false);
  };
  const onSubmit = async (values: any, options: FormikHelpers<any>) => {
    const { resetForm, setSubmitting } = options;
    setSubmitting(true);
    const dischargeId: any = get(props, "discharges.id", "");
    try {
      if (props.update) {
        await api.Discharge.updateDischarge(dischargeId, values);
        addToast({
          message: "Add Home Discharge Updated",
          intent: Intent.SUCCESS,
        });
      } else {
        await api.Discharge.createDischarge({
          id: values.id,
          home_discharge_date: values?.home_discharge_date,
          client: values?.client,
          organization_name: values?.organization_name,
          organization_location: values?.organization_location,
          organization_phone: values?.organization_phone,
          organization_main_contact: values?.organization_main_contact,
        });
        addToast({
          message: "Home Discharge Created",
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
        <div className="add-discharge">
          <PageHeading
            title={
              props.update
                ? "Update Discharge's Detail"
                : "Add Discharge's Detail"
            }
            breadCrumbs={BREADCRUMBS}
          />
          <div className="add-discharge__container">
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {formikWrapper(
                ({
                  wrapperProps: {
                    getDateInputFormGroup,
                    getInputFormGroup,
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
                        onClose={handleSelectDischargeClose}
                        onSelect={(addDischarge: IDischargeModel) => {
                          setFieldValue(
                            "home_discharge_date",
                            addDischarge.homeDischargeDate
                          );
                          setFieldValue(
                            "organization_name",
                            addDischarge.organizationName
                          );
                          setFieldValue(
                            "organization_location",
                            addDischarge.organizationLocation
                          );
                          setFieldValue(
                            "organization_phone",
                            addDischarge.organizationPhone
                          );
                          setFieldValue(
                            "organization_main_contact",
                            addDischarge.organizationMainContact
                          );
                          validateForm();
                          setIsOmniOpen(false);
                          setSelectedDischarge(addDischarge);
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
                          {getDateInputFormGroup("home_discharge_date", {
                            childProps: { disabled: !!selectedDischarge },
                          })}
                        </Col>
                      </Row>

                      <Row>
                        <Col xs={12} md={6}>
                          {getInputFormGroup("organization_name", {
                            childProps: { disabled: !!selectedDischarge },
                          })}
                        </Col>
                        <Col xs={12} md={6}>
                          {getInputFormGroup("organization_location", {
                            childProps: { disabled: !!selectedDischarge },
                          })}
                        </Col>
                      </Row>

                      <Row>
                        <Col xs={12} md={6}>
                          {getPhoneInputFormGroup("organization_phone", {
                            childProps: { disabled: !!selectedDischarge },
                          })}
                        </Col>

                        <Col xs={12} md={6}>
                          {getPhoneInputFormGroup("organization_main_contact", {
                            childProps: {
                              disabled: !!selectedDischarge,
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

export default AddDischarge;

import { useContext, useState, useEffect, useRef } from "react";
import { BreadcrumbProps, Button, Intent } from "@blueprintjs/core";
import { Field, Formik, FormikHelpers } from "formik";
import get from "lodash/get";
import {
  Col,
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
import { IAddAdpModel } from "../../../types";
import ClientContext from "../../../contexts/client";
import Client from "../../../models/client";
import MultiSelectComponent, {
  IOptionProps,
  ISelectedOptionProps,
} from "./multiSelectComponent";

interface AddAdpProps {
  adp?: IAddAdpModel;
  update?: boolean;
}

const AddAdp = (props: AddAdpProps) => {
  const [isOmniOpen, setIsOmniOpen] = useState(false);
  const [selectedClientData, setSelectedClientData] =
    useState<IOptionProps | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedAdp, setSelectedAdp] = useState<IAddAdpModel | undefined>(
    undefined
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownEmpRef = useRef<HTMLDivElement>(null);
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
      href: URLS.getPagePath("adp", { clientId }),
      icon: "document",
      text: URLS.getPagePathName("adp"),
    },
  ];

  if (props.update) {
    BREADCRUMBS.push({ text: URLS.getPagePathName("edit-adp") });
  } else {
    BREADCRUMBS.push({ text: URLS.getPagePathName("add-adp") });
  }

  useEffect(() => {
    (async () => {
      try {
        setClients(await api.clients.getClients());
      } catch (e: any) {}
    })();
  }, []);

  /**
   * This assigns the client's info as the initial values if a client
   * is passed in
   */

  if (props.adp) {
    initialValues = Object.assign(
      {},
      helpers.initialValues,
      pick(props.adp.adp, Object.keys(helpers.initialValues))
    );
  } else {
    initialValues = helpers.initialValues;
  }

  const handleSelectAdpClose = () => {
    setIsOmniOpen(false);
  };

  const onSubmit = async (values: any, options: FormikHelpers<any>) => {
    const { resetForm, setSubmitting } = options;
    setSubmitting(true);
    const adpId: any = get(props, "adp.id", "");
    try {
      if (props.update) {
        await api.ADP.updateAdp(adpId, values);
        addToast({
          message: "Add ADP Updated",
          intent: Intent.SUCCESS,
        });
      } else {
        await api.ADP.createAdp({
          id: values.id,
          client: values.client,
          first_name: values.first_name,
          last_name: values.last_name,
          clients_involved: values.clients_involved,
          employee_involved: values.employee_involved,
          incident_date: values.incident_date,
          incident_time: values.incident_time,
          contry: values.contry,
          notified: values.notified,
          critical_incident: values.critical_incident,
          critical_incident_type: values.critical_incident_type,
          reportable_incident: values.reportable_incident,
          reportable_incident_type: values.reportable_incident_type,
          name_of_facility: values.name_of_facility,
          address: values.address,
          telephone: values.telephone,
          report_date: values.report_date,
          event_description: values.event_description,
          person_report: values.person_report,
          reported_person_phone: values.reported_person_phone,
          review_supervisor: values.review_supervisor,
          review_supervisor_phone: values.review_supervisor_phone,
          // Waiver_support_cordinator: values.Waiver_support_cordinator,
          // Waiver_support_cordinator_phone:
          //   values.Waiver_support_cordinator_phone,
        });
        addToast({
          message: "Add ADP Created",
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

  const optionArr: IOptionProps[] =
    clients.length > 0
      ? (clients.filter((f) => {
          return {
            id: f.id as string,
            name: `${f.firstName} ${f.lastName}` as string,
          };
        }) as any)
      : [];

  return (
    <div className="dashboard">
      <div className="dashboard_container">
        <div className="add-adp">
          <PageHeading
            title={props.update ? "Update ADP's Detail" : "Add ADP's Detail"}
            breadCrumbs={BREADCRUMBS}
          />
          <div className="add-adp__container">
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {formikWrapper(
                ({
                  wrapperProps: {
                    getDateInputFormGroup,
                    getInputFormGroup,
                    getAutocompleteInputFormGroup,
                    getPhoneInputFormGroup,
                    getTimeInputFormGroup,
                    getSwitchInputFormGroup,
                  },
                  formikProps: {
                    handleSubmit,
                    isSubmitting,
                    setFieldValue,
                    validateForm,
                    values,
                  },
                }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <OmniContactsInput
                        isOpen={isOmniOpen}
                        onClose={handleSelectAdpClose}
                        onSelect={(addAdp: IAddAdpModel) => {
                          setFieldValue("first_name", addAdp.firstName);
                          setFieldValue("last_name", addAdp.lastName);
                          setFieldValue(
                            "clients_involved",
                            addAdp.clientsInvolved
                          );
                          setFieldValue(
                            "employee_involved",
                            addAdp.employeeInvolved
                          );
                          setFieldValue("incident_date", addAdp.incidentDate);
                          setFieldValue("incident_time", addAdp.incidentTime);
                          setFieldValue("contry", addAdp.contry);
                          setFieldValue("notified", addAdp.notified);
                          setFieldValue(
                            "critical_incident",
                            addAdp.criticalIncident
                          );
                          setFieldValue(
                            "critical_incident_type",
                            addAdp.criticalIncidentType
                          );
                          setFieldValue(
                            "reportable_incident",
                            addAdp.reportableIncident
                          );
                          setFieldValue(
                            "reportable_incident_type",
                            addAdp.reportableIncidentType
                          );
                          setFieldValue(
                            "name_of_facility",
                            addAdp.nameOfFacility
                          );
                          setFieldValue("address", addAdp.address);
                          setFieldValue("telephone", addAdp.telephone);
                          setFieldValue("report_date", addAdp.reportDate);
                          setFieldValue(
                            "event_description",
                            addAdp.eventDescription
                          );
                          setFieldValue("person_report", addAdp.personReport);
                          setFieldValue(
                            "reported_person_phone",
                            addAdp.reportedPersonPhone
                          );
                          setFieldValue(
                            "review_supervisor",
                            addAdp.reviewSupervisor
                          );
                          setFieldValue(
                            "review_supervisor_phone",
                            addAdp.reviewSupervisorPhone
                          );
                          // setFieldValue(
                          //   "Waiver_support_cordinator",
                          //   addAdp.waiverSupportCordinator
                          // );
                          // setFieldValue(
                          //   "Waiver_support_cordinator_phone",
                          //   addAdp.waiverSupportCordinatorPhone
                          // );
                          validateForm();
                          setIsOmniOpen(false);
                          setSelectedAdp(addAdp);
                        }}
                      />
                      <Row>
                        <Col xs={12} md={6}>
                          {getInputFormGroup("first_name", {
                            childProps: { disabled: !!selectedAdp },
                          })}
                        </Col>
                        <Col xs={12} md={6}>
                          {getInputFormGroup("last_name", {
                            childProps: { disabled: !!selectedAdp },
                          })}
                        </Col>
                      </Row>

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
                          <label htmlFor="clients_involved">
                            Clients Involved #
                          </label>
                          <MultiSelectComponent
                            selectRef={dropdownRef}
                            options={optionArr}
                            selectedData={values?.clients_involved || []}
                            getSeletcedData={(
                              selctedData: ISelectedOptionProps[]
                            ) => setFieldValue("clients_involved", selctedData)}
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col xs={12} md={6}>
                          <label htmlFor="employee_involved">
                            Employees Involved #
                          </label>
                          <MultiSelectComponent
                            selectRef={dropdownEmpRef}
                            options={optionArr}
                            selectedData={values?.employee_involved || []}
                            getSeletcedData={(
                              selctedData: ISelectedOptionProps[]
                            ) =>
                              setFieldValue("employee_involved", selctedData)
                            }
                          />
                        </Col>

                        <Col xs={12} md={6}>
                          {getDateInputFormGroup("incident_date", {
                            childProps: {
                              disabled: !!selectedAdp,
                            },
                          })}
                        </Col>
                      </Row>

                      <Row>
                        <Col xs={12} md={6}>
                          {getTimeInputFormGroup("incident_time", {
                            childProps: {
                              disabled: !!selectedAdp,
                            },
                          })}
                        </Col>
                        <Col xs={12} md={6}>
                          {getInputFormGroup("contry", {
                            childProps: {
                              disabled: !!selectedAdp,
                            },
                          })}
                        </Col>
                      </Row>

                      <Row>
                        <Col xs={12} md={6}>
                          {getSwitchInputFormGroup("notified", {
                            childProps: { disabled: !!selectedAdp },
                          })}
                        </Col>

                        <Col xs={12} md={6}>
                          {getSwitchInputFormGroup("critical_incident", {
                            childProps: { disabled: !!selectedAdp },
                          })}
                        </Col>
                      </Row>

                      <Row>
                        <Col xs={12} md={6}>
                          {getInputFormGroup("critical_incident_type", {
                            childProps: { disabled: !!selectedAdp },
                          })}
                        </Col>

                        <Col xs={12} md={6}>
                          {getSwitchInputFormGroup("reportable_incident", {
                            childProps: { disabled: !!selectedAdp },
                          })}
                        </Col>
                      </Row>

                      <Row>
                        <Col xs={12} md={6}>
                          {getInputFormGroup("reportable_incident_type", {
                            childProps: { disabled: !!selectedAdp },
                          })}
                        </Col>

                        <Col xs={12} md={6}>
                          {getInputFormGroup("name_of_facility", {
                            childProps: { disabled: !!selectedAdp },
                          })}
                        </Col>
                      </Row>

                      <Row>
                        <Col xs={12} md={6}>
                          {getAutocompleteInputFormGroup("address", {
                            childProps: {
                              disabled: !!selectedAdp,
                            },
                          })}
                        </Col>

                        <Col xs={12} md={6}>
                          {getPhoneInputFormGroup("telephone", {
                            childProps: {
                              disabled: !!selectedAdp,
                            },
                          })}
                        </Col>
                      </Row>

                      <Row>
                        <Col xs={12} md={6}>
                          {getDateInputFormGroup("report_date", {
                            childProps: {
                              disabled: !!selectedAdp,
                            },
                          })}
                        </Col>

                        <Col xs={12} md={6}>
                          {getInputFormGroup("event_description", {
                            childProps: {
                              disabled: !!selectedAdp,
                            },
                          })}
                        </Col>
                      </Row>

                      <Row>
                        <Col xs={12} md={6}>
                          {getInputFormGroup("person_report", {
                            childProps: { disabled: !!selectedAdp },
                          })}
                        </Col>

                        <Col xs={12} md={6}>
                          {getPhoneInputFormGroup("reported_person_phone", {
                            childProps: {
                              type: "tel",
                              disabled: !!selectedAdp,
                            },
                          })}
                        </Col>
                      </Row>

                      <Row>
                        <Col xs={12} md={6}>
                          {getInputFormGroup("review_supervisor", {
                            childProps: { disabled: !!selectedAdp },
                          })}
                        </Col>

                        <Col xs={12} md={6}>
                          {getPhoneInputFormGroup("review_supervisor_phone", {
                            childProps: {
                              disabled: !!selectedAdp,
                            },
                          })}
                        </Col>
                      </Row>

                      <Row>
                        <Col xs={12} md={6}>
                          {/* {getInputFormGroup("Waiver_support_cordinator", {
                            childProps: { disabled: !!selectedAdp },
                          })} */}
                        </Col>

                        <Col xs={12} md={6}>
                          {getPhoneInputFormGroup(
                            "Waiver_support_cordinator_phone",
                            {
                              childProps: {
                                type: "tel",
                                disabled: !!selectedAdp,
                              },
                            }
                          )}
                        </Col>
                      </Row>

                      <div className="add-adp__submit-container">
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

export default AddAdp;

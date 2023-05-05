import { useContext, useState } from "react";
import { BreadcrumbProps, Button, Intent } from "@blueprintjs/core";
import { Formik, FormikHelpers } from "formik";
import get from "lodash/get";
import { Col, FileDropzone, FormGroup, ImageDropzone, PageHeading, Row } from "../../../components";
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

interface PersonalBankStatementProps {
  PersonalBankStatement?: IPersonalBankStatementModel;
  update?: boolean;
}

const AddPersonalBankStatement = (props: PersonalBankStatementProps) => {
  const [isOmniOpen, setIsOmniOpen] = useState(false);
  const [selectedMedical, setSelectedMedical] = useState<
    IPersonalBankStatementModel | undefined
  >(undefined);
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(null);
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

  if (props.update) {
    BREADCRUMBS.push({ text: URLS.getPagePathName("edit-personal_bank_statement") });
  } else {
    BREADCRUMBS.push({ text: URLS.getPagePathName("add-personal_bank_statement") });
  }

  /**
   * This assigns the client's info as the initial values if a client
   * is passed in
   */


  if (props.PersonalBankStatement) {
    initialValues = Object.assign(
      {},
      helpers.initialValues,
      pick(props.PersonalBankStatement.PersonalBankStatement, Object.keys(helpers.initialValues))
    );
    console.log("helper.addTrainer", initialValues);    
  } else {
    initialValues = helpers.initialValues;
  }



  const handleSelectTrainersClose = () => {
    setIsOmniOpen(false);
  };

  const uploadFile = async (file: any) => {
    if (file) {
      return api.files.uploadFile("h9YwkW4gyE", 'image', file);
    }
  }
  const setProfilePicture = (files: File[]) => {
    setProfilePictureFile(files[0]);
  };
  const onSubmit = async (values: any, options: FormikHelpers<any>) => {
    console.log("values", values);
    if (profilePictureFile) {
      console.log("profilePictureFile : " , profilePictureFile)
      let file: any = await uploadFile(profilePictureFile);
      console.log("upload profilePictureFile : ", JSON.stringify(file));
      values.image = file?.id;
    }

    const { resetForm, setSubmitting } = options;
    setSubmitting(true);
    const trianersId :any= get(props, "trainers.id", "");
    console.log("id", trianersId);

    try {
      if (props.update) {
        await api.Trainers.updateTrainer(trianersId, values);
        addToast({
          message: "Personal Bank Statement Updated",
          intent: Intent.SUCCESS,
        });
      }else {
        // values.emp_id = clientId;
        // values.image = "new";
        // await api.Trainers.createTrainer({values,image: values?.image});
        await api.Trainers.createTrainer({
          id: values.id,
          image: values?.image,
          email: values?.email,
          first_name: values?.first_name,
          last_name: values?.last_name,
          address: values?.address,
          mobile: values?.mobile,
          location: values?.location,
          hired_date: values?.hired_date,
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
  // const profilePictureUrl = get(props, 'addTrainer.image', '')

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
                        onSelect={(addTrainer: IPersonalBankStatementModel) => {
                          setFieldValue("first_name", addTrainer.firstName);
                          setFieldValue("last_name", addTrainer.lastName);
                          setFieldValue("address", addTrainer.address);
                          setFieldValue("mobile", addTrainer.mobile);
                          setFieldValue("email", addTrainer.email);
                          setFieldValue("hired_date", addTrainer.hiredDate);
                          setFieldValue("location", addTrainer.location);
                          validateForm();
                          setIsOmniOpen(false);
                          setSelectedMedical(addTrainer);
                        }}
                      />

                      <Row>
                        <Col xs={12} md={12}>
                        <FormGroup
                            intent={Intent.PRIMARY}
                            label={"User Image"}
                          >
                            <ImageDropzone
                              files={
                                profilePictureFile ? [profilePictureFile] : []
                              }
                              setFiles={setProfilePicture}
                              imagesUrls={
                                profilePictureUrl ? [profilePictureUrl] : []
                              }
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
                        <Col xs={12} md={6}>
                          {getInputFormGroup("location", {
                            childProps: { disabled: !!selectedMedical },
                          })}
                        </Col>
                        <Col xs={12} md={6}>
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

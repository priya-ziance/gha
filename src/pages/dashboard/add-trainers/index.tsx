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
import { IAddTrainerModel } from "../../../types";
import ClientContext from "../../../contexts/client";

interface AddTrainersProps {
  trainers?: IAddTrainerModel;
  update?: boolean;
}

const AddTrainers = (props: AddTrainersProps) => {
  const [isOmniOpen, setIsOmniOpen] = useState(false);
  const [selectedMedical, setSelectedMedical] = useState<
    IAddTrainerModel | undefined
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
      href: URLS.getPagePath("trainer", { clientId }),
      icon: "document",
      text: URLS.getPagePathName("trainer"),
    },
  ];

  if (props.update) {
    BREADCRUMBS.push({ text: URLS.getPagePathName("edit-trainer") });
  } else {
    BREADCRUMBS.push({ text: URLS.getPagePathName("add-trainer") });
  }

  /**
   * This assigns the client's info as the initial values if a client
   * is passed in
   */


  if (props.trainers) {
    initialValues = Object.assign(
      {},
      helpers.initialValues,
      pick(props.trainers.trainer, Object.keys(helpers.initialValues))
    );
    console.log("helper.addTrainer", initialValues);    
  } else {
    initialValues = helpers.initialValues;
  }



  const handleSelectTrainersClose = () => {
    setIsOmniOpen(false);
  };

  const uploadFile = async (file: File) => {
    if (file) {
      // const filess = api.files.uploadFile(get(props, 'addTrainer.id'), 'image', file);
      // return console.log("file hi file", filess);
      return console.log("file hi file");

    }
  }
  const setProfilePicture = (files: File[]) => {
    console.log("all sert");

    setProfilePictureFile(files[0]);
    console.log("setted");

  }
  const onSubmit = async (values: any, options: FormikHelpers<any>) => {
    console.log("values", values);

    if (profilePictureFile) {
      let file = await uploadFile(profilePictureFile);
      values.image = file;
    }
    const { resetForm, setSubmitting } = options;
    setSubmitting(true);
    const addTrianersId = get(props, "addTrainers.id", "");
    console.log("id", addTrianersId);

    try {
      if (props.update) {
        await api.Trainers.updateTrainer(addTrianersId, values);
        addToast({
          message: "Add Trainer Updated",
          intent: Intent.SUCCESS,
        });
      } else {
        values.image = "";
        await api.Trainers.createTrainer(values);
        addToast({
          message: "Add Trainer Created",
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
  const profilePictureUrl = get(props, 'addTrainer.image', '')

  return (
    <div className="dashboard">
      <div className="dashboard_container">
        <div className="add-trainers">
          <PageHeading
            title={
              props.update
                ? "Update Trainer's Detail"
                : "Add Trainer's Detail"
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
                  return (
                    <form onSubmit={handleSubmit}>
                      <OmniContactsInput
                        isOpen={isOmniOpen}
                        onClose={handleSelectTrainersClose}
                        onSelect={(addTrainer: IAddTrainerModel) => {
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
                            label={'Trainer Image'}
                          >
                            <ImageDropzone
                              files={profilePictureFile ? [profilePictureFile] : []}
                              setFiles={setProfilePicture}
                              imagesUrls={profilePictureUrl ? [profilePictureUrl] : []}
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

export default AddTrainers;

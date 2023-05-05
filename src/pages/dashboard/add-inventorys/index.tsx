import { useContext, useState } from "react";
import { BreadcrumbProps, Button, Intent } from "@blueprintjs/core";
import { Formik, FormikHelpers } from "formik";
import get from "lodash/get";
import {
  Col,
  FileDropzone,
  FormGroup,
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

import ClientContext from "../../../contexts/client";
import { IAddInventoryModel } from "../../../types";

interface AddInventorysProps {
  inventorys?: IAddInventoryModel;
  update?: boolean;
}

const AddInventorys = (props: AddInventorysProps) => {
  const [isOmniOpen, setIsOmniOpen] = useState(false);
  const [selectedMedical, setSelectedMedical] = useState<
    IAddInventoryModel | undefined
  >(undefined);
  const [profilePictureFile, setProfilePictureFile] = useState<File | null>(
    null
  );
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
      href: URLS.getPagePath("inventory", { clientId }),
      icon: "document",
      text: URLS.getPagePathName("inventory"),
    },
  ];

  if (props.update) {
    BREADCRUMBS.push({ text: URLS.getPagePathName("edit-inventory") });
  } else {
    BREADCRUMBS.push({ text: URLS.getPagePathName("add-inventory") });
  }

  /**
   * This assigns the client's info as the initial values if a client
   * is passed in
   */

  if (props.inventorys) {
    initialValues = Object.assign(
      {},
      helpers.initialValues,
      pick(props.inventorys.inventory, Object.keys(helpers.initialValues))
    );
    console.log("helper.addInventory", initialValues);
  } else {
    initialValues = helpers.initialValues;
  }

  const handleSelectInventorysClose = () => {
    setIsOmniOpen(false);
  };

  const uploadFile = async (file: any) => {
    if (file) {
      return api.files.uploadFile("h9YwkW4gyE", "image", file);
    }
  };
  const setProfilePicture = (files: File[]) => {
    setProfilePictureFile(files[0]);
  };
  const onSubmit = async (values: any, options: FormikHelpers<any>) => {
    console.log("values", values);
    if (profilePictureFile) {
      console.log("profilePictureFile : ", profilePictureFile);
      let file: any = await uploadFile(profilePictureFile);
      console.log("upload profilePictureFile : ", JSON.stringify(file));
      values.image = file?.id;
    }

    const { resetForm, setSubmitting } = options;
    setSubmitting(true);
    const inventorysId: any = get(props, "inventorys.id", "");
    console.log("id", inventorysId);

    try {
      if (props.update) {
        await api.Inventorys.updateInventory(inventorysId, 
          {  
          item: values?.item,
          quantity: Number( values?.quantity),
          description: values?.description,
          notes: values?.notes,
          purchase_date: values?.purchase_date,});
        addToast({
          message: "Add Inventory Updated",
          intent: Intent.SUCCESS,
        });
      } else {
        await api.Inventorys.createInventory({
          // id: values.id,
          item: values?.item,
          quantity: Number( values?.quantity),
          description: values?.description,
          notes: values?.notes,
          purchase_date: values?.purchase_date,
        });
        addToast({
          message: "Add Inventory Created",
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
        <div className="add-inventorys">
          <PageHeading
            title={
              props.update
                ? "Update Inventory's Detail"
                : "Add  Inventory's Detail"
            }
            breadCrumbs={BREADCRUMBS}
          />
          <div className="add-inventorys__container">
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
                  // const profilePictureUrl = get(
                  //   props,
                  //   "client.profilePicture.publicUrl",
                  //   ""
                  // );
                  return (
                    <form onSubmit={handleSubmit}>
                      <OmniContactsInput
                        isOpen={isOmniOpen}
                        onClose={handleSelectInventorysClose}
                        onSelect={(addInventory: IAddInventoryModel) => {
                          setFieldValue("item", addInventory.id);
                          setFieldValue("quantity", addInventory.quantity);
                          setFieldValue("notes", addInventory.notes);
                          setFieldValue("description",addInventory.description)
                          setFieldValue("purchase_date",addInventory.purchase_date);
                          validateForm();
                          setIsOmniOpen(false);
                          setSelectedMedical(addInventory);
                        }}
                      />

                      <Row>
                        <Col xs={12} md={6}>
                          {getInputFormGroup("item", {
                            childProps: { disabled: !!selectedMedical },
                          })}
                        </Col>
                        <Col xs={12} md={6}>
                          {getInputFormGroup("quantity", {
                            childProps: { disabled: !!selectedMedical },
                          })}
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={6}>
                          {getInputFormGroup("description", {
                            childProps: { disabled: !!selectedMedical },
                          })}
                        </Col>

                        <Col xs={12} md={6}>
                          {getInputFormGroup("notes", {
                            childProps: {
                              type: "notes",
                              disabled: !!selectedMedical,
                            },
                          })}
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12} md={6}>
                          {getDateInputFormGroup("purchase_date", {
                            childProps: {
                              type: "date",
                              disabled: !!selectedMedical,
                            },
                          })}
                        </Col>
                      </Row>

                      <div className="add-inventorys__submit-container">
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

export default AddInventorys;

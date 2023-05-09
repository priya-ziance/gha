import { useContext } from "react";
import { BreadcrumbProps, Intent } from "@blueprintjs/core";
import { Formik } from "formik";
import get from "lodash/get";
import pick from "lodash/pick";

import {
  IRecurringExpenseModel,
  RECURRING_EXPENSES_FIELDS_TYPE,
} from "../../../types";

import api from "../../../api";

import URLS from "../../../utils/urls";

import {
  Button,
  FormGroup,
  FormItemSelect,
  NumericInput,
  PageHeading,
  Switch,
  TextArea,
} from "../../../components";

import ClientContext from "../../../contexts/client";
import ToastsContext from "../../../contexts/toasts";

import * as helpers from "./helpers";

import { EXPENSE_TYPES, FIELDS } from "./constants";

import "./index.scss";

interface IAddRecurringExpenseProps {
  recurringExpense?: IRecurringExpenseModel;
  update?: boolean;
}

const AddRecurringExpensePage = (props: IAddRecurringExpenseProps) => {
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
      href: URLS.getPagePath("expenses", { clientId }),
      icon: "document",
      text: URLS.getPagePathName("expenses"),
    },
    {
      href: URLS.getPagePath("recurring-expense", { clientId }),
      icon: "document",
      text: URLS.getPagePathName("recurring-expense"),
    },
  ];
  if (props.update) {
    BREADCRUMBS.push({ text: URLS.getPagePathName("edit-recurring-expense") });
  } else {
    BREADCRUMBS.push({ text: URLS.getPagePathName("add-recurring-expense") });
  }
  const getErrorToast = (message: string) => {
    return <CreateExpenseErrorToast message={message} />;
  };

  const CreateExpenseSuccessToast = (
    <>
      <strong>Success</strong>
      <div>
        {props.update
          ? "Recurring Expense updated successfully"
          : "Recurring Expense created successfully"}
      </div>
    </>
  );

  const CreateExpenseErrorToast = (props: any) => (
    <>
      <strong>Error</strong>
      <div> {props.message} </div>
    </>
  );

  /**
   * This assigns the expense's info as the initial values if a client
   * is passed in
   */
  if (props.recurringExpense) {
    initialValues = Object.assign(
      {},
      helpers.initialValues,
      pick(
        props.recurringExpense.recurringExpense,
        Object.keys(helpers.initialValues)
      )
    );
  } else {
    initialValues = helpers.initialValues;
  }

  return (
    <div className="add-recurring-expense">
      <PageHeading
        title={
          props.update ? "Update Recurring Expense" : "Add Recurring Expense"
        }
        breadCrumbs={BREADCRUMBS}
      />
      <div className="add-recurring-expense__container">
        <Formik
          initialValues={initialValues}
          validationSchema={helpers.validationSchema}
          onSubmit={async (values, { resetForm, setSubmitting }) => {
            setSubmitting(true);
            try {
              if (props.update) {
                const recurringExpenseId: any = get(
                  props,
                  "recurringExpense.id",
                  ""
                );

                await api.recurringExpense.updateRecurringtExpense(
                  recurringExpenseId,
                  values
                );
              } else {
                await api.recurringExpense.createRecurringtExpense(values, {
                  clientId,
                });
              }
              addToast({
                message: CreateExpenseSuccessToast,
                timeout: 5000,
                intent: Intent.SUCCESS,
              });
              resetForm();
            } catch (e: any) {
              addToast({
                message: getErrorToast(e.message),
                timeout: 5000,
                intent: Intent.DANGER,
              });
            }
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => {
            const getNumericInput = (
              key: RECURRING_EXPENSES_FIELDS_TYPE,
              inputOptions = {}
            ) => (
              <FormGroup
                intent={helpers.getFormIntent(errors[key])}
                label={get(FIELDS, key, { name: "" }).name}
                labelFor={`numeric-input__${key}`}
                helperText={errors[key]}
              >
                <NumericInput
                  id={`numeric-input__${key}`}
                  intent={helpers.getFormIntent(errors[key])}
                  onValueChange={(_: any, value: string) => {
                    setFieldValue(key, value);
                  }}
                  value={values[key]}
                  {...inputOptions}
                />
              </FormGroup>
            );

            const getTextAreaFormGroup = (
              key: RECURRING_EXPENSES_FIELDS_TYPE
            ) => (
              <FormGroup
                intent={helpers.getFormIntent(errors[key])}
                label={get(FIELDS, key, { name: "" }).name}
                labelFor={`text-input__${key}`}
                helperText={errors[key]}
              >
                <TextArea
                  id={`text-area__${key}`}
                  intent={helpers.getFormIntent(errors[key])}
                  onChange={handleChange(key)}
                  value={values[key]}
                />
              </FormGroup>
            );

            return (
              <form onSubmit={handleSubmit}>
                <FormItemSelect
                  buttonText={values.expense_type}
                  items={EXPENSE_TYPES}
                  label={get(FIELDS, "expense_type", { name: "" }).name}
                  menuRenderer={(item) => item}
                  onFormSelectChange={handleChange("expense_type")}
                />

                {getTextAreaFormGroup("expense_description")}

                <Switch
                  label="Active"
                  checked={values.active}
                  onChange={(e) => {
                    setFieldValue("active", get(e, "target.checked"));
                  }}
                />

                <div className="add-recurring-expense__submit-container">
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
          }}
        </Formik>
      </div>
    </div>
  );
};

export default AddRecurringExpensePage;

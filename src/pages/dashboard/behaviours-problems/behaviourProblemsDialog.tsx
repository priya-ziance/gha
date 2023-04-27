import { useContext, useMemo, useState } from "react";
import { Classes, Intent } from "@blueprintjs/core";
import { Formik } from "formik";
import get from "lodash/get";

import {
	BEHAVIOUR_PROBLEMS_FIELDS_TYPE,
	IClientBehaviourModel,
	IClientModel,
} from "../../../types";

import api from "../../../api";

import {
	Button,
	DateInput,
	Dialog,
	FormGroup,
	FormItemSelect,
	H4,
	InputGroup,
	NumericInput,
	TextArea,
} from "../../../components";

import ClientContext from "../../../contexts/client";
import ToastsContext from "../../../contexts/toasts";

import ClientsInputSelect from "../../../controlled-components/ClientsInput";

import * as helpers from "./helpers";

import { FIELDS, URI_OPTIONS } from "./constants";

import "./index.scss";
import useSWR from "swr";
import Behaviour from "../../../models/behaviour";
import { getDateTime } from "@blueprintjs/datetime/lib/esm/common/dateUtils";

interface BehaviourProblemDialogProps {
	isOpen: boolean;
	onClose: () => void;
	clientBehaviour?: IClientBehaviourModel;
}

const BehaviourProblemDialog = (props: BehaviourProblemDialogProps) => {
	const { id: clientId } = useContext(ClientContext);
	const { addToast } = useContext(ToastsContext);
	const { clientBehaviour, isOpen, onClose } = props;
	const [selectedBehaviour, setSelectedBehaviour] = useState(props.clientBehaviour?.behaviour);
	const [logDate, setLogDate] = useState<Date>(new Date());

	let initialValues = {
		frequency: clientBehaviour?.frequency,
		uri: clientBehaviour?.uri,
		notes: clientBehaviour?.notes
	};
	const { data: assignedBehaviours, isValidating: assignedBehavioursLoading } =
		useSWR(`/api/assigned_behaviours?&clientId=${clientId}`, () =>
			api.behaviourAssignment.getAssignments(clientId)
		);

	const update = !!clientBehaviour;
	const assignedBehavioursMapping: { [key: string]: Behaviour } = useMemo(() => {
		if (assignedBehaviours) {
			return Object.assign(
				{},
				...assignedBehaviours.behaviours.map((behaviour) => {
					return {
						[behaviour.id]: behaviour,
					};
				})
			);
		}

		return {};
	}, [assignedBehaviours]);

	const onLogDate = (date: Date | null) => {
		if (date) {
			setLogDate(date);
		}
	}

	return (
		<Dialog isOpen={isOpen} onClose={onClose}>
			<div>
				<div className={Classes.DIALOG_HEADER}>
					<H4>{update ? "Update" : "Create"} Client Behaviour</H4>
				</div>
				<div
					className={`behaviours__behaviours-problems ${Classes.DIALOG_BODY}`}
				>
					<Formik
						initialValues={initialValues}
						validationSchema={helpers.validationSchema}
						onSubmit={async (values, { setSubmitting }) => {
							setSubmitting(true);

							try {
								if (update) {
									await api.clientBehaviours.updateClientBehaviour(
										clientBehaviour?.id,
										{ ...values, log_date : logDate },
										{ clientId }
									);

									addToast({
										message: "Client Behaviour Updated",
										intent: "primary",
									});
								} else {
									await api.clientBehaviours.createClientBehaviour(
										{
											...values,
											log_date : logDate,
											behaviour: selectedBehaviour?.id
										},
										{
											clientId,
										}
									);

									addToast({
										message: "Client Behaviour Created",
										intent: "primary",
									});
								}
								// Reset the form
								onClose();
							} catch (e: any) {
								addToast({
									message: "Something went wrong",
									intent: "danger",
								});
							}

							setSubmitting(false);
						}}
					>
						{({
							values,
							errors,
							handleChange,
							handleSubmit,
							isSubmitting,
							setFieldValue,
						}) => {
							const handleNewClients = (clients: { any: IClientModel }) => {
								setFieldValue("clients_involved", Object.keys(clients));
							};

							const getNumericInput = (key: BEHAVIOUR_PROBLEMS_FIELDS_TYPE) => (
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
									/>
								</FormGroup>
							);

							const getTextAreaFormGroup = (
								key: BEHAVIOUR_PROBLEMS_FIELDS_TYPE
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
										value={get(values, key)}
									/>
								</FormGroup>
							);

							// const getDateFormGroup = (key: BEHAVIOUR_PROBLEMS_FIELDS_TYPE) => (
							// 	<FormGroup
							// 		intent={helpers.dateColumn(errors[key])}
							// 		label={get(FIELDS, key, { name: "" }).name}
							// 		labelFor={`text-input__${key}`}
							// 		helperText={errors[key]}
							// 	>
							// 		<TextArea
							// 			id={`text-area__${key}`}
							// 			intent={helpers.dateColumn(errors[key])}
							// 			onChange={handleChange(key)}
							// 			value={get(values, key)}
							// 		/>
							// 	</FormGroup>
							// );
							return (
								<form onSubmit={handleSubmit}>
									<FormItemSelect
										buttonText={selectedBehaviour?.behaviourType || ""}
										intent={Intent.PRIMARY}
										items={Object.keys(assignedBehavioursMapping)}
										label={"Behaviour Type"}
										menuRenderer={(item) => assignedBehavioursMapping[item].behaviourType}
										onFormSelectChange={(id) => setSelectedBehaviour(assignedBehavioursMapping[id])}
										disabled={update}
									/>
									{ }

									<FormGroup
										intent='primary'
										label='Log Date'
									>
										<DateInput
											onChange={onLogDate}
											value={logDate}
											{...helpers.getMomentFormatter('LL')}
										/>
									</FormGroup>

									{/* {getDateFormGroup("logdate")} */}
									{getNumericInput("frequency")}

									{getTextAreaFormGroup("notes")}

									<FormItemSelect
										buttonText={values.uri || ""}
										intent={Intent.PRIMARY}
										items={URI_OPTIONS}
										label={"URI"}
										menuRenderer={(item) => item}
										onFormSelectChange={handleChange("uri")}
									/>

									<ClientsInputSelect
										onNewClients={handleNewClients}
										clients={clientBehaviour?.clientsInvolved}
									/>

									<div className="behaviours__behaviours-problems__submit-container">
										<Button
											type="submit"
											disabled={isSubmitting}
											loading={isSubmitting}
											intent={Intent.PRIMARY}
											large
										>
											<b>{update ? "Update" : "Create"}</b>
										</Button>
									</div>
								</form>
							);
						}}
					</Formik>
				</div>
			</div>
		</Dialog>
	);
};

export default BehaviourProblemDialog;

import { useContext, useEffect, useMemo, useState } from 'react';
import { BreadcrumbProps, Intent, Checkbox } from '@blueprintjs/core';
import { Formik } from 'formik';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import pick from 'lodash/pick';

import moment from 'moment';

import { IClientModel, IGoalModel, ISpGoalModel, ISubGoalModel, SP_GOALS_FIELDS_TYPE } from '../../../types';

import api from '../../../api';

import URLS from '../../../utils/urls';

import { Button, DateInput, FormGroup, FormItemSelect, H4, InputGroup, PageHeading, TextArea } from '../../../components';

import LoadingWrapper from '../../../wrappers/loading';

import ClientContext from '../../../contexts/client';
import ToastsContext from '../../../contexts/toasts';

import Client from '../../../models/client';

import * as helpers from './helpers';

import { FIELDS } from './constants';

import Goal from '../../../models/goal';
import SubGoal from '../../../models/subGoal';


import './index.scss';


interface AddGoalProps {
  goal?: IGoalModel | undefined;
  spGoal?: ISpGoalModel | undefined;
  subGoals?: ISubGoalModel[] | undefined;
  update?: boolean;
  spGoalId: string;
}

const Content = (props: AddGoalProps) => {
  const [client, setClient] = useState<Client | {}>({});
  const [goals, setGoals] = useState<Goal[] | []>([]);
  const [subGoals, setSubGoals] = useState<any | []>([]);
  const [selectedSubGoals, setSelectedSubgoals] = useState<string[]>([]);
  const [loadingClient, setLoadingClient] = useState(false);
  const [page, setPage] = useState(0);
  const { addToast } = useContext(ToastsContext);
  const { id: clientId } = useContext(ClientContext);

  const goalsObject: any = useMemo(() => groupBy(goals, g => g.id), [goals]);
  const subGoalsObject: any = useMemo(() => groupBy(subGoals, g => g.id), [subGoals]);
  const [initialValues, setInitialValues]= useState( helpers.initialValues) ;
  const [clientNames, setClientNames] = useState<IClientModel[]>([])

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: 'Dashboard' },
    { href: URLS.getPagePath('clients'), icon: 'document', text: "Clients" },
    { href: URLS.getPagePath('client-links', { clientId }), icon: 'document', text: 'Links' },
    { href: URLS.getPagePath('goals', { clientId }), icon: 'document', text: 'Goals' },
    { href: URLS.getPagePath('sp-goals', { clientId }), icon: 'document', text: 'SP Goals' },

  ];
  if (props.update) {
    BREADCRUMBS.push({ text: URLS.getPagePathName("edit-sp-goals") });
  } else {
    BREADCRUMBS.push({ text: URLS.getPagePathName("add-sp-goals") });
  }
  const { spGoalId } = props;
  
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       setClientNames(
  //         await api.clients.getClients()
  //       )
  //     } catch (e: any) { }
  //   })()
  // })
  // useEffect(() => {

  //   (async () => {
  //     setPage(1)
  //     try {
  //       setClientNames(
  //         await api.clients.getClients()
  //       )
  //     } catch (e: any) { }
  //   })()
  // })
  // console.log("client name",clientNames);
  
  // useEffect(() => {
  //   (async () => {
  //     setLoadingClient(true);

  //     if (clientId) {
  //       try {
  //         setClient(await api.clients.getClient(clientId))
  //       } catch (e: any) { }
  //     }

  //     setLoadingClient(false);
  //   })()
  // }, [clientId])

  /**
   * We are appending the goal into current goals because when this
   * component loads, it will attempt to load all the goals and we
   * don't want to overrite that.
   */
  // useEffect(() => {
  //   setGoals(goals => {
  //     if (props.goal) {
  //       return [...goals, props.goal]
  //     } else {
  //       return goals;
  //     }
  //   })


  // }, []);


  const subgoalsData = [
    {
      id: 1,
      label: "Make sure staff put away their personal belonging away from out of the client eyes and make sure he"
    },
    {
      id: 2,
      label: "Make sure staff put away their personal belonging away from out of the client eyes and make sure he"
    },
    {
      id: 3,
      label: "Make sure staff put away their personal belonging away from out of the client eyes and make sure he"
    },
    {
      id: 4,
      label: "Decrease Negative Behaviors/No Collection of data/Do redirection"
    },
    {
      id: 2,
      label: "Make sure food is cut in small pieces and smaller amount is taken"
    },
  ]

  useEffect(() => {
    (async () => {
      try {
        setGoals(await api.goals.getGoals(clientId))
      } catch (e: any) {
        // TODO: Show error message
      }
    })()
  }, [clientId]);


  useEffect(() => {
    (async () => {
      try {
        setSubGoals(subgoalsData)
      } catch (e: any) {
        // TODO: Show error message
      }
    })
      ()
  });

  /**
 * This assigns the goal's info as the initial values if a goal
 * is passed in
 */
 useEffect(()=>{
  console.log("propsss new",props.spGoalId);
  
  if (props.spGoal) {
    const nameResult = clientNames.find((item) => item?.id === clientId)
    let initVal = Object.assign(
      {},
      helpers.initialValues,
      pick(props.spGoal, Object.keys(helpers.initialValues))
    );
    initialValues.goal = get(props, 'spGoal._id', '')
    console.log("init.goal",initialValues.goal);
    initVal = { ...initVal, client_name: nameResult?.firstName || "" }
    console.log("init val ",clientNames);
    
    setSelectedSubgoals(props.subGoals?.map(item => item.id) || []);
      setInitialValues(initVal)
  }
 },[props.spGoal])

//  const spGoalId= props?.spGoal?._id
  const SuccessToast = ()=>(
    <>
      <strong>Success</strong>
      <div>
        {props.update ?
          'SP Goal updated successfully'
          :
          'SP Goal created successfully'
        }
      </div>
    </>
  );

  const getErrorToast = (message: string) => {
    return (
      <CreateGoalErrorToast message={message} />
    )
  }
  const CreateGoalErrorToast = (props: any) => (
    <>
      <strong>Error</strong>
      <div> {props.message} </div>
    </>
  );

  return (
    <LoadingWrapper loading={loadingClient}>
      <div className='add-sp-goal'>
        <PageHeading
          title={
            props.update
              ? "Update Sp Goal"
              : "Add Sp Goal"
          }
          breadCrumbs={BREADCRUMBS}
        />
        <div className='add-sp-goal__container'>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={helpers.validationSchema}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
              setSubmitting(true);
              values.sub_goals = Object.keys(selectedSubGoals);

              try {
                if (props.update) {
                  // console.log("props.id",props.spGoal?._id);
                  
                  await api.spGoals.updateSpGoal(spGoalId, values,clientId);
                } else {
                  await api.spGoals.createSpGoal(values, { clientId });
                }

                addToast(
                  {
                    message: <>{SuccessToast()}</>,
                    timeout: 5000,
                    intent: Intent.SUCCESS
                  }
                );

                setSelectedSubgoals([]);
                resetForm()
              } catch (e: any) {
                addToast(
                  {
                    message: getErrorToast(e.message),
                    timeout: 5000,
                    intent: Intent.DANGER
                  }
                );
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
              setFieldValue
            }) => {
              const onFormDateChange = (field: string) => (date: Date | null) => {
                if (date) {
                  setFieldValue(field, moment(date).toISOString());
                }
              }

              const onFormSelectChange = (field: string) => (value: any) => {
                setFieldValue(field, value.id);
              }

              const getInputFormGroup = (key: SP_GOALS_FIELDS_TYPE, inputProps: any = {}) => (
                <FormGroup
                  intent={helpers.getFormIntent(errors[key])}
                  label={get(FIELDS, key, { name: '' }).name}
                  labelFor={`text-input__${key}`}
                  helperText={errors[key]}
                >
                  <InputGroup
                    id={`text-input__${key}`}
                    intent={helpers.getFormIntent(errors[key])}
                    onChange={handleChange(key)}
                    value={values[key]}
                    {...inputProps}
                  />
                </FormGroup>
              )

              const getTextAreaFormGroup = (key: SP_GOALS_FIELDS_TYPE) => (
                <FormGroup
                  intent={helpers.getFormIntent(errors[key])}
                  label={get(FIELDS, key, { name: '' }).name}
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
              )

              const getDateInputFormGroup = (key: SP_GOALS_FIELDS_TYPE) => (
                <FormGroup
                  intent={helpers.getFormIntent(errors[key])}
                  label={get(FIELDS, key, { name: '' }).name}
                  helperText={errors[key]}
                >
                  <DateInput
                    value={values[key] ? moment(values[key]).toDate() : null}
                    onChange={onFormDateChange(key)}
                    {...helpers.getMomentFormatter('LL')}
                  />
                </FormGroup>
              );

              return (
                <form onSubmit={handleSubmit}>


                    {/* {getDateInputFormGroup('created_at')} */}
                    {/* <FormGroup
                    label={'Support Plan Date'}
                  >
                    <InputGroup
                      value={get(goals, 'created_at')}
                      disabled
                    />
                  </FormGroup> */}
                  <FormGroup
                    label={'Client Name'}
                  >
                    <InputGroup
                      value={get(props.spGoal, "client_name")}
                      disabled
                    />
                  </FormGroup>
                  {getInputFormGroup('client_name', { childProps: { disabled:true } })}

                  <FormItemSelect
                    buttonText={goalsObject[values.goal] ? goalsObject[values.goal][0].description : ''}
                    intent={Intent.PRIMARY}
                    items={goals}
                    label={get(FIELDS, 'goal', { name: '' }).name}
                    menuRenderer={item => item.description}
                    onFormSelectChange={onFormSelectChange('goal')}
                  />

                  {getInputFormGroup('entries')}
                  {getDateInputFormGroup('start_date')}
                  {getDateInputFormGroup('end_date')}


                  <FormItemSelect
                    buttonText={subGoalsObject[values.sub_goals] ? subGoalsObject[values.sub_goals][0].label : subGoalsObject?.[0]?.label}
                    intent={Intent.PRIMARY}
                    items={subGoals}
                    label={get(FIELDS, 'sub_goals', { name: '' }).name}
                    menuRenderer={item => item.label}
                    onFormSelectChange={onFormSelectChange('sub_goals')}
                  />

                  {/* <FormItemSelect
                    buttonText={'jjjjjjj'}
                    intent={Intent.PRIMARY}
                    items={subGoals}
                    label={get(FIELDS, 'sub_goals', { label: '' }).label}
                    menuRenderer={item => item.label}
                    onFormSelectChange={onFormSelectChange('sub_goals')}
                  /> */}
                  <Checkbox label='Active' onChange={handleChange('active')} checked={values.active} />

                  {getTextAreaFormGroup('notes')}

                  {/* <div>
                    <H4>Subgoals</H4>
                    {subGoals.map(subGoal => {
                      const isSelected = selectedSubGoals.includes(subGoal.id);

                      const onChange = () => {
                        if (!isSelected) {
                          setSelectedSubgoals((select: any) => {
                            select[subGoal.id] = true;

                            return Object.assign({}, select);
                          })
                        } else {
                          setSelectedSubgoals((select: any) => {
                            delete select[subGoal.id];

                            return Object.assign({}, select);
                          })
                        }
                      }
                      
                      return (
                        <Checkbox label={subGoal.description} onChange={onChange} checked={isSelected} />
                      )
                    })}
                  </div> */}

                  <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
                    <b>{props.update ? "Update" : "Submit"}</b>
                  </Button>
                </form>
              )
            }}
          </Formik>
        </div>
      </div>
    </LoadingWrapper>
  );
}

export default Content;
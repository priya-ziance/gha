import { useMemo, useContext, useEffect, useState } from 'react';
import { BreadcrumbProps, Intent } from '@blueprintjs/core';
import { Formik } from 'formik';
import get from 'lodash/get';
import groupBy from 'lodash/groupBy';
import pick from 'lodash/pick';

import { IGoalModel, ISubGoalModel, TASK_FIELDS_TYPE } from '../../../types';

import api from '../../../api';

import URLS from '../../../utils/urls';

import { Button, FormGroup, FormItemSelect, PageHeading, Switch, TextArea } from '../../../components';

import ClientContext from '../../../contexts/client';
import ToastsContext from '../../../contexts/toasts';

import { IInstructionModel, ITaskModel } from '../../../types';

import Goal from '../../../models/goal';
import SubGoal from '../../../models/subGoal';

import * as helpers from './helpers';
import { FIELDS } from './constants';

import InstructionsDialog from './instructionsDialog';
import AddInstructionsDialog from './addInstructionsDialog';

import './index.scss';


interface AddGoalProps {
  goal?: IGoalModel;
  subGoal?: ISubGoalModel;
  task?: ITaskModel | undefined;
  update?: boolean;
}


const Content = (props: AddGoalProps) => {
  const { task, update, goal, subGoal } = props;
  
  const [goals, setGoals] = useState<Goal[] | []>([]);
  const [subGoals, setSubGoals] = useState<SubGoal[] | []>([]);
  const [instructionToEdit, setInstructionToEdit] = useState<IInstructionModel | undefined>(undefined);
  const [updateInstruction, setUpdateInstruction] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showAddInstructions, setShowAddInstructions] = useState(false);
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);

  const goalsObject: any = useMemo(() => groupBy(goals, g => g.id), [goals]);
  const subGoalsObject: any = useMemo(() => groupBy(subGoals, g => g.id), [subGoals]);

  let initialValues;

  useEffect(() => {
    if (goal) {
      setGoals([...goals, goal])
    }

    if (subGoal) {
      setSubGoals([...subGoals, subGoal])
    }
  }, [goal, subGoal])

  useEffect(() => {
    (async () => {
      try {
        setGoals(await api.goals.getGoals(clientId))
      } catch(e: any) {
        // TODO: Show error message
      }
    })()
  }, [clientId]);

  useEffect(() => {
    (async () => {
      try {
        setSubGoals(await api.subgoals.getSubGoals(clientId))
      } catch(e: any) {
        // TODO: Show error message
      }
    })()
  }, [clientId]);


  function refreshPage() {
    window.location.reload();
  }

  const onInstructions = () => setShowInstructions(true);
  const onCloseInstructions = () => setShowInstructions(false);
  const onAddInstructions = () => setShowAddInstructions(true);
  const onCloseAddInstructions = () => {
    setShowAddInstructions(false);
    setInstructionToEdit(undefined);
    setUpdateInstruction(false);
  }

  const onEditInstruction = (instruction: IInstructionModel) => {
    setShowInstructions(false);
    setInstructionToEdit(instruction);
    setShowAddInstructions(true);
    setUpdateInstruction(true);
  }


  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard')},
    { href: URLS.getPagePath('clients'), icon: 'document', text: URLS.getPagePathName('clients') },
    { href: URLS.getPagePath('client-links', { clientId }), icon: 'document', text: URLS.getPagePathName('client-links')},
    { href: URLS.getPagePath('goals', { clientId }), icon: 'document', text: URLS.getPagePathName('goals') },
    { href: URLS.getPagePath('goals-database', { clientId }), icon: 'document', text: URLS.getPagePathName('goals-database') },
    { href: URLS.getPagePath('goals-database-tasks', { clientId }), icon: 'document', text: URLS.getPagePathName('goals-database-tasks') },
  ];

  if (update) {
    BREADCRUMBS.push({ text: URLS.getPagePathName('edit-database-task') })
  } else {
    BREADCRUMBS.push({ text: URLS.getPagePathName('add-database-task') })
  }

  /**
   * This assigns the goal's info as the initial values if a goal
   * is passed in
   */
  if (props.task) {
    initialValues = Object.assign(
      {},
      helpers.initialValues,
      pick(props.task.task, Object.keys(helpers.initialValues))
    );

    if (goal) {
      initialValues.goal = goal.id
    }

    if (subGoal) {
      initialValues.sub_goal = subGoal.id
    }
  } else {
    initialValues = helpers.initialValues;
  }

  return (
    <div className='database-task'>
      <PageHeading
        title={
          update ? 'Update Database Task' : 'Add Database Task'
        }
        breadCrumbs={BREADCRUMBS}
      />
      <div className='database-task__container'>
        <Formik
            initialValues={initialValues}
            validationSchema={helpers.validationSchema}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
              setSubmitting(true);

              try {
                if (update) {
                  await api.tasks.updateTask(task?.id, values, { clientId });

                  addToast({
                    message: 'Task Updated',
                    intent: 'primary'
                  })

                  refreshPage()
                } else {
                  await api.tasks.createTask(values, { clientId });

                  addToast({
                    message: 'Task Created',
                    intent: 'primary'
                  })
                }

                // Reset the form
                resetForm();
              } catch(e: any) {
                console.log(e)
                addToast({
                  message: 'Something went wrong',
                  intent: 'danger'
                })
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

              const onFormSelectChange = (field: string) => (value: any) => {
                setFieldValue(field, value.id);
              }

              const getTextAreaFormGroup = (key: TASK_FIELDS_TYPE) => (
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

              return (
                <form onSubmit={handleSubmit}>

                  <FormItemSelect
                    buttonText={goalsObject[values.goal] ? goalsObject[values.goal][0].description : ''}
                    intent={Intent.PRIMARY}
                    items={goals}
                    label={get(FIELDS, 'goal', { name: '' }).name}
                    menuRenderer={item => item.description}
                    onFormSelectChange={onFormSelectChange('goal')}
                    required
                  />
                  
                  <FormItemSelect
                    buttonText={subGoalsObject[values.sub_goal] ? subGoalsObject[values.sub_goal][0].description : ''}
                    intent={Intent.PRIMARY}
                    items={subGoals}
                    label={get(FIELDS, 'sub_goal', { name: '' }).name}
                    menuRenderer={item => item.description}
                    onFormSelectChange={onFormSelectChange('sub_goal')}
                  />

                  {getTextAreaFormGroup('description')}

                  <Switch
                    label='Active'
                    checked={values.active}
                    onChange={e => {
                      setFieldValue('active', get(e, 'target.checked'))
                    }}
                  />

                  {update &&
                    <div className='database-task__instructions-container'>
                      <Button
                        disabled={isSubmitting}
                        intent={Intent.PRIMARY}
                        onClick={onInstructions}
                      >
                        Instrutions
                      </Button>

                      <Button
                        disabled={isSubmitting}
                        intent={Intent.PRIMARY}
                        onClick={onAddInstructions}
                      >
                        Add Instrutions
                      </Button>
                    </div>
                  }

                  <div className='database-task__submit-container'>
                    <Button type="submit" disabled={isSubmitting} loading={isSubmitting} intent={Intent.PRIMARY} large>
                      <b>
                        { update ? 'Update' : 'Submit' }
                      </b>
                    </Button>
                  </div>
                </form>
              )
            }}
        </Formik>

        {update && task &&
          <InstructionsDialog isOpen={showInstructions} onClose={onCloseInstructions} onEditInstruction={onEditInstruction} />
        }
        {update && task &&
          <AddInstructionsDialog
            isOpen={showAddInstructions}
            onClose={onCloseAddInstructions}
            taskId={get(task, 'id', '')}
            instruction={instructionToEdit}
            update={updateInstruction}
          />
        }
      </div>
    </div>
  );
}

export default Content;
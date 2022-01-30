import { useContext, useEffect, useState } from 'react';
import { Classes, Intent} from '@blueprintjs/core';
import get from 'lodash/get';
import pick from 'lodash/pick';

import { ILogModel, ILogTemplateModel } from '../../../../types';

import api from '../../../../api';

import { Button, Col, Dialog, FormGroup, FormItemSelect, Row, H4, Switch, TextArea } from '../../../../components';

import ClientContext from '../../../../contexts/client';
import ToastsContext from '../../../../contexts/toasts';

import * as helpers from './helpers';

import { FIELDS } from './constants';

import './index.scss';


interface EditLogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (answers: any, logTemplate: ILogTemplateModel, clientId: string) => Promise<any>;
  log: ILogModel | null;
  template: ILogTemplateModel | undefined;
}

const EditLog = (props: EditLogProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [submitting, setSubmitting] = useState(false);
  const { id: clientId } = useContext(ClientContext);
  const { addToast } = useContext(ToastsContext);
  
  const { isOpen, log, onClose, onUpdate, template } = props;

  useEffect(() => {
    if (log) {
      setSelectedAnswers(
        Object.assign(
          {},
          ...log.questions.map(quest => {
            return {
              [quest.id]: quest.selectedAnswers[0]
            }
          })
        )
      )
    }
  },[log])

  const updateSelectedAnswers = (questionId: string, answer: string) => {
    setSelectedAnswers((s: any) => {
      s[questionId] = answer;
      return {...s};
    })
  }

  const onQuestionAnswer = (questionId: string) => (answer: string) => {
    updateSelectedAnswers(questionId, answer)
  }

  const templateQuestions = log? log.questions : [];

  const onUpdateClicked = async () => {
    setSubmitting(true);

    try {
      if (template) {
        await onUpdate(selectedAnswers, template, get(template, 'client.id'));
        addToast({
          message: 'Successfully Updated Log',
          intent: 'primary'
        })
        onClose()
      }
    } catch(e) {}

    setSubmitting(false);
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div>
        <div className={Classes.DIALOG_HEADER}>
          <H4>
            Log
          </H4>
        </div>
        <div className={`database-task__instructions__add-instruction ${Classes.DIALOG_BODY}`}>
          <Row className='reshab-logs__form__row'>
              {templateQuestions.map(templateQuestion => {
                return (
                  <Col md={6}>
                    <FormGroup
                      intent={Intent.PRIMARY}
                      label={templateQuestion.questionValue}
                    >
                      <FormItemSelect
                        buttonText={
                          get(selectedAnswers, `${templateQuestion.id}`, '')
                        }
                        items={templateQuestion.answers}
                        menuRenderer={item => item}
                        onFormSelectChange={onQuestionAnswer(templateQuestion.id)}
                      />
                    </FormGroup>
                  </Col>
                )
              })}
            </Row>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button onClick={onClose}>Close</Button>
            <Button loading={submitting} onClick={onUpdateClicked} intent={Intent.PRIMARY}>Update</Button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default EditLog;
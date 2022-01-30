import { useContext, useEffect, useState } from 'react';
import { BreadcrumbProps, Intent , MenuItem } from '@blueprintjs/core';
import { Formik } from 'formik';
import get from 'lodash/get'

import moment from 'moment';

import {
  AnchorButton,
  Button,
  Col,
  DateInput,
  FormGroup,
  FormItemSelect,
  PageHeading,
  Row,
  Table,
  TextArea
} from '../../../../components';

import ClientContext from '../../../../contexts/client';
import LocationContext from '../../../../contexts/location';

import URLS from '../../../../utils/urls';

import api from '../../../../api';

import Log from '../../../../models/log';
import LogTemplate from '../../../../models/logTemplate';
import Question from '../../../../models/question';

import LoadingWrapper from '../../../../wrappers/loading';

import * as helpers from '../../../../utils/helpers';

import {
  actionColumn,
  activeColumn,
  medicaidColumn,
  addressColumn,
  firstNameColumn,
  lastNameColumn,
  locationColumn
} from './helpers';

import MonthLog from './monthLog';

import './index.scss';

const PAGE_SIZE = 10;

interface LogEntryProps {
  type: string
}

const LogEntry = (props: LogEntryProps) => {
  const [logs, setLogs] = useState<Log[] | []>([]);
  const [logTemplate, setLogTemplate] = useState<LogTemplate | undefined>(undefined)
  const [templateQuestions, setTemplateQuestions] = useState<Question[] | []>([])
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: string]: string} | null>({})
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingTemplate, setLoadingTemplate] = useState(false);
  const [isMonthLogOpen, setIsMonthLogOpen] = useState(false);
  const [logDate, setLogDate] = useState<Date>(new Date());
  const [selectedClient, setSelectedClient] = useState('')

  const { type } = props;

  const { id: clientId } = useContext(ClientContext);
  const { id: selectedLocationId } = useContext(LocationContext)

  const hasNextPage = logs.length === PAGE_SIZE;
  const hasPrevPage = page > 0;


  useEffect(() => {
    (async () => {
      if (clientId) {
        setLoading(true);

        try {
          const fetchedLogs = await api.logs.getLogsByType(type, clientId, { page, pageSize: PAGE_SIZE })
          setLogs(fetchedLogs)
        } catch(e){}

        setLoading(false);
      }
    })()
  }, [type, clientId, page, selectedLocationId]);

  useEffect(() => {
    (async () => {
      setLoadingTemplate(true);

      try {
        const logTemplate = await api.logTemplates.getLogTemplateByType(type)
        setLogTemplate(logTemplate)

        if (logTemplate  && logTemplate.questions) {
          const answers: any = {}

          setTemplateQuestions(logTemplate.questions)

          logTemplate.questions.forEach(question => {
            answers[question.id] = question.selectedAnswers
          })

          setSelectedAnswers(answers)
        }
      } catch(e){}

      setLoadingTemplate(false);
    })()
  }, [type])

  const onNextPage = () => {
    if (hasNextPage) {
      setPage(page => page + 1)
    }
  }

  const onPrevPage = () => {
    if (hasPrevPage) {
      setPage(page => page - 1)
    }
  }

  const updateSelectedAnswers = (questionId: string, answer: string) => {
    setSelectedAnswers((s: any) => {
      s[questionId] = answer;
      return {...s};
    })
  }

  const selectedAnswersToArray = (answers: {[key: string]: string} | null = {}) => {
    if (answers) {
      const keys = Object.keys(answers);

      return keys.map((key: string) => {
        return {
          question_id: key,
          selected_answers: [answers[key]]
        }
      })
    }
  }

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard')},
    { href: URLS.getPagePath('clients'), icon: 'document', text: URLS.getPagePathName('clients') },
    { href: URLS.getPagePath('client-links', { clientId }), icon: 'document', text: URLS.getPagePathName('client-links') },
    { href: URLS.getPagePath('logs', { clientId }), icon: 'document', text: URLS.getPagePathName('logs') },
  ];

  switch(type) {
    case 'reshab':
      BREADCRUMBS.push({ text: URLS.getPagePathName('reshab-logs') });
      break;
    case 'respite':
      BREADCRUMBS.push({ text: URLS.getPagePathName('respite-logs') });
      break;
    case 'lifeskills':
      BREADCRUMBS.push({ text: URLS.getPagePathName('life-skills-logs') });
      break;
  }

  const handleMonthLogClose = () => {
    setIsMonthLogOpen(false)
    setSelectedClient('')
  }

  const getPageTitle =(type: string) => {
    switch(type) {
      case 'reshab':
        return 'Reshab Logs'
      case 'respite':
        return 'Respite Logs'
      case 'lifeskills':
        return 'Life Skills Logs'
      default:
        return ''
    }
  }

  return (
    <div>
      <div className='reshab-logs'>
        <PageHeading
          title={getPageTitle(type)}
          breadCrumbs={BREADCRUMBS}
        />

        <FormGroup
          intent='primary'
          label='Log Date'
        >
          <DateInput
            onChange={setLogDate}
            value={logDate}
            {...helpers.getMomentFormatter('LL')}
          />
        </FormGroup>

        <div className='reshab-logs__container'>
          <Col>
            <Table
              loading={loading}
              numRows={logs.length}
              enableMinHeight
              columns={[
                {
                  title: 'ID',
                  cellRenderer: (data) => (<p>{data.id}</p>),
                  width: helpers.getTableWith(0.05)
                },
                {
                  title: 'First Name',
                  cellRenderer: firstNameColumn,
                  width: helpers.getTableWith(0.125)
                },
                {
                  title: 'Last Name',
                  cellRenderer: lastNameColumn,
                  width: helpers.getTableWith(0.125)
                },
                {
                  title: 'Address',
                  cellRenderer: addressColumn,
                  width: helpers.getTableWith(0.2)
                },
                {
                  title: 'Medicaid No',
                  cellRenderer: medicaidColumn,
                  width: helpers.getTableWith(0.11)
                },
                {
                  title: 'Location',
                  cellRenderer: locationColumn,
                  width: helpers.getTableWith(0.19)
                },
                {
                  title: 'Single',
                  cellRenderer: activeColumn,
                  width: helpers.getTableWith(0.07)
                },
                {
                  title: 'Actions',
                  cellRenderer: (data) => {
                    return actionColumn(data, {
                      onView() {
                        setIsMonthLogOpen(true);
                        setSelectedClient(get(data, 'client.id'))
                      }
                    })
                  },
                  width: helpers.getTableWith(0.13)
                }
              ]}
              data={logs}
              enableRowHeader={false}
              onSelection={(focusedCell) => {
                console.log(focusedCell)
              }}
              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}
              onNextPage={onNextPage}
              onPrevPage={onPrevPage}
              page={page}
              emptyTableMessage="No Logs Found"
            />

            <LoadingWrapper loading={loadingTemplate}>
              <Formik
                initialValues={{
                  log_notes: get(logTemplate, 'logNotes')
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  setSubmitting(true)

                  const answerObjects = selectedAnswersToArray(selectedAnswers)
                  
                  try {
                    await api.logTemplates.updateLogTemplate(logTemplate?.id, { answerObjects, ...values }, { clientId })
                  } catch(e) {}

                  setSubmitting(false)
                }}
                >

                {({
                  values,
                  handleChange,
                  handleSubmit,
                  isSubmitting
                }) => {
                  const onQuestionAnswer = (questionId: string) => (answer: string) => {
                    updateSelectedAnswers(questionId, answer)
                  }

                  return (
                    <form onSubmit={handleSubmit} className='reshab-logs__form'>
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

                      <FormGroup
                        label='Log Notes'
                        labelFor={`text-area__log_notes`}
                      >
                        <TextArea
                          id={`text-area__log_notes`}
                          value={get(values, 'log_notes')}
                          onChange={handleChange('log_notes')}
                        />
                      </FormGroup>
                      

                      <Button type="submit" disabled={isSubmitting} loading={isSubmitting} large intent={Intent.PRIMARY}>
                        Save
                      </Button>
                    </form>
                  )
                }}
              </Formik>
            </LoadingWrapper>
          </Col>
        </div>
      </div>

      <MonthLog clientId={selectedClient} type={type} date={logDate} isOpen={isMonthLogOpen} onClose={handleMonthLogClose}/>
    </div>
  );
}

export default LogEntry;
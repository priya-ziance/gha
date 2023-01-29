import { useContext, useEffect, useState } from 'react';
import { BreadcrumbProps, Intent } from '@blueprintjs/core';
import { Formik } from 'formik';
import get from 'lodash/get'

import {
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

import LocationContext from '../../../../contexts/location';

import URLS from '../../../../utils/urls';

import api from '../../../../api';

import LoadingWrapper from '../../../../wrappers/loading';

import * as helpers from '../../../../utils/helpers';

import { IClientModel, ILogModel, ILogTemplateModel, ILogTemplateQuestionModel } from '../../../../types';

import {
  actionColumn,
  medicaidColumn,
  addressColumn,
  firstNameColumn,
  lastNameColumn,
  locationColumn
} from './helpers';

import MonthLogDialog from './monthLog';

import EditLogDialog from './editLogDialog';

import './index.scss';

const PAGE_SIZE = 10;

interface LogEntryProps {
  type: string
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

const handleTemplateUpdate = async (answers: any, logTemplate: ILogTemplateModel, values = {}) => {
  const answerObjects = selectedAnswersToArray(answers)
                
  await api.logTemplates.updateLogTemplate(logTemplate?.id, { answerObjects, ...values })
}

const LogEntry = (props: LogEntryProps) => {
  const [logs, setClients] = useState<IClientModel[] | []>([]);
  const [logTemplate, setLogTemplate] = useState<ILogTemplateModel | undefined>(undefined)
  const [templateQuestions, setTemplateQuestions] = useState<ILogTemplateQuestionModel[] | []>([])
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: string]: string} | null>({})
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingTemplate, setLoadingTemplate] = useState(false);
  const [isMonthLogDialogOpen, setIsMonthLogDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedLogToEdit, setSelectedLogToEdit] = useState<ILogModel | null>(null)
  const [logDate, setLogDate] = useState<Date>(new Date());
  const [selectedClient, setSelectedClient] = useState('')

  const { type } = props;

  const { id: selectedLocationId } = useContext(LocationContext)

  const hasNextPage = logs.length === PAGE_SIZE;
  const hasPrevPage = page > 0;

  const handleLogClick = (log: ILogModel) => {
    setIsMonthLogDialogOpen(false)
    setSelectedLogToEdit(log)
    setIsEditDialogOpen(true)
  }


  useEffect(() => {
    (async () => {
      if (logDate) {
        setLoading(true);

        try {
          setClients(await api.clients.getClientsForUserByService(type, { page, pageSize: PAGE_SIZE }))
        } catch(e: any){}

        setLoading(false);
      }
    })()
  }, [type, page, selectedLocationId, logDate]);

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
            answers[question.questionId.id] = question.selectedAnswer
          })

          setSelectedAnswers(answers)
        }
      } catch(e: any){}

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

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: URLS.getPagePath('dashboard'), icon: 'document', text: URLS.getPagePathName('dashboard')},
    { href: URLS.getPagePath('logs'), icon: 'document', text: URLS.getPagePathName('logs') },
  ];

  switch(type) {
    case 'reshab':
      BREADCRUMBS.push({ text: URLS.getPagePathName('reshab-logs') });
      break;
    case 'respite':
      BREADCRUMBS.push({ text: URLS.getPagePathName('respite-logs') });
      break;
    case 'lifeskills':
      BREADCRUMBS.push({ href: URLS.getPagePath('life-skills'), icon: 'document', text: URLS.getPagePathName('life-skills') },);
      BREADCRUMBS.push({ text: URLS.getPagePathName('life-skills-logs') });
      break;
    case 'personalsupport':
      BREADCRUMBS.push({ href: URLS.getPagePath('personal-support'), icon: 'document', text: URLS.getPagePathName('personal-support') },);
      BREADCRUMBS.push({ text: URLS.getPagePathName('personal-support-logs') });
      break;
    default:
      break;
  }

  const handleMonthLogDialogClose = () => {
    setIsMonthLogDialogOpen(false)
    setSelectedClient('')
  }

  const handleEditLogClose = () => {
    setIsEditDialogOpen(false);
    setSelectedLogToEdit(null);
  }

  const onLogDate = (date: Date | null) => {
    if (date) {
      setLogDate(date);
    }
    setPage(0);
  }

  const getPageTitle =(type: string) => {
    switch(type) {
      case 'reshab':
        return 'Reshab Logs'
      case 'respite':
        return 'Respite Logs'
      case 'lifeskills':
        return 'Life Skills Logs'
      case 'personalsupport':
        return 'Personal Support Logs'
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
            onChange={onLogDate}
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
                  width: helpers.getTableWith(0.29)
                },
                {
                  title: 'Actions',
                  cellRenderer: (data) => {
                    return actionColumn(data, {
                      onView() {
                        setIsMonthLogDialogOpen(true);
                        setSelectedClient(get(data, 'id'))
                      }
                    })
                  },
                  width: helpers.getTableWith(0.1)
                }
              ]}
              data={logs}
              enableRowHeader={false}
              
              hasNextPage={hasNextPage}
              hasPrevPage={hasPrevPage}
              onNextPage={onNextPage}
              onPrevPage={onPrevPage}
              page={page}
              emptyTableMessage="No Clients Found"
            />

            <LoadingWrapper loading={loadingTemplate}>
              <Formik
                initialValues={{
                  log_notes: get(logTemplate, 'logNotes')
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  if (logTemplate) {
                    setSubmitting(true)
                    
                    try {
                      await handleTemplateUpdate(selectedAnswers, logTemplate, values)
                    } catch(e: any) {}

                    setSubmitting(false)
                  }
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
                          const quest = templateQuestion.questionId;

                          return (
                            <Col md={6}>
                              <FormGroup
                                intent={Intent.PRIMARY}
                                label={quest.questionValue}
                              >
                                <FormItemSelect
                                  buttonText={
                                    get(selectedAnswers, `${quest.id}`, '')
                                  }
                                  items={quest.answers}
                                  menuRenderer={item => item}
                                  onFormSelectChange={onQuestionAnswer(quest.id)}
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

      <MonthLogDialog
        clientId={selectedClient}
        type={type}
        date={logDate}
        isOpen={isMonthLogDialogOpen}
        onClose={handleMonthLogDialogClose}
        handleLogClick={handleLogClick}
      />

      <EditLogDialog
        isOpen={isEditDialogOpen}
        log={selectedLogToEdit}
        onClose={handleEditLogClose}
        template={logTemplate}
        onUpdate={handleTemplateUpdate}
      />
    </div>
  );
}

export default LogEntry;
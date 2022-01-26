import { Provider } from 'mobx-react'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import zooTheme from '@zooniverse/grommet-theme'
import '../../translations/i18n'
import i18n from 'i18next'


import Layout from './components/Layout'
import ModalTutorial from './components/ModalTutorial'

export default function Classifier({
  classifierStore,
  locale,
  onError = () => true,
  project,
  subjectID,
  subjectSetID,
  workflowData,
  workflowID
}) {

  useEffect(function onLocaleChange() {
    if (locale) {
      classifierStore.setLocale(locale)
      i18n.changeLanguage(locale)
    }
  }, [locale])

  useEffect(function onProjectChange() {
    const { projects } = classifierStore
    projects.setResources([project])
    projects.setActive(project.id)
  }, [project.id])

  useEffect(function onURLChange() {
    const { workflows } = classifierStore
    if (workflowID) {
      workflows.selectWorkflow(workflowID, subjectSetID, subjectID)
    }
  }, [subjectID, subjectSetID, workflowID])

  useEffect(function onWorkflowChange() {
    const { workflows, subjects } = classifierStore
    if (workflowData) {
      const [ workflowSnapshot ] = JSON.parse(workflowData).workflows
      workflows.setResources([workflowSnapshot])
      // TODO: the task area crashes without the following line. Why is that?
      subjects.setActiveSubject(subjects.active?.id)
    }
  }, [workflowData])

  try {
    return (
      <>
        <Layout />
        <ModalTutorial />
      </>
    )
  } catch (error) {
    const info = {
      package: '@zooniverse/classifier'
    }
    onError(error, info);
  }
  return null
}

Classifier.propTypes = {
  classifierStore: PropTypes.object.isRequired,
  locale: PropTypes.string,
  onError: PropTypes.func,
  project: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  subjectSetID: PropTypes.string,
  subjectID: PropTypes.string,
  workflowID: PropTypes.string.isRequired
}

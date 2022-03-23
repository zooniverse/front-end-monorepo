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
  showTutorial = false,
  subjectID,
  subjectSetID,
  workflowSnapshot,
  workflowVersion,
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
      console.log('starting new subject queue', { workflowID, subjectSetID, subjectID })
      workflows.selectWorkflow(workflowID, subjectSetID, subjectID)
    }
  }, [subjectID, subjectSetID, workflowID])

  /*
    This should run when a project owner edits a workflow, but not when a workflow updates
    as a result of receiving classifications eg. workflow.completeness.
    It refreshes the stored workflow then resets any classifications in progress.
  */
  useEffect(function onWorkflowVersionChange() {
    const { workflows, subjects } = classifierStore
    if (workflowSnapshot) {
      // pass the subjectSetID prop into the store as part of the new workflow data
      workflowSnapshot.subjectSet = subjectSetID
      console.log('Refreshing workflow snapshot', workflowSnapshot.id)
      workflows.setResources([workflowSnapshot])
      // TODO: the task area crashes without the following line. Why is that?
      classifierStore.startClassification()
    }
  }, [workflowVersion])

  try {
    return (
      <>
        <Layout />
        {showTutorial && <ModalTutorial />}
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
  showTutorial: PropTypes.bool,
  subjectSetID: PropTypes.string,
  subjectID: PropTypes.string,
  workflowSnapshot: PropTypes.shape({
    id: PropTypes.string
  }),
  workflowVersion: PropTypes.string,
  workflowID: PropTypes.string.isRequired
}

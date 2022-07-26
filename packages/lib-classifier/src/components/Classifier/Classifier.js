import { applySnapshot, getSnapshot } from 'mobx-state-tree'
import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import '../../translations/i18n'
import i18n from 'i18next'

import { usePanoptesUser, useProjectRoles } from '@hooks'
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
}) {

  const workflowID = workflowSnapshot?.id
  const workflowStrings = workflowSnapshot?.strings
  const user = usePanoptesUser()
  const projectRoles = useProjectRoles(project?.id, user?.id)
  let workflowVersionChanged = false
  if (workflowSnapshot) {
    const storedWorkflow = classifierStore.workflows.resources.get(workflowSnapshot.id)
    workflowVersionChanged = workflowSnapshot.version !== storedWorkflow?.version
    /*
      Merge the new snapshot into the existing workflow,
      to preserve properties, such as workflow.subjectSet,
      that aren't in the Panoptes data.
    */
    workflowSnapshot = storedWorkflow ? { ...getSnapshot(storedWorkflow), ...workflowSnapshot } : workflowSnapshot
  }

  const canPreviewWorkflows = projectRoles.indexOf('owner') > -1 ||
    projectRoles.indexOf('collaborator') > -1 ||
    projectRoles.indexOf('tester') > -1

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
      workflows.setResources([workflowSnapshot])
      workflows.selectWorkflow(workflowID, subjectSetID, subjectID, canPreviewWorkflows)
    }
  }, [canPreviewWorkflows, subjectID, subjectSetID, workflowID])

  useEffect(function onWorkflowStringsChange() {
    const { workflows } = classifierStore
    if (workflowStrings) {
      const workflow = workflows.resources.get(workflowID)
      console.log('Refreshing workflow strings', workflowID)
      applySnapshot(workflow.strings, workflowStrings)
    }
  }, [workflowID, workflowStrings])
  /*
    This should run when a project owner edits a workflow, but not when a workflow updates
    as a result of receiving classifications eg. workflow.completeness.
    It refreshes the stored workflow then resets any classifications in progress.
  */
  useEffect(function onWorkflowVersionChange() {
    const { workflows } = classifierStore
    if (workflowVersionChanged) {
      console.log('Refreshing workflow snapshot', workflowSnapshot.id)
      workflows.setResources([workflowSnapshot])
      // TODO: the task area crashes without the following line. Why is that?
      classifierStore.startClassification()
    }
  }, [workflowVersionChanged])

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
    id: PropTypes.string,
    version: PropTypes.string
  })
}

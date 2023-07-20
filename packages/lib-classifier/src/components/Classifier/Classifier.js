import { observer } from 'mobx-react'
import { getSnapshot } from 'mobx-state-tree'
import PropTypes from 'prop-types'
import { useEffect } from 'react';
import i18n from '../../translations/i18n'

import { useStores } from '@hooks'
import Layout from './components/Layout'
import ModalTutorial from './components/ModalTutorial'

function Classifier({
  locale,
  onError = () => true,
  showTutorial = false,
  subjectID,
  subjectSetID,
  workflowSnapshot = null,
}) {
  const classifierStore = useStores()
  const { workflows } = classifierStore
  const workflowID = workflowSnapshot?.id
  let workflowVersionChanged = false

  if (workflowSnapshot) {
    const storedWorkflow = workflows.resources.get(workflowSnapshot.id)
    workflowVersionChanged = workflowSnapshot.version !== storedWorkflow?.version
    /*
      Merge the new snapshot into the existing workflow,
      to preserve properties, such as workflow.subjectSet,
      that aren't in the Panoptes data.
    */
    workflowSnapshot = storedWorkflow ? { ...getSnapshot(storedWorkflow), ...workflowSnapshot } : workflowSnapshot
    /*
      This should run when a project owner edits a workflow, but not when a workflow updates
      as a result of receiving classifications eg. workflow.completeness.
      It refreshes the stored workflow then resets any classifications in progress.
    */
    if (workflowVersionChanged) {
      console.log('Refreshing workflow snapshot', workflowSnapshot.id)
      workflows.setResources([workflowSnapshot])
      // TODO: the task area crashes without the following line. Why is that?
      classifierStore.startClassification()
    }
  }

  useEffect(function onLocaleChange() {
    if (locale) {
      classifierStore.setLocale(locale)
      i18n.changeLanguage(locale)
    }
  }, [locale])

  useEffect(function onURLChange() {
    if (workflowID) {
      console.log('starting new subject queue', { workflowID, subjectSetID, subjectID })
      workflows.selectWorkflow(workflowID, subjectSetID, subjectID)
    }
  }, [subjectID, subjectSetID, workflowID, workflows])

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
  locale: PropTypes.string,
  onError: PropTypes.func,
  showTutorial: PropTypes.bool,
  subjectSetID: PropTypes.string,
  subjectID: PropTypes.string,
  workflowSnapshot: PropTypes.shape({
    id: PropTypes.string,
    strings: PropTypes.object,
    version: PropTypes.string
  })
}

export default observer(Classifier)

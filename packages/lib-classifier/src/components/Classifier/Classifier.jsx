import { observer } from 'mobx-react'
import { getSnapshot } from 'mobx-state-tree'
import { bool, func, object, shape, string } from 'prop-types'
import { useEffect } from 'react'

import { useStores } from '@hooks'
import Layout from './components/Layout'
import ModalTutorial from './components/ModalTutorial'

function Classifier({
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

  /* This runs when a volunteer:
      - views a new workflow
      - selects a new subject set
      - selects a new subject
   */
  const { selectWorkflow } = workflows
  useEffect(function onURLChange() {
    if (workflowID) {
      console.log('starting new subject queue', { workflowID, subjectSetID, subjectID })
      selectWorkflow(workflowID, subjectSetID, subjectID)
    }
  }, [selectWorkflow, subjectID, subjectSetID, workflowID])

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
  onError: func,
  showTutorial: bool,
  subjectSetID: string,
  subjectID: string,
  workflowSnapshot: shape({
    id: string,
    strings: object,
    version: string
  })
}

export default observer(Classifier)

import { SpacedText } from '@zooniverse/react-components'
import withThemeContext from '@zooniverse/react-components/helpers/withThemeContext'
import { Button } from 'grommet'
import { Next } from 'grommet-icons'
import Link from 'next/link'
import { bool, number, object, shape, string } from 'prop-types'
import { useTranslation } from 'next-i18next'
import { useCallback, useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

import addQueryParams from '@helpers/addQueryParams'
import theme from './theme'

export const ThemedButton = withThemeContext(Button, theme)

function useProject() {
  const stores = useContext(MobXProviderContext)
  const { project } = stores.store
  return project
}
function WorkflowSelectButton ({
  disabled = false,
  workflow,
  ...rest
}) {
  const { t } = useTranslation('components')
  const project = useProject()

  const url = `/${project.slug}/classify/workflow/${workflow.id}`
  const onClick = useCallback(() => {
    project.setSelectedWorkflow(workflow.id)
  }, [project, workflow.id])

  const href = addQueryParams(url)
  const completeness = parseInt(workflow.completeness * 100, 10)
  let workflowStatus = workflow.grouped ? t('WorkflowSelector.WorkflowSelectButton.setSelection') : ''
  // indexed workflows use subject selection
  workflowStatus = workflow.hasIndexedSubjects ? t('WorkflowSelector.WorkflowSelectButton.subjectSelection') : workflowStatus

  const label = (
    <span>
      <SpacedText size='10px'>
        {t('WorkflowSelector.WorkflowSelectButton.complete', { completeness })}
        {workflowStatus &&
          <>
            &#xB7;
            {workflowStatus}
          </>
        }
      </SpacedText><br />
      {workflow.displayName}
    </span>
  )

  if (href && disabled) {
    return (
      <ThemedButton
        completeness={completeness}
        disabled={disabled}
        icon={<Next size='15px' />}
        reverse
        label={label}
        primary
        {...rest}
      />
    )
  }
  return (
    <ThemedButton
      as={Link}
      href={href}
      completeness={completeness}
      icon={<Next size='15px' />}
      reverse
      label={label}
      onClick={onClick}
      primary
      {...rest}
    />
  )
}

WorkflowSelectButton.propTypes = {
  disabled: bool,
  /** 
    Optional custom router. Overrides the default NextJS.
    Useful for mocking the router in stories and shallow tests.
  */
  router: shape({
    query: shape({
      owner: string,
      project: string
    })
  }),
  theme: object,
  workflow: shape({
    completeness: number,
    default: bool,
    displayName: string.isRequired,
    grouped: bool,
    id: string
  }).isRequired
}

export default WorkflowSelectButton

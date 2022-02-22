import { Markdownz } from '@zooniverse/react-components'
import { string } from 'prop-types'
import { Paragraph } from 'grommet'
import { useTranslation } from 'next-i18next'

import ContentBox from '../ContentBox'

const components = {
  p: (nodeProps) => <Paragraph children={nodeProps.children} margin={{ top: 'none' }} />
}

function AboutProject ({ description, projectName }) {
  const { t } = useTranslation('components')
  return (
    <ContentBox title={t('AboutProject.title', { projectName })}>
      <Markdownz children={description} components={components} />
    </ContentBox>
  )
}

AboutProject.propTypes = {
  description: string,
  projectName: string
}

AboutProject.defaultProps = {
  description: '_No projection information found._'
}

export default AboutProject

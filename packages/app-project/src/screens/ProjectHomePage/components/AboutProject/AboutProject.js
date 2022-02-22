import { Markdownz } from '@zooniverse/react-components'
import { string } from 'prop-types'
import { Paragraph } from 'grommet'
import { useTranslation } from 'next-i18next'

import ContentBox from '@shared/components/ContentBox'

const components = {
  p: (nodeProps) => <Paragraph children={nodeProps.children} margin={{ top: 'none' }} />
}

function AboutProject ({ description, projectName }) {
  const { t } = useTranslation('screens')
  return (
    <ContentBox title={t('Home.AboutProject.title', { projectName })}>
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

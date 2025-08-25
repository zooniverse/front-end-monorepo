import { Markdownz } from '@zooniverse/react-components'
import { string } from 'prop-types'
import { Paragraph } from 'grommet'
import { useTranslation } from 'next-i18next'

import ContentBox from '@shared/components/ContentBox'

const components = {
  p: (nodeProps) => <Paragraph margin={{ top: 'none' }}>{nodeProps.children}</Paragraph>
}

function AboutProject ({ description = '_No projection information found._', projectName }) {
  const { t } = useTranslation('screens')
  return (
    <ContentBox title={t('Home.AboutProject.title', { projectName })}>
      <Markdownz components={components}>{description}</Markdownz>
    </ContentBox>
  )
}

AboutProject.propTypes = {
  description: string,
  projectName: string
}

export default AboutProject

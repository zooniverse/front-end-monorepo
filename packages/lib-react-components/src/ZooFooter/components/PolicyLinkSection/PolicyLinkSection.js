import { Anchor, Box } from 'grommet'
import { arrayOf, string } from 'prop-types'
import React from 'react'
import { useTranslation } from 'react-i18next'

import zipLabelsAndUrls from '../../helpers/zipLabelsAndUrls'
import SpacedText from '../../../SpacedText'
import withResponsiveContext from '../../../helpers/withResponsiveContext'

function PolicyLinkSection ({
  labels = [],
  screenSize,
  urls = []
}) {
  const { t } = useTranslation()
  const links = zipLabelsAndUrls(labels, urls)
  const direction = screenSize === 'small' ? 'column' : 'row'
  return (
    <Box
      aria-label={t('ZooFooter.zooniversePolicies')}
      as='nav'
      direction={direction}
      gap='medium'
    >
    {links.length > 0 && links.map(link => (
      <Anchor
        href={link.url}
        key={link.url}
        size='small'
      >
        <SpacedText weight='bold'>
          {link.label}
        </SpacedText>
      </Anchor>
    ))}
    </Box>
  )
}

PolicyLinkSection.propTypes = {
  labels: arrayOf(string).isRequired,
  urls: arrayOf(string).isRequired
}

export default withResponsiveContext(PolicyLinkSection)

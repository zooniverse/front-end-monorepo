import { SpacedText } from '@zooniverse/react-components'
import counterpart from 'counterpart'
import { Anchor, Box, Text } from 'grommet'
import { Next } from 'grommet-icons'
import Link from 'next/link'
import { object, string } from 'prop-types'
import React from 'react'

import en from './locales/en'

counterpart.registerTranslations('en', en)

function Introduction (props) {
  const { description, link, title } = props
  return (
    <Box>
      <Box margin={{ bottom: 'xsmall' }}>
        <SpacedText weight='bold'>
          {title}
        </SpacedText>
      </Box>
      <Box margin={{ bottom: 'small' }}>
        <Text size='xlarge' weight='bold'>
          {description}
        </Text>
      </Box>
      <Link {...link} passHref>
        <Anchor
          gap='xsmall'
          icon={<Next color='light-5' />}
          label={<SpacedText>{counterpart('Introduction.link')}</SpacedText>}
          reverse
        />
      </Link>
    </Box>
  )
}

Introduction.propTypes = {
  description: string,
  link: object,
  title: string,
}

export default Introduction

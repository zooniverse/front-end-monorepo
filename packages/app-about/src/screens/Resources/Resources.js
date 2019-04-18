import { Heading, Paragraph } from 'grommet'
import React from 'react'

import SingleColumnLayout from '../../shared/components/SingleColumnLayout'
import Head from '../../shared/components/Head'

export default () => (
  <>
    <Head
      description='Useful downloads and guidelines for talking about the Zooniverse.'
      title='Resources'
    />
    <SingleColumnLayout>
      <article>
        <Heading size='small'>
          Resources
        </Heading>
      </article>
    </SingleColumnLayout>
  </>
)

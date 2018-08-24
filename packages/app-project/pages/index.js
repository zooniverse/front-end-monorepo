import React from 'react'
import { Grommet } from 'grommet'
import { ZooFooter, ZooHeader } from '@zooniverse/react-components'
import Head from '../components/head'
import zooTheme from '@zooniverse/grommet-theme'

// import Nav from '../components/nav'


export default () => (
  <Grommet theme={zooTheme}>
    <Head title='Home' />
    <ZooHeader />
    <div>
      Index
    </div>
    <ZooFooter />
  </Grommet>
)

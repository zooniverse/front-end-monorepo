import React from 'react'
import { Grommet } from 'grommet'
import { ZooFooter, ZooHeader } from '@zooniverse/react-components'
import Head from '../components/head'
// import Nav from '../components/nav'


export default () => (
  <Grommet>
    <Head title='Home' />
    <ZooHeader />
    <div>
      Index
    </div>
    <ZooFooter />
  </Grommet>
)

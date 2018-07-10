import React from 'react'
import { Grommet } from 'grommet'
import { ZooFooter } from '@zooniverse/react-components'
import Head from '../components/head'
import Nav from '../components/nav'


export default () => (
  <Grommet>
    <Head title='Home' />
    <Nav />
    <div>
      Index
    </div>
    <ZooFooter />
  </Grommet>
)

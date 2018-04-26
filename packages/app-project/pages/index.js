import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import { Grommet } from 'grommet'
import React from 'react'

export default () => (
  <Grommet>
    <Head title='Home' />
    <Nav />

    <div>
      Index
    </div>
  </Grommet>
)

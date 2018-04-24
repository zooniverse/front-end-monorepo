import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import React from 'react'
import { Grommet } from 'grommet'

export default () => (
  <Grommet>
    <Head title="Home" />
    <Nav />

    <div>
      Project
    </div>
  </Grommet>
)

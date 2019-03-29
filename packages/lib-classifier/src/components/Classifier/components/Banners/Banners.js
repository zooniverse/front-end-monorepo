import { Stack } from 'grommet'
import React from 'react'

import AlreadySeenBanner from './components/AlreadySeenBanner'
import RetiredBanner from './components/RetiredBanner'

function Banners () {
  return (
    <>
      <AlreadySeenBanner />
      <RetiredBanner />
    </>
  )
}

export default Banners

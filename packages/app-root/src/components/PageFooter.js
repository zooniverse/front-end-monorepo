'use client'
import ZooFooter from '@zooniverse/react-components/ZooFooter'

import { usePanoptesUser } from '../hooks'

export default function PageFooter() {
  // we'll need the user in order to detect admin mode.
  const { data: user } = usePanoptesUser()

  return (
    <ZooFooter />
  )
}
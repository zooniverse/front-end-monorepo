'use client'
import ZooHeader from '@zooniverse/react-components/ZooHeader'

import { usePanoptesUser } from '../hooks'

export default function PageHeader() {
  const { data: user } = usePanoptesUser()

  return (
    <ZooHeader
      user={user}
    />
  )
}
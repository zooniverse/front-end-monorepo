'use client'

import { useContext } from 'react'
import { PanoptesAuthContext } from '../contexts'

export default function HomePage() {
  const { isLoading, user } = useContext(PanoptesAuthContext)

  // While user is loading, show placeholder larger than 100vh
  // so that once correct component renders, there's not a big
  // page jump
  return (
    <main>
      {!isLoading && <div>
        {user ? <p>Signed-in</p> : <p>Signed-out</p>}
      </div>}
      <div>
        Blog section regardless
      </div>
    </main>
  )
}

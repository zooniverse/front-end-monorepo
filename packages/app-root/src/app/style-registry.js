'use client'

import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import { useState } from 'react'

// https://nextjs.org/docs/app/building-your-application/styling/css-in-js#styled-components

export default function StyledComponentsRegistry({
  children
}) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })

  if (typeof window !== 'undefined') return <>{children}</>

  return (
    <StyleSheetManager disableVendorPrefixes sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  )
}

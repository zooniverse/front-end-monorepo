'use client'
import { usePathname } from 'next/navigation'
import { AboutHeader } from '@zooniverse/content'

export default function AboutPage() {
  const pathname = usePathname()

  return (
    <>
      <AboutHeader pathname={pathname} />
      <div>
        <p>This is lib-content</p>
      </div>
    </>
  )
}

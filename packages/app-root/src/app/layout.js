import RootLayout from '@/components/RootLayout'
import StyledComponentsRegistry from './style-registry'

export const metadata = {
  title: 'Zooniverse',
  description: 'People-powered Research'
}

export default function NextLayout({ children }) {
  return (
    <html lang='en'>
      <body style={{ margin: 0 }}>
        <StyledComponentsRegistry>
          <RootLayout>{children}</RootLayout>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}

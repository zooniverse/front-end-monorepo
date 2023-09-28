import ZooHeaderContainer from '@/components/ZooHeaderContainer.js'
import ZooFooterContainer from '@/components/ZooFooterContainer.js'
import { Grommet } from 'grommet'

export const metadata = {
  title: 'Zooniverse',
  description: 'People-powered Research'
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body style={{ margin: 0 }}>
        <Grommet>
          <ZooHeaderContainer />
          <main>{children}</main>
          <ZooFooterContainer />
        </Grommet>
      </body>
    </html>
  )
}

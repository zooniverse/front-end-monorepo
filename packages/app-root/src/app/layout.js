import GrommetContainer from '@/components/GrommetContainer/GrommetContainer.js'
import ZooHeaderContainer from '@/components/ZooHeaderContainer.js'
import ZooFooterContainer from '@/components/ZooFooterContainer.js'

export const metadata = {
  title: 'Zooniverse',
  description: 'People-powered Research'
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <GrommetContainer>
        <body style={{ margin: 0 }}>
          <ZooHeaderContainer />
          <main>{children}</main>
          <ZooFooterContainer />
        </body>
      </GrommetContainer>
    </html>
  )
}

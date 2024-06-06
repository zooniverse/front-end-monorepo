import { Box } from 'grommet'
import ContainerBox from './ContainerBox.js'
import AboutHeader from '../AboutHeader'

function AboutLayout({ children }) {
  return (
    <>
      <AboutHeader />
      <main>
        <Box
          background={{
            dark: 'dark-1',
            light: 'light-1'
          }}
          align='center'
        >
          <ContainerBox
            align='center'
            background={{ dark: 'dark-3', light: 'neutral-6' }}
            width='min(100%, 90rem)'
          >
            {children}
          </ContainerBox>
        </Box>
      </main>
    </>
  )
}

export default AboutLayout

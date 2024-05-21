import { Box } from 'grommet'

import ContainerBox from '../../../components/PageLayout/ContainerBox.js'
import MaxWidthContent from '../../../components/MaxWidthContent/MaxWidthContent.js'
import Introduction from './components/Introduction.js'
import Hero from './components/Hero.js'

export default function DefaultHome() {
  return (
    <Box
      background={{
        dark: 'dark-1',
        light: 'light-1'
      }}
      align='center'
    >
      <Hero />
      <ContainerBox
        align='center'
        background={{ dark: 'dark-3', light: 'neutral-6' }}
        width='min(100%, 90rem)'
        pad={{ horizontal: 'medium' }}
      >
        <MaxWidthContent>
          <Introduction />
        </MaxWidthContent>
      </ContainerBox>
    </Box>
  )
}

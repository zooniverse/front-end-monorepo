'use client'

import { useState } from 'react'
import { Box } from 'grommet'
import { array, arrayOf, bool, func, number, shape, string } from 'prop-types'
import { useTranslation } from '../../translations/i18n.js'

import DropdownNav from '../../components/DropdownNav/DropdownNav.js'
import MaxWidthContent from '../../components/MaxWidthContent/MaxWidthContent.js'
import AboutLayout from '../../components/PageLayout/AboutLayout.js'
import Institution from './components/Institution/index.js'
import {
  MobileHeading,
  StickyBox,
  StickySidebar,
  StyledGrid,
  StyledHeading
} from '../../components/SharedStyledComponents/SharedStyledComponents.js'

function OurTeam({ teamData = [], sections = [] }) {
  const { t } = useTranslation()
  const [activeSection, setActiveSection] = useState(0)

  return (
    <>
      <AboutLayout>
        <MobileHeading level='1' size='1.5rem'>
          {t('OurTeam.title')}
        </MobileHeading>
        <StickyBox background={{ dark: 'dark-3', light: 'neutral-6' }}>
          <DropdownNav
            activeSection={activeSection}
            sidebarLabel={t('OurTeam.sidebarLabel')}
            sections={sections}
            setActiveSection={setActiveSection}
          />
        </StickyBox>
        <MaxWidthContent>
          <StyledHeading color={{ light: 'neutral-1', dark: 'accent-1' }} level='1' size='small'>
            {t('OurTeam.title')}
          </StyledHeading>
        </MaxWidthContent>
        <StyledGrid>
          <Box as='aside' align='center'>
            <StickySidebar
              activeSection={activeSection}
              ariaLabel={t('OurTeam.sideBarLabel')}
              sections={sections}
              setActiveSection={setActiveSection}
            />
          </Box>
          <article>
            {teamData?.map((item, index) => (
              <Institution
                key={item.name}
                name={item.name}
                people={item.people}
                sectionIndex={index}
                setActiveSection={setActiveSection}
                slug={item.slug}
              />
            ))}
          </article>
          <Box />
        </StyledGrid>
      </AboutLayout>
    </>
  )
}

OurTeam.propTypes = {
  teamData: arrayOf(
    shape({
      name: string,
      people: array,
      slug: string,
      weight: number
    })
  ),
  sections: arrayOf(
    shape({
      active: bool,
      selectTeam: func,
      name: string
    })
  )
}

export default OurTeam

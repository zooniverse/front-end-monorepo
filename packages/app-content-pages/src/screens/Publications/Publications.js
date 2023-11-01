import { useEffect, useState } from 'react'
import { Anchor, Box, Grid, Heading, Paragraph } from 'grommet'
import { array, arrayOf, bool, func, number, shape, string } from 'prop-types'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'

import Category from './components/Category/Category.js'
import Content from '../../shared/components/Content/Content.js'
import DropdownNav from '../../shared/components/DropdownNav/DropdownNav.js'
import Head from '../../shared/components/Head'
import PageLayout from '../../shared/components/PageLayout/layout.js'
import Sidebar from '../../shared/components/Sidebar/Sidebar.js'

const isBrowser = typeof window !== 'undefined' // to handle testing environment

const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdbAKVT2tGs1WfBqWNrMekFE5lL4ZuMnWlwJuCuNM33QO2ZYg/viewform'

const StyledGrid = styled(Grid)`
  grid-template-columns: 1fr minmax(auto, 45rem) 1fr;
  width: 100%;
`

const StickySidebar = styled(Sidebar)`
  position: sticky;
  top: 0;

  @media (width < 75rem) {
    display: none;
  }
`

const StickyBox = styled(Box)`
  position: sticky;
  top: 0;
  width: 100%;

  @media (width > 75rem) {
    display: none;
  }
`

function Publications({ publicationsData = [], sections = [] }) {
  const { t } = useTranslation('components')
  const [activeSection, setActiveSection] = useState('')

  useEffect(function onMount() {
    const slug = isBrowser ? window.location.hash.slice(1) : ''
    setActiveSection(slug)
  }, [])

  const sectionsPlusAll = [{ name: t('Sidebar.all'), slug: '' }, ...sections]

  return (
    <>
      <Head
        description={t('Publications.description')}
        title={t('Publications.title')}
      />
      <PageLayout>
        <StickyBox
          background={{ dark: 'dark-3', light: 'neutral-6' }}
          margin={{ bottom: '20px' }}
        >
          <DropdownNav
            activeSection={activeSection}
            sidebarLabel={t('Publications.sidebarLabel')}
            sections={sectionsPlusAll}
            setActiveSection={setActiveSection}
          />
        </StickyBox>
        <Content>
          <section>
            <Heading margin={{ top: 'none' }} size='small'>
              {t('Publications.title')}
            </Heading>
            <Paragraph>
              {t('Publications.formInstruction')}{' '}
              <Anchor href={FORM_URL}>{t('Publications.formLabel')}</Anchor>.{' '}
              {t('Publications.formInfo')}
            </Paragraph>
          </section>
        </Content>
        <StyledGrid>
          <Box align='center'>
            <StickySidebar
              activeSection={activeSection}
              ariaLabel={t('Publications.sideBarLabel')}
              sections={sectionsPlusAll}
              setActiveSection={setActiveSection}
            />
          </Box>
          <article>
            {publicationsData.map(category => (
              <Category
                key={category.title}
                projects={category.projects}
                slug={category.slug}
                title={category.title}
              />
            ))}
          </article>
          <Box />
        </StyledGrid>
      </PageLayout>
    </>
  )
}

Publications.propTypes = {
  publicationsData: arrayOf(
    shape({
      projects: array,
      slug: string,
      title: string,
      weight: number
    })
  ),
  sections: arrayOf(
    shape({
      active: bool,
      setActive: func,
      title: string
    })
  )
}

export default Publications

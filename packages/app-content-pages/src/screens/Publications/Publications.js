import { useEffect, useState } from 'react'
import { Anchor, Box, Grid, Heading, Paragraph } from 'grommet'
import { array, arrayOf, bool, func, number, shape, string } from 'prop-types'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'

import Category from './components/Category/Category.js'
import PageLayout from '../../shared/components/PageLayout/layout.js'
import Head from '../../shared/components/Head'
import Sidebar from '../../shared/components/Sidebar/Sidebar.js'

const isBrowser = typeof window !== 'undefined' // to handle testing environment

const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdbAKVT2tGs1WfBqWNrMekFE5lL4ZuMnWlwJuCuNM33QO2ZYg/viewform'

const Relative = styled.aside`
  position: relative;
`

const StickySidebar = styled(Sidebar)`
  position: sticky;
  top: 0;
`

function Publications({ publicationsData = [], sections = [] }) {
  const { t } = useTranslation('components')
  const [activeSection, setActiveSection] = useState('')

  useEffect(function onMount() {
    const slug = isBrowser ? window.location.hash.slice(1) : ''
    setActiveSection(slug)
  }, [])

  return (
    <>
      <Head
        description={t('Publications.description')}
        title={t('Publications.title')}
      />
      <PageLayout>
        <Grid columns={['25%', 'flex']}>
          <Box />
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
        </Grid>
        <Grid columns={['25%', 'flex']}>
          <Relative>
            <StickySidebar
              activeSection={activeSection}
              ariaLabel={t('Publications.sideBarLabel')}
              sections={sections}
              setActiveSection={setActiveSection}
            />
          </Relative>
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
        </Grid>
      </PageLayout>
    </>
  )
}

Publications.propTypes = {
  className: string,
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

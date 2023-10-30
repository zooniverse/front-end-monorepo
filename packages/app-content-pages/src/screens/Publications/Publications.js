import { useEffect, useState } from 'react'
import { Anchor, Heading, Paragraph } from 'grommet'
import { array, arrayOf, bool, func, number, shape, string } from 'prop-types'
import { useTranslation } from 'next-i18next'

import Category from './components/Category/Category.js'
import PageLayout from '../../shared/components/PageLayout/layout.js'
import TwoColumnLayout from '../../shared/components/TwoColumnLayout'
import Head from '../../shared/components/Head'
import Sidebar from '../../shared/components/Sidebar/Sidebar.js'

const isBrowser = typeof window !== 'undefined' // to handle testing environment

const FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdbAKVT2tGs1WfBqWNrMekFE5lL4ZuMnWlwJuCuNM33QO2ZYg/viewform'

function Publications({ className = '', publicationsData = [], sections = [] }) {
  const { t } = useTranslation('components')
  const [activeSection, setActiveSection] = useState('')

  useEffect(function onMount() {
    const slug = isBrowser ? window.location.hash.slice(1) : ''
    setActiveSection(slug)
  }, [])

  const heading = (
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
  )

  const main = (
    <article>
      {publicationsData.map(category => (
        <Category
          key={category.title}
          title={category.title}
          projects={category.projects}
          slug={category.slug}
        />
      ))}
    </article>
  )

  return (
    <>
      <Head
        description={t('Publications.description')}
        title={t('Publications.title')}
      />
      <PageLayout>
        <TwoColumnLayout
          heading={heading}
          className={className}
          main={main}
          sidebar={<Sidebar activeSection={activeSection} sections={sections} setActiveSection={setActiveSection} />}
        />
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
  filters: arrayOf(
    shape({
      active: bool,
      setActive: func,
      title: string
    })
  )
}

export default Publications

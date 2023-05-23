import { Anchor, Box, Button, Heading, Paragraph } from 'grommet'
import Link from 'next/link'
import { array, arrayOf, bool, func, number, shape, string } from 'prop-types'
import styled, { css } from 'styled-components'
import { useTranslation } from 'next-i18next'

import Category from './components/Category/Category.js'
import TwoColumnLayout from '../../shared/components/TwoColumnLayout'
import Head from '../../shared/components/Head'

const StyledButton = styled(Button)`
  ${props =>
    props.active &&
    css`
      background: none;
      font-weight: bold;
    `}
`
const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdbAKVT2tGs1WfBqWNrMekFE5lL4ZuMnWlwJuCuNM33QO2ZYg/viewform'

function Publications({ className = '', data = [], filters = [] }) {
  const { t } = useTranslation('components')

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
      {data.map(category => (
        <Category
          key={category.title}
          title={category.title}
          projects={category.projects}
          slug={category.slug}
        />
      ))}
    </article>
  )

  const sidebar = (
    <Box as='menu' gap='small' name='Filter by category'>
      {filters.map(filter => (
        <Link
          href={filter.slug ? `#${filter.slug}` : ''}
          key={filter.name}
          passHref
          role='menuitemcheckbox'
        >
          <StyledButton
            active={filter.active}
            ariaChecked={filter.active}
            label={filter.name}
            onClick={filter.setActive}
            plain
          />
        </Link>
      ))}
    </Box>
  )

  return (
    <>
      <Head
        description={t('Publications.description')}
        title={t('Publications.title')}
      />
      <TwoColumnLayout
        heading={heading}
        className={className}
        main={main}
        sidebar={sidebar}
      />
    </>
  )
}

Publications.propTypes = {
  className: string,
  data: arrayOf(
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

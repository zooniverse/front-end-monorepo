import { useTranslation } from 'next-i18next'
import { arrayOf, number, shape, string } from 'prop-types'
import { Box, Heading, Text } from 'grommet'
import { useRouter } from 'next/router'

import ContentBox from '@shared/components/ContentBox'

function Workflows({ workflows = [] }) {
  const { t } = useTranslation('screens')

  const router = useRouter()
  const { locale } = router
  const localeCode = locale === 'test' ? 'en' : locale
  const nf = new Intl.NumberFormat(localeCode, {
    style: 'unit',
    unit: 'day',
    unitDisplay: 'long'
  })

  return (
    <ContentBox title={t('ProjectStats.workflows.title')} titleLevel={3}>
      <Box gap='15px'>
        {workflows?.map(workflow => (
          <Box border={{ color: 'light-5' }} key={workflow.id}>
            <Box height='10px' width='100%'>
              <Box
                height='10px'
                background={
                  workflow?.completeness === 1 ? '#D47811' : 'neutral-2'
                }
                width={`${Math.round(workflow?.completeness * 100)}%`}
              />
            </Box>
            <Box
              pad={{ bottom: '40px', horizontal: '20px', top: '30px' }}
              direction='row'
              justify='between'
              align='center'
            >
              <Heading level={4} size='1rem' margin='none' weight={600}>
                {workflow?.displayName}
              </Heading>
              <Box direction='row' gap='20px'>
                <Text>
                  {t('ProjectStats.workflows.percentComplete', {
                    percent: Math.round(workflow?.completeness * 100)
                  })}
                </Text>
                <Text>ETC: {nf.format(workflow?.etc)}</Text>
                <Text>
                  {t('ProjectStats.workflows.subjectsRetired', {
                    retired: workflow?.retired_set_member_subjects_count,
                    total: workflow?.subjects_count
                  })}
                </Text>
                <Text>
                  {t('ProjectStats.workflows.retireLimit', {
                    number: workflow?.retirement?.options?.count
                  })}
                </Text>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </ContentBox>
  )
}

export default Workflows

Workflows.propTypes = {
  workflows: arrayOf(
    shape({
      completeness: number, // 0 to 1
      displayName: string,
      etc: number,
      id: string.isRequired,
      retirement: shape({
        criteria: string,
        options: shape({
          count: number
        })
      }),
      retired_set_member_subjects_count: number,
      subjects_count: number
    })
  )
}

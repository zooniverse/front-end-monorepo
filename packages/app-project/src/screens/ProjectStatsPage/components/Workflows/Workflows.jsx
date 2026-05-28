import { useTranslation } from 'next-i18next'
import { arrayOf, number, shape, string } from 'prop-types'
import { Box, Button, Heading, ResponsiveContext, Text, Tip } from 'grommet'
import { useContext } from 'react'
import styled from 'styled-components'
import { CircleInformation } from 'grommet-icons'
import { SpacedText } from '@zooniverse/react-components'

import ContentBox from '@shared/components/ContentBox'

const WorkflowContainer = styled(Box)`
  flex-direction: row;
  gap: 15px;
  padding: 20px 20px 30px;
  align-items: center;

  @media (width < 64rem) {
    padding: 10px 15px 15px;
    gap: 10px;
  }
`

const WorkflowNameContainer = styled(Box)`
  width: 45%;

  @media (width < 64rem) {
    width: 60%;
  }

  @media (width < 769px) {
    width: 45%;
  }

  & > h4 {
    font-size: 1rem;
    line-height: 1.2;

    @media (width < 769px) {
      font-size: 0.875rem;
    }
  }
`

const StatsContainerBox = styled(Box)`
  flex-direction: row;
  width: 55%;
  justify-content: flex-end;
  align-content: center;
  gap: 15px;

  @media (width < 64rem) {
    width: 40%;
    flex-direction: column;
    gap: 0;

    .span {
      font-size: 0.75rem;
    }
  }

  @media (width < 769px) {
    width: 55%;
  }
`

function Workflows({ workflows = [] }) {
  const { i18n, t } = useTranslation('screens')
  const size = useContext(ResponsiveContext)

  const localeCode = i18n.language === 'test' ? 'en' : i18n.language
  const nf = new Intl.NumberFormat(localeCode, {
    style: 'unit',
    unit: 'day',
    unitDisplay: 'long'
  })

  return (
    <ContentBox
      title={t('ProjectStats.workflows.title')}
      titleLevel={3}
      fill
      border={{ size: size === 'small' ? '0' : 'thin' }}
    >
      <Box gap='15px'>
        {workflows.length === 0 ? <Box width='100%' pad={{ vertical: 'large'}}>
          <SpacedText weight={700} width='100%' textAlign='center'>{t('ProjectStats.workflows.empty')}</SpacedText>
        </Box>: null}
        {workflows?.map(workflow => (
          <Box border={{ color: 'light-5', size: '0.5px' }} key={workflow.id}>
            <Box height='10px' width='100%'>
              <Box
                height='10px'
                background={workflow?.completeness === 1 ? '#D47811' : 'neutral-2'}
                width={`${Math.round(workflow?.completeness * 100)}%`}
              />
            </Box>
            <WorkflowContainer>
              <WorkflowNameContainer>
                <Heading
                  level={4}
                  margin='none'
                  weight={600}
                  fill
                  color={{ light: 'dark-4', dark: 'white' }}
                >
                  {workflow?.displayName}
                </Heading>
              </WorkflowNameContainer>
              <StatsContainerBox>
                <Text color={{ light: 'dark-4', dark: 'white' }}>
                  {t('ProjectStats.workflows.percentComplete', {
                    percent: Math.round(workflow?.completeness * 100)
                  })}
                </Text>
                {workflow?.completeness === 1 ? null : (
                  <Box direction='row' gap='3px'>
                    <Tip
                      content={<Text color='white'>{t('ProjectStats.workflows.tip')}</Text>}
                      plain
                      dropProps={{
                        align: { top: 'bottom' },
                        background: 'dark-4',
                        round: '5px',
                        pad: '5px'
                      }}
                    >
                      <Button plain icon={<CircleInformation size='0.75rem' />} />
                    </Tip>
                    <Text color={{ light: 'dark-4', dark: 'white' }}>
                      ETC: {nf.format(workflow?.etc)}
                    </Text>
                  </Box>
                )}
                <Text color={{ light: 'dark-4', dark: 'white' }}>
                  {t('ProjectStats.workflows.subjectsRetired', {
                    retired: workflow?.retired_set_member_subjects_count.toLocaleString(localeCode),
                    total: workflow?.subjects_count.toLocaleString(localeCode)
                  })}
                </Text>
                <Text color={{ light: 'dark-4', dark: 'white' }}>
                  {t('ProjectStats.workflows.retireLimit', {
                    number: workflow?.retirement?.options?.count
                  })}
                </Text>
              </StatsContainerBox>
            </WorkflowContainer>
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

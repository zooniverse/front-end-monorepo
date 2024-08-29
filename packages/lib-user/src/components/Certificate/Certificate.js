import { SpacedText, ZooniverseLogo } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { number, shape, string } from 'prop-types'
import styled from 'styled-components'

import {
  ContentBox,
  HeaderLink,
  Layout
} from '@components/shared'

import { formatDateRange } from './helpers/formatDateRange'

const PrintableBox = styled(Box)`
  font-size: 16px;

  #certificate {
    box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.25);
  }

  @media print {
    > *:not(#certificate) {
      visibility: hidden;
    }

    #certificate, #certificate * {
      visibility: visible;
      color: #5c5c5c;
    }

    #certificate {
      box-shadow: none;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }

    #certificate svg,
    #certificate svg g {
      fill: #00979d;
    }
  }

  @page {
    margin: 0;
    size: 'landscape';
  }

  .userName {
    letter-spacing: 6px;
  }

  .userHours {
    letter-spacing: 8px;
  }
`

const DEFAULT_DATE_RANGE = {
  endDate: undefined,
  startDate: undefined
}

function handleClickPrint() {
  window.print()
}

function Certificate({
  hours = 0,
  login = '',
  name = '',
  paramsValidationMessage = '',
  projectDisplayName = '',
  projectsCount = 0,
  selectedDateRange = DEFAULT_DATE_RANGE
}) {
  const { endDate, startDate } = selectedDateRange
  const formattedDateRange = formatDateRange({ startDate, endDate })

  return (
    <PrintableBox>
      <Layout
        primaryHeaderItem={
          <HeaderLink
            href={`/users/${login}/stats${window.location.search}`}
            label='back'
            primaryItem={true}
          />
        }
      >
        <ContentBox
          linkLabel='Save Certificate'
          linkProps={{
            as: 'button',
            onClick: handleClickPrint
          }}
          title='Your Volunteer Certificate'
        >
          {paramsValidationMessage ? (
            <Box
              align='center'
              fill
              justify='center'
              pad='medium'
            >
              <SpacedText uppercase={false}>{paramsValidationMessage}</SpacedText>
            </Box>
          ) : (
            <Box
              id='certificate'
              flex='grow'
              pad='medium'
            >
              <Box
                border={{
                  color: 'neutral-1',
                  size: '8px',
                  style: 'solid',
                  side: 'all'
                }}
                flex='grow'
                pad='xsmall'
              >
                <Box
                  align='center'
                  border={{
                    color: 'neutral-1',
                    size: '4px',
                    style: 'solid',
                    side: 'all'
                  }}
                  flex='grow'
                  justify='center'
                  pad={{
                    horizontal: 'medium',
                    vertical: 'small'
                  }}
                >
                  <ZooniverseLogo
                    id='ZooniverseCertificateLogo'
                    color='#00979d'
                    size='5em'
                  />
                  <SpacedText
                    margin={{ top: 'medium' }}
                    size='2rem'
                    uppercase={false}
                    weight={500}
                  >
                    This is to certify that
                  </SpacedText>
                  <SpacedText
                    className='userName'
                    size='3.75rem'
                    textAlign='center'
                    weight='bold'
                  >
                    {name}
                  </SpacedText>
                  <SpacedText
                    margin={{ top: 'medium' }}
                    size='1.5rem'
                    uppercase={false}
                    weight={500}
                  >
                    has contributed
                  </SpacedText>
                  <SpacedText
                    className='userHours'
                    size='5rem'
                    weight='bold'
                  >
                    {hours}
                  </SpacedText>
                  <SpacedText
                    size='2rem'
                    uppercase={false}
                    weight='bold'
                  >
                    hours
                  </SpacedText>
                  <Box
                    align='center'
                    direction='row'
                    justify='center'
                    margin={{ top: 'medium' }}
                    wrap
                  >
                    <SpacedText
                      size='1.5rem'
                      textAlign='center'
                      uppercase={false}
                      weight={500}
                    >
                      to
                      <SpacedText
                        margin={{ horizontal: 'small' }}
                        size='2rem'
                        uppercase={false}
                        weight='bold'
                      >
                        {projectsCount ? (
                          `${projectsCount} projects`
                        ) : (
                          projectDisplayName
                        )}
                      </SpacedText>
                    </SpacedText>
                    <SpacedText
                      size='1.5rem'
                      textAlign='center'
                      uppercase={false}
                      weight={500}
                    >
                      during
                      <SpacedText
                        margin={{ horizontal: 'small' }}
                        size='2rem'
                        uppercase={false}
                        weight='bold'
                      >
                        {formattedDateRange}
                      </SpacedText>
                    </SpacedText>
                  </Box>
                  <SpacedText
                    size='1.5rem'
                    textAlign='center'
                    uppercase={false}
                    weight={500}
                  >
                    hosted by the online citizen science platform <strong>Zooniverse</strong>
                  </SpacedText>
                  <Box
                    align='center'
                    flex='grow'
                    margin={{
                      bottom: 'small',
                      top: 'medium'
                    }}
                  >
                    <img
                      src='/assets/LTSignature.png'
                      alt='Signature of Dr. Laura Trouille'
                    />
                    <svg width='272' height='2' viewBox='0 0 272 2'>
                      <defs>
                        <linearGradient id='signature_line' gradientUnits='userSpaceOnUse'>
                          <stop stopColor='white' />
                          <stop offset='0.5' stopColor='dark-5' />
                          <stop offset='1' stopColor='white' />
                        </linearGradient>
                      </defs>
                      <path d='M1 1H271' stroke='url(#signature_line)'/>
                    </svg>
                    <SpacedText
                      size='1.5rem'
                      uppercase={false}
                      weight={500}
                    >
                      Dr. Laura Trouille
                    </SpacedText>
                    <SpacedText
                      uppercase={false}
                      weight={500}
                    >
                      Zooniverse Principal Investigator
                    </SpacedText>
                    <SpacedText
                      uppercase={false}
                      weight={500}
                    >
                      contact@zooniverse.org
                    </SpacedText>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </ContentBox>
      </Layout>
    </PrintableBox>
  )
}

Certificate.propTypes = {
  hours: number,
  login: string,
  name: string,
  paramsValidationMessage: string,
  projectDisplayName: string,
  projectsCount: number,
  selectedDateRange: shape({
    endDate: string,
    startDate: string
  })
}

export default Certificate

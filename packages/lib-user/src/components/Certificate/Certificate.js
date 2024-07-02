import { SpacedText, ZooniverseLogo } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { number, string } from 'prop-types'
import styled, { css } from 'styled-components'

import { getDateInterval } from '@utils'

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
    }

    #certificate {
      box-shadow: none;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
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

const StyledImageBox = styled(Box)`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 2px;
    width: 270px;
    ${props =>
      props.theme.dark
        ? css`
            background: linear-gradient(
              90deg,
              transparent 0%,
              #000000 50%,
              transparent 100%
            );
          `
        : css`
            background: linear-gradient(
              90deg,
              transparent 0%,
              #a6a7a9 50%,
              transparent 100%
            );
          `}
  }
`

function handleClickPrint() {
  window.print()
}

function Certificate({
  creditedName = '',
  displayName = '',
  hours = 0,
  login = '',
  projectDisplayName = '',
  projectsCount = 0,
  selectedDateRange = 'AllTime'
}) {
  const { start_date, end_date } = getDateInterval(selectedDateRange)

  const formattedDateRange = formatDateRange(start_date, end_date)

  return (
    <PrintableBox>
      <Layout
        primaryHeaderItem={
          <HeaderLink
            href={`/users/${login}/stats`}
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
                  {creditedName || displayName}
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
                  <StyledImageBox
                    margin={{ bottom: 'xxsmall' }}
                    pad={{ bottom: 'xxsmall' }}
                  >
                    <img
                      src='/assets/LTSignature.png'
                      alt='Signature of Dr. Laura Trouille'
                    />
                  </StyledImageBox>
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
                    Zooniverse PI
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
        </ContentBox>
      </Layout>
    </PrintableBox>
  )
}

Certificate.propTypes = {
  creditedName: string,
  displayName: string,
  hours: number,
  login: string,
  projectDisplayName: string,
  projectsCount: number,
  selectedDateRange: string
}

export default Certificate

import { SpacedText, ZooniverseLogo } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { number, string } from 'prop-types'
import styled from 'styled-components'

import {
  ContentBox,
  HeaderLink,
  Layout
} from '@components/shared'

const PrintableBox = styled(Box)`
  font-size: 16px;

  @media print {
    > *:not(#certificate) {
      visibility: hidden;
    }

    #certificate, #certificate * {
      visibility: visible;
    }

    #certificate {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }

  @page {
    size: landscape;
  }

  .userName {
    letter-spacing: 6px;
  }

  .userHours {
    letter-spacing: 8px;
  }
`

function Certificate({
  creditedName = '',
  displayName = '',
  hours = 0,
  login = '',
  projectsCount = 0,
  selectedDateRange = 'AllTime',
  selectedProject = 'AllProjects'
}) {
  return (
    <PrintableBox>
      <Layout
        primaryHeaderItem={
          <HeaderLink
            href={`https://www.zooniverse.org/users/${login}/stats`}
            label='back'
            primaryItem={true}
          />
        }
      >
        <ContentBox
          linkLabel='Generate Certificate'
          linkProps={{
            as: 'button',
            onClick: () => window.print()
          }}
          title='Your Volunteer Certificate'
        >
          <Box id='certificate'>
            <Box
              border={{
                color: 'brand',
                size: 'medium',
                style: 'solid',
                side: 'all'
              }}
              margin='medium'
              pad='xsmall'
            >
              <Box
                align='center'
                border={{
                  color: 'brand',
                  size: 'small',
                  style: 'solid',
                  side: 'all'
                }}
                justify='center'
                pad={{
                  horizontal: 'medium',
                  vertical: 'small'
                }}
              >
                <ZooniverseLogo
                  id='ZooniverseCertificateLogo'
                  color='#00979d'
                  size='4rem'
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
                <SpacedText
                  margin={{ top: 'medium' }}
                  size='1.5rem'
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
                      selectedProject
                    )}
                  </SpacedText>
                  during
                  <SpacedText
                    margin={{ horizontal: 'small' }}
                    size='2rem'
                    weight='bold'
                  >
                    {selectedDateRange}
                  </SpacedText>
                </SpacedText>
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
                  margin={{
                    bottom: 'small',
                    top: 'medium'
                  }}
                >
                  <img
                    src='/assets/LTSignature.png'
                    alt='Signature of Dr. Laura Trouille'
                  />
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
  selectedDateRange: string,
  selectedProject: string,
  projectsCount: number
}

export default Certificate

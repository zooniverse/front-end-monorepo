import { ZooniverseLogo } from '@zooniverse/react-components'
import { Box } from 'grommet'
import { shape, string } from 'prop-types'
import styled from 'styled-components'

import {
  ContentBox,
  HeaderLink,
  Layout
} from '@components/shared'

const PrintableBox = styled(Box)`
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
`

function Certificate({ user }) {
  return (
    <PrintableBox>
      <Layout
        primaryHeaderItem={
          <HeaderLink
            href={`https://www.zooniverse.org/users/${user?.login}`}
            label='back to profile'
            primaryItem={true}
          />
        }
      >
        <ContentBox
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
                pad='large'
              >
                <ZooniverseLogo
                  id='ZooniverseCertificateLogo'
                  color='#00979d'
                  size='4em'
                />
                
                <h1>Certificate for {user?.display_name}</h1>
                
                <h3>Coming soon!</h3>
                
                <p style={{ fontSize: '4rem' }}>42</p>
                
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.</p>
                
                <img src='/assets/LTSignature.png' alt='Laura Trouille Signature' />
                
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris.</p>
              </Box>
            </Box>
          </Box>
        </ContentBox>
        <Box
          direction='row'
          justify='end'
        >
          <button
            onClick={() => window.print()}
          >
            Generate Certificate
          </button>
        </Box>
      </Layout>
    </PrintableBox>
  )
}

Certificate.propTypes = {
  user: shape({
    display_name: string,
    login: string
  })
}

export default Certificate

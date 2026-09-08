import { Anchor, Box, Heading, Paragraph, Text } from 'grommet'
import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'

const StyledList = styled.ul`
  margin-block-start: 0;
  margin-block-end: 0;
  list-style-type: none;
  padding-inline-start: 0;
  font-size: 1rem;
  color: ${props => (props.theme.dark ? 'white' : 'black')};
`

export default function Resources() {
  const { t } = useTranslation()

  return (
    <Box as='section' margin={{ bottom: '40px' }}>
      <Paragraph margin='none'>
        <Trans
          i18nKey={'AIEthics.about.paragraphs.first'}
          t={t}
          components={[<Anchor href='' key='need-link-blog' />]}
        />
      </Paragraph>
      <Paragraph>{t('AIEthics.about.paragraphs.second')}</Paragraph>
      <Paragraph margin='none'>{t('AIEthics.about.paragraphs.third')}</Paragraph>
      <Paragraph>{t('AIEthics.about.paragraphs.fourth')}</Paragraph>
      <Heading level={3} color={{ light: 'black', dark: 'white' }} size='1rem' margin='none'>
        {t('AIEthics.about.projectTeamList.heading')}
      </Heading>
      <StyledList>
        <li>
          <Paragraph margin='none'>
            {t('AIEthics.about.projectTeamList.pi')}: Samantha Blickhan (Zooniverse Co-Director and
            Humanities Lead, Adler Planetarium)
          </Paragraph>
        </li>
        <li>
          <Paragraph margin='none'>
            {t('AIEthics.about.projectTeamList.coord')}: Hillary Burgess (Hillary Burgess, LLC)
          </Paragraph>
        </li>
        <li>
          <Paragraph margin='none'>
            {t('AIEthics.about.projectTeamList.eval')}: Tanisha Tate Woodson (Catalyst Consulting)
          </Paragraph>
        </li>
        <li>
          <Paragraph margin='none'>
            {t('AIEthics.about.projectTeamList.ra')}: Kaylene Caswell Stocking (Graduate Fellow,
            UC-Berkeley Kavli Center for Ethics, Science, and the Public), Chad Harper (Graduate
            Fellow, UC-Berkeley Kavli Center for Ethics, Science, and the Public)
          </Paragraph>
        </li>
      </StyledList>
      <Heading
        level={3}
        color={{ light: 'black', dark: 'white' }}
        size='1rem'
        margin={{ top: '1em', bottom: 'none' }}
      >
        {t('AIEthics.about.advisors.heading')}
      </Heading>
      <StyledList>
        <li>
          <Paragraph margin='none'>
            Abigail Vieregg (David N. Schramm Director of the Kavli Institute for Cosmological
            Physics; Professor, Physics, Astronomy and Astrophysics, Enrico Fermi Institute,
            University of Chicago)
          </Paragraph>
        </li>
        <li>
          <Paragraph margin='none'>
            Cliff Johnson (Zooniverse Co-Director and Science Lead, Adler Planetarium)
          </Paragraph>
        </li>
        <li>
          <Paragraph margin='none'>Laura Trouille (Zooniverse PI, The Adler Planetarium)</Paragraph>
        </li>
        <li>
          <Paragraph margin='none'>
            Lea Witkowsky (Executive Director, UC-Berkeley Kavli Center for Ethics, Science, and the
            Public)
          </Paragraph>
        </li>
        <li>
          <Paragraph margin='none'>
            Lucy Fortson (Zooniverse co-founder, Professor of Physics and Astronomy at the
            University of Minnesota)
          </Paragraph>
        </li>
      </StyledList>
      <Heading
        level={3}
        color={{ light: 'black', dark: 'white' }}
        size='1rem'
        margin={{ top: '1em', bottom: 'none' }}
      >
        {t('AIEthics.about.funding.heading')}
      </Heading>
      <Paragraph margin='none'>{t('AIEthics.about.funding.paragraph')}</Paragraph>
      <Heading
        level={3}
        color={{ light: 'black', dark: 'white' }}
        size='1rem'
        margin={{ top: '1em', bottom: 'none' }}
      >
        {t('AIEthics.about.acknowledgements.heading')}
      </Heading>
      <Paragraph margin={{ top: 'none' }}>
        {t('AIEthics.about.acknowledgements.paragraph')}
      </Paragraph>
      <StyledList>
        <li>Abigail Cecilia Zesati</li>
        <li>Andrea Grover</li>
        <li>Andrew Piper</li>
        <li>Antonio Pasqua</li>
        <li>Bruce Catter</li>
        <li>Caroline Nickerson</li>
        <li>Carrie Seltzer</li>
        <li>Chris Lintott</li>
        <li>Damian Sheils</li>
        <li>Gwen Shafer</li>
        <li>Harman Kaur</li>
        <li>Harry Smith</li>
        <li>Hasret Balcioglu</li>
        <li>Hayley Roberts</li>
        <li>Julia Brown</li>
        <li>Julia Parrish</li>
        <li>Katina Michael</li>
        <li>Kirstie Whitaker</li>
        <li>Lea Shanley</li>
        <li>Lindsay House</li>
        <li>Liz Dowthwaite</li>
        <li>Lu Cheng</li>
        <li>Lynn Arneill-Brown</li>
        <li>Marisa Ponti</li>
        <li>Mark Basham</li>
        <li>Muireann Nic Corcrain</li>
        <li>Michael Corey</li>
        <li>Monica Granados</li>
        <li>Pen-Yuan Hsing</li>
        <li>Peter Mason</li>
        <li>Ramana Sankar</li>
        <li>Rob Guralnick</li>
        <li>Rosemary Johnson</li>
        <li>Sadie Coffin</li>
        <li>Sallie Taylerson</li>
        <li>Sandy Harris</li>
        <li>Sara Brumfield</li>
        <li>Sarah Kirn</li>
      </StyledList>
    </Box>
  )
}

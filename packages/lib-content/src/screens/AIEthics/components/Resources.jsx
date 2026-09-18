import { Anchor, Box, Heading, Paragraph, Text } from 'grommet'
import { Trans, useTranslation } from 'react-i18next'
import styled from 'styled-components'

const StyledList = styled.ul`
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 20px;
`

export default function Resources() {
  const { t } = useTranslation()

  return (
    <Box>
      <Heading
        level={3}
        color={{ light: 'black', dark: 'white' }}
        size='1rem'
        margin={{ top: 'none' }}
      >
        {t('AIEthics.resources.first')}
      </Heading>
      <StyledList>
        <li>
          <Anchor
            href='https://theoryandpractice.citizenscienceassociation.org/articles/10.5334/cstp.241'
            label='Opportunities and Risks for Citizen Science in the Age of Artificial Intelligence'
            size='1rem'
          />
        </li>
        <li>
          <Anchor
            href='https://theoryandpractice.citizenscienceassociation.org/collections/ai-and-citizen-science'
            label='Collection: The Future of Artificial Intelligence and Citizen Science'
            size='1rem'
          />
        </li>
        <li>
          <Anchor
            href='https://www.informationliteracy.gov/page/ai-literacy'
            label='AI Literacy (InformationLiteracy.gov)'
            size='1rem'
          />
        </li>
      </StyledList>
      <Heading
        level={3}
        color={{ light: 'black', dark: 'white' }}
        size='1rem'
        margin={{ top: '20px', bottom: '10px' }}
      >
        {t('AIEthics.resources.second')}
      </Heading>
      <StyledList>
        <li>
          <Anchor
            href='https://participatorysciences.org/resources/data-ethics'
            label='Data Ethics in the Participatory Sciences Toolkit'
            size='1rem'
          />
        </li>
        <li>
          <Anchor
            href='https://theoryandpractice.citizenscienceassociation.org/collections/ethical-issues-in-cs'
            label='Collection: Ethical Issues in Citizen Science'
            size='1rem'
          />
        </li>
      </StyledList>
      <Heading
        level={3}
        color={{ light: 'black', dark: 'white' }}
        size='1rem'
        margin={{ top: '20px', bottom: '10px' }}
      >
        {t('AIEthics.resources.third')}
      </Heading>
      <StyledList>
        <li>
          <Anchor
            href='https://www.zooniverse.org/projects/hughdickinson/galaxy-zoo-clump-scout-ii'
            label='Clump Scout II'
            size='1rem'
          />
        </li>
        <li>
          <Anchor
            href='https://www.zooniverse.org/projects/erinmc/dark-energy-explorers'
            label='Dark Energy Explorers'
            size='1rem'
          />
        </li>
        <li>
          <Anchor
            href='https://www.zooniverse.org/projects/bg557/field-journal-fix-up'
            label='Field Journal Fix-Up'
            size='1rem'
          />
        </li>
        <li>
          <Anchor
            href='https://www.zooniverse.org/projects/hjsmith/the-material-culture-of-wills-england-1540-1790'
            label='The Material Culture of Wills: England 1540-1790'
            size='1rem'
          />
        </li>
      </StyledList>
      <Heading
        level={3}
        color={{ light: 'black', dark: 'white' }}
        size='1rem'
        margin={{ top: '20px', bottom: '10px' }}
      >
        {t('AIEthics.resources.fourth')}
      </Heading>
      <StyledList>
        <li>
          <Anchor
            href='https://panoptes-uploads.zooniverse.org/project_attached_image/6970b7a1-3598-4019-b7b6-7f16734549eb.pdf'
            label='Citizen Readers’ Commitment to Responsible AI'
            size='1rem'
          />
        </li>
        <li>
          <Anchor
            href='https://tkilleste.in/projects/responsible_ml'
            label='Responsible Use of Machine Learning in Kilonova Seekers'
            size='1rem'
          />
        </li>
      </StyledList>
    </Box>
  )
}

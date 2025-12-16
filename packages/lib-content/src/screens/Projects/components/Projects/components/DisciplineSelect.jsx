import { Box, Button, Image, Text } from 'grommet'
import styled, { useTheme } from 'styled-components'
import { ZooniverseLogo } from '@zooniverse/react-components'
import { FormPrevious, FormNext } from 'grommet-icons'
import { useRef } from 'react'

import { useTranslation } from '@translations/i18n'

const Relative = styled(Box)`
  position: relative;
`

const StyledList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  list-style: none;
  margin: 15px 0;
  padding: 2px; // for the box-shadow
  overflow-x: scroll;
`

const StyledButton = styled(Button)`
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 60px;
  border-width: 1px;
  padding: 8px 15px;
  border-color: ${props => props.$borderColor};
  border-style: solid;
  border-width: 1px;

  &[aria-selected='true'] {
    background: ${props =>
      props.theme.dark
        ? props.theme.global.colors['neutral-1']
        : props.theme.global.colors['accent-1']};
    border-color: transparent;
  }

  &:hover,
  &:focus {
    border-color: ${props =>
      props.theme.dark ? 'white' : props.theme.global.colors['neutral-1']};

    &:hover:not([aria-selected='true']),
    &:focus:not([aria-selected='true']) {
      background: ${props =>
        props.theme.dark
          ? props.theme.global.colors['dark-5']
          : props.theme.global.colors['light-1']};
    }
  }

  span {
    text-wrap: nowrap;
  }
`

const LeftButton = styled(Button)`
  position: absolute;
  left: -45px;
  top: 50%;
  transform: translateY(-50%);

  @media (max-width: 768px) {
    display: none;
  }
`

const RightButton = styled(Button)`
  position: absolute;
  right: -45px;
  top: 50%;
  transform: translateY(-50%);

  @media (max-width: 768px) {
    display: none;
  }
`

const DisciplineButton = ({ option, setDiscipline, value }) => (
  <StyledButton
    aria-selected={value === option.value}
    $borderColor={option.borderColor}
    label={
      <Box direction='row' align='center' gap='5px'>
        <Image
          src={`https://static.zooniverse.org/fem-assets/discipline-icons/${
            option.value === 'social science'
              ? 'social-science'
              : option.value === 'astronomy'
              ? 'space'
              : option.value
          }.svg`}
          height='35px'
        />
        <Text color={{ light: 'black', dark: 'white' }} weight='bold'>
          {option.label}
        </Text>
      </Box>
    }
    onClick={() => setDiscipline(option.value)}
    plain
  />
)

function DisciplineSelect({ setDiscipline, value }) {
  const { t } = useTranslation()
  const { dark, global } = useTheme()

  const scrollContainer = useRef()

  const options = [
    {
      borderColor: '#e7bbe3',
      label: t('Projects.disciplines.arts'),
      value: 'arts'
    },
    {
      borderColor: '#43BBFD',
      label: t('Projects.disciplines.biology'),
      value: 'biology'
    },
    {
      borderColor: '#ADDDE0',
      label: t('Projects.disciplines.climate'),
      value: 'climate'
    },
    {
      borderColor: '#65EECA',
      label: t('Projects.disciplines.history'),
      value: 'history'
    },
    {
      borderColor: '#FFB6AA',
      label: t('Projects.disciplines.language'),
      value: 'language'
    },
    {
      borderColor: '#F1AE45',
      label: t('Projects.disciplines.literature'),
      value: 'literature'
    },
    {
      borderColor: '#E65252',
      label: t('Projects.disciplines.medicine'),
      value: 'medicine'
    },
    {
      borderColor: '#52DB72',
      label: t('Projects.disciplines.nature'),
      value: 'nature'
    },
    {
      borderColor: '#FF40FF',
      label: t('Projects.disciplines.physics'),
      value: 'physics'
    },
    {
      borderColor: '#F0B200',
      label: t('Projects.disciplines.social'),
      value: 'social science'
    },
    {
      borderColor: '#C17DDF',
      label: t('Projects.disciplines.space'),
      value: 'astronomy' // This discipline is labeled Space, but panoptes expects `astronomy`
    },
    // Need leadership input on why this was designed as a discipline rather than a project state
    // {
    //   borderColor: '#FF9300',
    //   label: t('Projects.disciplines.beta'),
    //   value: 'beta'
    // }
  ]

  function handleLeftScroll() {
    const scrollContainerWidth = scrollContainer?.current?.scrollWidth
    const incrementSize = scrollContainerWidth / 5
    scrollContainer?.current?.scrollBy({
      left: -incrementSize,
      behavior: 'smooth'
    })
  }

  function handleScrollRight() {
    const scrollContainerWidth = scrollContainer?.current?.scrollWidth
    const incrementSize = scrollContainerWidth / 5
    scrollContainer?.current?.scrollBy({
      left: incrementSize,
      behavior: 'smooth'
    })
  }

  return (
    <Relative>
      <LeftButton
        plain
        label={<FormPrevious size='2.5rem' color='accent-1' />}
        onClick={handleLeftScroll}
      />
      <StyledList ref={scrollContainer}>
        <li>
          <StyledButton
            aria-selected={value === null}
            label={
              <Box direction='row' align='center' gap='5px'>
                <ZooniverseLogo
                  id='all-disciplines-projects-page'
                  size='35px'
                  color={dark ? global.colors['accent-1'] : 'black'}
                />
                <Text weight='bold' color={{ light: 'black', dark: 'white' }}>
                  {t('Projects.disciplines.all')}
                </Text>
              </Box>
            }
            onClick={() => setDiscipline(null)}
            plain
          />
        </li>
        {options.map(option => (
          <li key={option.value}>
            <DisciplineButton
              option={option}
              setDiscipline={setDiscipline}
              value={value}
            />
          </li>
        ))}
      </StyledList>
      <RightButton
        plain
        label={
          <FormNext
            size='2.5rem'
            color='accent-1'
            onClick={handleScrollRight}
          />
        }
      />
    </Relative>
  )
}

export default DisciplineSelect

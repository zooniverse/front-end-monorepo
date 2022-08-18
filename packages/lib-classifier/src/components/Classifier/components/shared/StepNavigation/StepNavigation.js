import React from 'react'
import PropTypes from 'prop-types'
import { Button, Box, RadioButtonGroup } from 'grommet'
import styled from 'styled-components'
import { FormNext, FormPrevious } from 'grommet-icons'
import { useTranslation } from 'react-i18next'

const StyledButton = styled(Button)`
  &:first-of-type {
    margin: 0 15px 0 0;
    padding: 0;
  }

  &:last-of-type {
    margin: 0;
    padding: 0;
  }
`

const StyledRadioButtonGroup = styled(RadioButtonGroup)`
  position: relative;

  > label {
    > span {
        height: 0;
        overflow: hidden;
        position: absolute;
        width: 0;
      }

    > div {
      margin-right: 15px;
    }
  }
`

function StepNavigation({
  className = '',
  name = 'step-selectors',
  onChange = () => true,
  stepIndex = 0,
  steps = []
}) {
  const { t } = useTranslation('components')

  function onRadioChange(event) {
    const [key, value] = event.target.value.split('-')
    const indexValue = parseInt(value)
    onChange(indexValue)
  }

  if (steps?.length > 1) {
    const nextStep = stepIndex + 1
    const prevStep = stepIndex - 1
    const options = steps.map((step, index) => {
      const label = t('StepNavigation.go', { index: index + 1 })
      // We can't just use index for the value
      // because Grommet is using indexes internally as keys and this will error with a duplicate key
      const value = `step-${index}`
      return {
        id: `${name}-${value}`,
        label,
        value
      }
    })
    return (
      <Box align='center' className={className} direction='row' justify='center' margin={{ top: 'medium' }}>
        <StyledButton
          a11yTitle={t('StepNavigation.previous')}
          data-index={prevStep}
          disabled={stepIndex === 0}
          icon={<FormPrevious />}
          onClick={() => onChange(prevStep)}
          plain
        />
        <StyledRadioButtonGroup
          direction='row'
          gap='none'
          name={name}
          onChange={onRadioChange}
          options={options}
          value={`step-${stepIndex}`}
        />
        <StyledButton
          a11yTitle={t('StepNavigation.next')}
          data-index={nextStep}
          disabled={stepIndex === steps.length - 1}
          icon={<FormNext />}
          onClick={() => onChange(nextStep)}
          plain
        />
      </Box>
    )
  }

  return null
}

StepNavigation.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  stepIndex: PropTypes.number,
  steps: PropTypes.array
}

export default StepNavigation

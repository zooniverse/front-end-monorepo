import { array, func, number, string } from 'prop-types'
import { Button, Box, RadioButtonGroup } from 'grommet'
import styled from 'styled-components'
import { FormNext, FormPrevious } from 'grommet-icons'
import { useTranslation } from '@translations/i18n'

const StyledRadioButtonGroup = styled(RadioButtonGroup)`
  display: flex;
  flex-wrap: wrap;
  gap: 15px 0; // between rows if flex-wrapped

  > label {
    > span {
      height: 0;
      overflow: hidden;
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
      <Box
        align='center'
        className={className}
        direction='row'
        justify='center'
        margin={{ vertical: 'medium', horizontal: '5px' }}
      >
        <Button
          a11yTitle={t('StepNavigation.previous')}
          data-index={prevStep}
          disabled={stepIndex === 0}
          icon={<FormPrevious />}
          onClick={() => onChange(prevStep)}
          plain
          margin={{ right: '15px'}}
        />
        <StyledRadioButtonGroup
          direction='row'
          gap='0'
          name={name}
          onChange={onRadioChange}
          options={options}
          value={`step-${stepIndex}`}
        />
        <Button
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
  className: string,
  name: string,
  onChange: func,
  stepIndex: number,
  steps: array
}

export default StepNavigation

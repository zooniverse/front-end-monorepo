import { Box, Text, TextArea } from 'grommet'
import PropTypes from 'prop-types'
import { useRef } from 'react';
import { useTranslation } from '@translations/i18n'
import styled from 'styled-components'
import { Markdownz, PrimaryButton } from '@zooniverse/react-components'

const StyledText = styled(Text)`
  display: block;
  margin: 10px 0;
`

const StyledTextArea = styled(TextArea)`
  font-family: 'Anonymous Pro', monospace;
  @font-face {
    font-family: 'Anonymous Pro';
    font-style: normal;
    font-weight: 400;
    src:
      local('Anonymous Pro'),
      local('Anonymous Pro-Regular'),
      url(https://fonts.gstatic.com/s/anonymouspro/v21/rP2Bp2a15UIB7Un-bOeISG3pHls29QP-4Ks.woff2) 
      format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
`

export default function TextFromSubjectTask ({
  autoFocus = false,
  disabled = false,
  isChanged = false,
  resetToSubject = () => true,
  task,
  value,
  updateAnnotation = () => true
}) {
  const textArea = useRef()
  const { t } = useTranslation('plugins')

  function onChange () {
    updateAnnotation(textArea)
  }

  const components = {
    a: StyledText,
    h1: StyledText,
    h2: StyledText,
    h3: StyledText,
    h4: StyledText,
    h5: StyledText,
    h6: StyledText,
    p: StyledText,
    span: Text
  }

  return (
    <Box
      direction='column'
    >
      <label
        htmlFor={`${task.taskKey}-${task.type}`}
      >
        <Markdownz components={components}>{task.instruction}</Markdownz>
        <StyledTextArea
          ref={textArea}
          autoFocus={autoFocus}
          disabled={disabled}
          id={`${task.taskKey}-${task.type}`}
          rows={value?.split(/\r\n|\r|\n/).length + 1}
          value={value}
          onChange={onChange}
        />
      </label>
      <PrimaryButton
        color='teal'
        disabled={disabled || !isChanged}
        label={t('TextFromSubjectTask.reset')}
        onClick={() => resetToSubject()}
      />
    </Box>
  )
}

TextFromSubjectTask.propTypes = {
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  task: PropTypes.shape({
    help: PropTypes.string,
    instruction: PropTypes.string,
    required: PropTypes.bool,
    taskKey: PropTypes.string,
    text_tags: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string
  }).isRequired,
  updateAnnotation: PropTypes.func,
  value: PropTypes.string.isRequired
}

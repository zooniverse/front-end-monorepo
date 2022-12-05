import { expect } from 'chai'
import { Grommet } from 'grommet'
import { render, screen } from '@testing-library/react'
import zooTheme from '@zooniverse/grommet-theme'

import QuestionInput from './QuestionInput'

describe('Component > QuestionInput', function () {
  describe('with checkbox type', function () {
    it('should show the label', function () {
      render(
        <Grommet
          theme={zooTheme}
          themeMode='light'
        >
          <QuestionInput
            option={{
              label: 'Eating',
              value: 'TNG'
            }}
            questionId='WHTBHVRSDS'
            type='checkbox'
          />
        </Grommet>
      )
      expect(screen.getByText('Eating')).to.be.ok()
    })

    it('should not be the document active element', function () {
      render(
        <Grommet
          theme={zooTheme}
          themeMode='light'
        >
          <QuestionInput
            option={{
              label: 'Eating',
              value: 'TNG'
            }}
            questionId='WHTBHVRSDS'
            type='checkbox'
          />
        </Grommet>
      )
      expect(screen.getByLabelText('Eating')).to.not.equal(document.activeElement)
    })

    describe('with hasFocus true', function () {
      it('should be the document active element', function () {
        render(
          <Grommet
            theme={zooTheme}
            themeMode='light'
          >
            <QuestionInput
              hasFocus
              option={{
                label: 'Eating',
                value: 'TNG'
              }}
              questionId='WHTBHVRSDS'
              type='checkbox'
            />
          </Grommet>
        )
        expect(screen.getByLabelText('Eating')).to.equal(document.activeElement)
      })
    })
  })

  describe('with radio type', function () {
    it('should show the label', function () {
      render(
        <Grommet
          theme={zooTheme}
          themeMode='light'
        >
          <QuestionInput
            option={{
              label: 'Yes',
              value: 'S'
            }}
            questionId='RTHRNNGPRSNT'
            type='radio'
          />
        </Grommet>
      )
      expect(screen.getByText('Yes')).to.be.ok()
    })

    it('should have input not as the document active element', function () {
      render(
        <Grommet
          theme={zooTheme}
          themeMode='light'
        >
          <QuestionInput
            option={{
              label: 'Yes',
              value: 'S'
            }}
            questionId='RTHRNNGPRSNT'
            type='radio'
          />
        </Grommet>
      )
      expect(screen.getByLabelText('Yes')).to.not.equal(document.activeElement)
    })

    describe('with hasFocus true', function () {
      it('should have input as the document active element', function () {
        render(
          <Grommet
            theme={zooTheme}
            themeMode='light'
          >
            <QuestionInput
              hasFocus
              option={{
                label: 'Yes',
                value: 'S'
              }}
              questionId='RTHRNNGPRSNT'
              type='radio'
            />
          </Grommet>
        )
        expect(screen.getByLabelText('Yes')).to.equal(document.activeElement)
      })
    })
  })
})

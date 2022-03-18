import { expect } from 'chai'
import { Grommet } from 'grommet'
import React from 'react'
import sinon from 'sinon'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import zooTheme from '@zooniverse/grommet-theme'

import QuestionInput from './QuestionInput'

describe('Component > QuestionInput', function () {
  describe('with checkbox type', function () {
    it('should render without crashing', function () {
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
      expect(screen).to.be.ok()
    })

    it('should render the label', function () {
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
      expect(screen.getByText('Eating')).to.exist()
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

    describe('onChange', function () {
      it('should call handleCheckBoxChange with checked and value', function () {
        const handleCheckBoxChangeSpy = sinon.spy()
        render(
          <Grommet
            theme={zooTheme}
            themeMode='light'
          >
            <QuestionInput
              handleCheckBoxChange={handleCheckBoxChangeSpy}
              option={{
                label: 'Eating',
                value: 'TNG'
              }}
              questionId='WHTBHVRSDS'
              type='checkbox'
            />
          </Grommet>
        )
        expect(handleCheckBoxChangeSpy).to.not.have.been.called()
        userEvent.click(screen.getByLabelText('Eating'))
        expect(handleCheckBoxChangeSpy).to.have.been.calledWith('TNG', true)
      })
    })
  })

  describe('with radio type', function () {
    it('should render without crashing', function () {
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
      expect(screen).to.be.ok()
    })

    it('should render the label', function () {
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
      expect(screen.getByText('Yes')).to.exist()
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

    describe('onClick', function () {
      it('should call handleRadioChange with value and checked', function () {
        const handleRadioChangeSpy = sinon.spy()
        render(
          <Grommet
            theme={zooTheme}
            themeMode='light'
          >
            <QuestionInput
              handleRadioChange={handleRadioChangeSpy}
              option={{
                label: 'Yes',
                value: 'S'
              }}
              questionId='RTHRNNGPRSNT'
              type='radio'
            />
          </Grommet>
        )
        expect(handleRadioChangeSpy).to.not.have.been.called()
        userEvent.click(screen.getByLabelText('Yes'))
        expect(handleRadioChangeSpy).to.have.been.calledWith('S')
      })
    })

    describe('onKeyDown', function () {
      it('should call handleRadioKeyDown on keyDown of the input', function () {
        const handleRadioKeyDownSpy = sinon.spy()
        render(
          <Grommet
            theme={zooTheme}
            themeMode='light'
          >
            <QuestionInput
              handleRadioKeyDown={handleRadioKeyDownSpy}
              option={{
                label: 'Yes',
                value: 'S'
              }}
              questionId='RTHRNNGPRSNT'
              type='radio'
            />
          </Grommet>
        )
        expect(handleRadioKeyDownSpy).to.not.have.been.called()
        userEvent.type(screen.getByLabelText('Yes'), '{backspace}')
        expect(handleRadioKeyDownSpy).to.have.been.calledOnce()
      })
    })
  })
})

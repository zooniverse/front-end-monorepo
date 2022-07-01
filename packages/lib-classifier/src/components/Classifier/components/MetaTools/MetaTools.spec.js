import React from 'react'
import { render, screen } from '@testing-library/react'
import asyncStates from '@zooniverse/async-states'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { when } from 'mobx'
import { Provider } from 'mobx-react'

import { DrawingTaskFactory, UPPFactory, WorkflowFactory } from '@test/factories'
import mockStore from '@test/mockStore'
import MetaTools from './'

describe('Components > MetaTools', function () {
  function withStore(store) {
    return function Wrapper({ children }) {
      return (
        <Grommet theme={zooTheme}>
          <Provider classifierStore={store}>
            {children}
          </Provider>
        </Grommet>
      )
    }
  }

// this turns off Mocha's time limit for slow tests
  this.timeout(0)

  describe('defaults', function () {
    let addToCollections, favourite, hidePreviousMarks, metadata

    before(function () {
      const store = mockStore()
      render(
        <MetaTools />,
        {
          wrapper: withStore(store)
        }
      )
      addToCollections = screen.getByRole('button', {
        name: 'MetaTools.CollectionsButton.add'
      })
      metadata = screen.getByRole('button', {
        name: 'MetaTools.MetadataButton.label'
      })
      favourite = screen.getByRole('checkbox', {
        name: 'Add to favorites'
      })
      hidePreviousMarks = screen.queryByRole('checkbox', {
        name: 'FormView MetaTools.HidePreviousMarksDrawingButton.hide'
      })
    })

    it('should have a metadata button', function () {
      expect(metadata).to.be.ok()
    })

    it('should have a disabled Collections button', function () {
      expect(addToCollections).to.be.ok()
      expect(addToCollections.disabled).to.be.true()
    })

    it('should have a disabled Favourites checkbox', function () {
      expect(favourite).to.be.ok()
      expect(favourite.disabled).to.be.true()
    })

    it('should not have a Hide Previous Marks checkbox', function () {
      expect(hidePreviousMarks).to.be.null()
    })
  })

  describe('with a drawing task', function () {
    let addToCollections, favourite, hidePreviousMarks, metadata

    before(function () {
      const workflow = WorkflowFactory.build({
        tasks: {
          T0: DrawingTaskFactory.build()
        }
      })
      const store = mockStore({ workflow })
      render(
        <MetaTools />,
        {
          wrapper: withStore(store)
        }
      )
      addToCollections = screen.getByRole('button', {
        name: 'MetaTools.CollectionsButton.add'
      })
      metadata = screen.getByRole('button', {
        name: 'MetaTools.MetadataButton.label'
      })
      favourite = screen.getByRole('checkbox', {
        name: 'Add to favorites'
      })
      hidePreviousMarks = screen.getByRole('checkbox', {
        name: 'FormView MetaTools.HidePreviousMarksDrawingButton.hide'
      })
    })

    it('should have a metadata button', function () {
      expect(metadata).to.be.ok()
    })

    it('should have a disabled Collections button', function () {
      expect(addToCollections).to.be.ok()
      expect(addToCollections.disabled).to.be.true()
    })

    it('should have a disabled Favourites checkbox', function () {
      expect(favourite).to.be.ok()
      expect(favourite.disabled).to.be.true()
    })

    it('should have an unchecked Hide Previous Marks checkbox', function () {
      expect(hidePreviousMarks).to.be.ok()
      expect(hidePreviousMarks.getAttribute('aria-checked')).to.equal('false')
    })
  })

  describe('with a logged-in user', function () {
    let addToCollections, favourite, hidePreviousMarks, metadata

    before(async function () {
      const store = mockStore()
      await when(() => store.userProjectPreferences.loadingState === asyncStates.success)
      const upp = UPPFactory.build()
      store.userProjectPreferences.setUPP(upp)
      store.userProjectPreferences.setHeaders({
        etag: 'mockETagForTests'
      })
      render(
        <MetaTools />,
        {
          wrapper: withStore(store)
        }
      )
      addToCollections = screen.getByRole('button', {
        name: 'MetaTools.CollectionsButton.add'
      })
      metadata = screen.getByRole('button', {
        name: 'MetaTools.MetadataButton.label'
      })
      favourite = screen.getByRole('checkbox', {
        name: 'Add to favorites'
      })
      hidePreviousMarks = screen.queryByRole('checkbox', {
        name: 'FormView MetaTools.HidePreviousMarksDrawingButton.hide'
      })
    })

    it('should have a metadata button', function () {
      expect(metadata).to.be.ok()
    })

    it('should have an enabled Collections button', function () {
      expect(addToCollections).to.be.ok()
      expect(addToCollections.disabled).to.be.false()
    })

    it('should have an enabled, unchecked Favourites checkbox', function () {
      expect(favourite).to.be.ok()
      expect(favourite.disabled).to.be.false()
      expect(favourite.getAttribute('aria-checked')).to.equal('false')
    })

    it('should not have a Hide Previous Marks checkbox', function () {
      expect(hidePreviousMarks).to.be.null()
    })
  })

  describe('with a logged-in user and a favourited subject', function () {
    let addToCollections, favourite, hidePreviousMarks, metadata

    before(async function () {
      const store = mockStore()
      await when(() => store.userProjectPreferences.loadingState === asyncStates.success)
      const upp = UPPFactory.build()
      store.userProjectPreferences.setUPP(upp)
      store.userProjectPreferences.setHeaders({
        etag: 'mockETagForTests'
      })
      store.subjects.active.toggleFavorite()
      render(
        <MetaTools />,
        {
          wrapper: withStore(store)
        }
      )
      addToCollections = screen.getByRole('button', {
        name: 'MetaTools.CollectionsButton.add'
      })
      metadata = screen.getByRole('button', {
        name: 'MetaTools.MetadataButton.label'
      })
      favourite = screen.getByRole('checkbox', {
        name: 'Added to favorites'
      })
      hidePreviousMarks = screen.queryByRole('checkbox', {
        name: 'FormView MetaTools.HidePreviousMarksDrawingButton.hide'
      })
    })

    it('should have a metadata button', function () {
      expect(metadata).to.be.ok()
    })

    it('should have an enabled Collections button', function () {
      expect(addToCollections).to.be.ok()
      expect(addToCollections.disabled).to.be.false()
    })

    it('should have an enabled, checked Favourites checkbox', function () {
      expect(favourite).to.be.ok()
      expect(favourite.disabled).to.be.false()
      expect(favourite.getAttribute('aria-checked')).to.equal('true')
    })

    it('should not have a Hide Previous Marks checkbox', function () {
      expect(hidePreviousMarks).to.be.null()
    })
  })
})
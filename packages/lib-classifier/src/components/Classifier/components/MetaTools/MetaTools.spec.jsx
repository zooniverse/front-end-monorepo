import { render, screen } from '@testing-library/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'

import { DrawingTaskFactory, UPPFactory, WorkflowFactory } from '@test/factories'
import mockStore from '@test/mockStore'
import MetaTools from './MetaTools'

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
        name: 'Add to collections'
      })
      metadata = screen.getByRole('button', {
        name: 'Subject Info'
      })
      favourite = screen.getByRole('checkbox', {
        name: 'Add to favorites'
      })
      hidePreviousMarks = screen.queryByRole('checkbox', {
        name: 'FormView Hide Previous Marks'
      })
    })

    it('should have a metadata button', function () {
      expect(metadata).to.exist
    })

    it('should have a disabled Collections button', function () {
      expect(addToCollections).to.exist
      expect(addToCollections.disabled).to.equal(true)
    })

    it('should have a disabled Favourites checkbox', function () {
      expect(favourite).to.exist
      expect(favourite.disabled).to.equal(true)
    })

    it('should not have a Hide Previous Marks checkbox', function () {
      expect(hidePreviousMarks).to.equal(null)
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
        name: 'Add to collections'
      })
      metadata = screen.getByRole('button', {
        name: 'Subject Info'
      })
      favourite = screen.getByRole('checkbox', {
        name: 'Add to favorites'
      })
      hidePreviousMarks = screen.getByRole('checkbox', {
        name: 'FormView Hide Previous Marks'
      })
    })

    it('should have a metadata button', function () {
      expect(metadata).to.exist
    })

    it('should have a disabled Collections button', function () {
      expect(addToCollections).to.exist
      expect(addToCollections.disabled).to.equal(true)
    })

    it('should have a disabled Favourites checkbox', function () {
      expect(favourite).to.exist
      expect(favourite.disabled).to.equal(true)
    })

    it('should have an unchecked Hide Previous Marks checkbox', function () {
      expect(hidePreviousMarks).to.exist
      expect(hidePreviousMarks.getAttribute('aria-checked')).to.equal('false')
    })
  })

  describe('with a logged-in user', function () {
    let addToCollections, favourite, hidePreviousMarks, metadata

    before(async function () {
      const store = mockStore()
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
        name: 'Add to collections'
      })
      metadata = screen.getByRole('button', {
        name: 'Subject Info'
      })
      favourite = screen.getByRole('checkbox', {
        name: 'Add to favorites'
      })
      hidePreviousMarks = screen.queryByRole('checkbox', {
        name: 'FormView Hide Previous Marks'
      })
    })

    it('should have a metadata button', function () {
      expect(metadata).to.exist
    })

    it('should have an enabled Collections button', function () {
      expect(addToCollections).to.exist
      expect(addToCollections.disabled).to.equal(false)
    })

    it('should have an enabled, unchecked Favourites checkbox', function () {
      expect(favourite).to.exist
      expect(favourite.disabled).to.equal(false)
      expect(favourite.getAttribute('aria-checked')).to.equal('false')
    })

    it('should not have a Hide Previous Marks checkbox', function () {
      expect(hidePreviousMarks).to.equal(null)
    })
  })

  describe('with a logged-in user and a favourited subject', function () {
    let addToCollections, favourite, hidePreviousMarks, metadata

    before(async function () {
      const store = mockStore()
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
        name: 'Add to collections'
      })
      metadata = screen.getByRole('button', {
        name: 'Subject Info'
      })
      favourite = screen.getByRole('checkbox', {
        name: 'Added to favorites'
      })
      hidePreviousMarks = screen.queryByRole('checkbox', {
        name: 'FormView Hide Previous Marks'
      })
    })

    it('should have a metadata button', function () {
      expect(metadata).to.exist
    })

    it('should have an enabled Collections button', function () {
      expect(addToCollections).to.exist
      expect(addToCollections.disabled).to.equal(false)
    })

    it('should have an enabled, checked Favourites checkbox', function () {
      expect(favourite).to.exist
      expect(favourite.disabled).to.equal(false)
      expect(favourite.getAttribute('aria-checked')).to.equal('true')
    })

    it('should not have a Hide Previous Marks checkbox', function () {
      expect(hidePreviousMarks).to.equal(null)
    })
  })
})

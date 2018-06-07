import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

function storeMapper (stores) {
  return {
    subject: stores.classifierStore.subjects.current,
  }
}

@inject(storeMapper)
@observer
class SingleImageViewer extends React.Component {
  getUrl () {
    const location = this.props.subject.locations[0]
    return Object.values(location)[0]
  }

  render () {
    return (
      <svg>
        <image
          xlinkHref={this.getUrl()}
        />
      </svg>
    )
  }
}

SingleImageViewer.propTypes = {
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(PropTypes.shape({}))
  })
}

export default SingleImageViewer

import { Button, Grid, Heading } from 'grommet'
import Error from 'next/error'
import { Component } from 'react'
import { inject, observer } from 'mobx-react'

function storeMapper(stores) {
  const { testError } = stores.store
  return {
    testError
  }
}

@inject(storeMapper)
@observer
class Logger extends Component {
  static async getInitialProps({ query = {}, res }) {
    const environment = query.env || process.env.NODE_ENV
    const isProduction = environment === 'production'
    let showErrorPage = false

    if (res && isProduction) {
      res.statusCode = 404
      showErrorPage = true
    }

    return { showErrorPage }
  }

  render() {
    const { showErrorPage, testError } = this.props
    if (showErrorPage) {
      return <Error statusCode={404} />
    } else {
      return (
        <Grid gap='medium' margin='medium'>
          <Heading>
            This page is for error testing!
          </Heading>
          <div>
            <p>
              You are in development mode (<code>NODE_ENV !== &#39;production&#39;</code>), so you are seeing this message. In production, this route will 404, so make sure you check the CloudFront config so it is picked up by PFE.
            </p>
            <Button label='Throw Error!' onClick={testError} />
          </div>
        </Grid>
      )
    }
  }
}

export default Logger
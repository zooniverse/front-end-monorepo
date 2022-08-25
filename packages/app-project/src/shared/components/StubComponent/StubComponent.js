import { Grid, Heading } from 'grommet'
import Error from 'next/error'
import { Component } from 'react'

class StubComponent extends Component {
  static async getInitialProps ({ res }) {
    const isProduction = process.env.NODE_ENV === 'production'
    let showErrorPage = false

    if (res && isProduction) {
      res.statusCode = 404
      showErrorPage = true
    }

    return { showErrorPage }
  }

  render () {
    const { showErrorPage } = this.props
    if (showErrorPage) {
      return <Error statusCode={404} />
    } else {
      return (
        <Grid gap='medium' margin='medium'>
          <Heading>
            This page isn&apos;t built yet!
          </Heading>
          <div>
            You&apos;re in development mode (<code>NODE_ENV !== production</code>), so you&apos;re seeing this message. In production, this route will 404, so make sure you check the CloudFront config so it&apos;s picked up by PFE.
          </div>
        </Grid>
      )
    }
  }
}

export default StubComponent

import Document, { Head, Main, NextScript } from 'next/document'
import React from 'react'
import { ServerStyleSheet } from 'styled-components'

import { logNodeError } from '../src/helpers/logger'

const GA_TRACKING_ID = 'GTM-WDW6V4'

const GA_TRACKING_SCRIPT = `
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GA_TRACKING_ID}');
`

const isProduction = process.env.NODE_ENV === 'production'

process.on('unhandledRejection', logNodeError)
process.on('uncaughtException', logNodeError)

export default class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: <>{initialProps.styles}{sheet.getStyleElement()}</>
      }
    } finally {
      sheet.seal()
    }
  }

  render () {
    return (
      <html>
        <Head>
          {isProduction && (
            <script dangerouslySetInnerHTML={{ __html: GA_TRACKING_SCRIPT }} />
          )}
        </Head>
        <body>
          {isProduction && (
            <noscript>
              <iframe
                height='0'
                src={`https://www.googletagmanager.com/ns.html?id=${GA_TRACKING_ID}`}
                style={{ display: 'none', visibility: 'hidden' }}
                width='0'
              />
            </noscript>
          )}
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

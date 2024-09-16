import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

import { logToSentry } from '@helpers/logger'

const GA_TRACKING_ID = 'GTM-WDW6V4'

const GA_TRACKING_SCRIPT = `
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GA_TRACKING_ID}');
`

const ERROR_LOGGING_SCRIPT = `
  function setUpLogging() {
    Sentry.init({
      dsn: '${process.env.SENTRY_PROJECT_DSN}',
      environment: '${process.env.APP_ENV}',
      release: '${process.env.COMMIT_ID}',
      integrations: [new Sentry.BrowserTracing()],
      tracesSampleRate: 1.0
    });
    console.log('Sentry init: ${process.env.SENTRY_PROJECT_DSN} ${process.env.APP_ENV}');
  }

  function onError(e) {
    const error = new Error('External script failed to load');
    Sentry.withScope((scope) => {
      scope.setTag('ScriptError', 'loadFailed');
      scope.setExtra('scriptSrc', e.srcElement.src);
      Sentry.captureException(error);
    });
    console.log('errored', e.srcElement.src);
  };

  const scripts = document.querySelectorAll('script');
  scripts.forEach(scriptNode => {
    scriptNode.onload = e => console.log('loaded', e.srcElement.src);
    scriptNode.onerror = onError;
  });
  const sentryScript = document.querySelector('#sentryScript');
  sentryScript.onload = setUpLogging;
`
const isProduction = process.env.NODE_ENV === 'production'

process.on('unhandledRejection', logToSentry)
process.on('uncaughtException', logToSentry)

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
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
        styles: [initialProps.styles, sheet.getStyleElement()]
      }
    } catch (error) {
      logToSentry(error)
      return {
        html: error.message
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head>
          {isProduction && (
            <script dangerouslySetInnerHTML={{ __html: GA_TRACKING_SCRIPT }} />
          )}
          {/* https://docs.sentry.io/platforms/javascript/install/loader/#default-bundle */}
          <script
            src="https://browser.sentry-cdn.com/7.109.0/bundle.tracing.min.js"
            integrity="sha384-FyHLiOgn1wcBUetfKq3+RF+aukePV5acbpdkgdYJRWepBQ8AMoNNEucU/6+JYRuJ"
            crossOrigin='anonymous'
            defer
            id='sentryScript'
          ></script>
        </Head>
        <body>
          {isProduction && (
            <noscript>
              <iframe
                title='Google Tag Manager'
                height='0'
                src={`https://www.googletagmanager.com/ns.html?id=${GA_TRACKING_ID}`}
                style={{ display: 'none', visibility: 'hidden' }}
                width='0'
              />
            </noscript>
          )}
          <Main />
          <NextScript />
          <script dangerouslySetInnerHTML={{ __html: ERROR_LOGGING_SCRIPT }} />
        </body>
      </Html>
    )
  }
}

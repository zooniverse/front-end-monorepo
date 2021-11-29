import counterpart from 'counterpart'
import NextHead from 'next/head'
import { string } from 'prop-types'

import en from './locales/en'

counterpart.registerTranslations('en', en)

function Head (props) {
  const {
    description,
    ogImage,
    pageTitle,
    projectTwitterUsername,
    siteName,
    title,
    url,
    zooniverseTwitterUsername
  } = props

  const fullTitle = pageTitle ?
    `${pageTitle} | ${title} | ${siteName}` :
    `${title} | ${siteName}`
  return (
    <NextHead>
      <meta charSet='UTF-8' />

      <title>
        {fullTitle}
      </title>

      <meta name='description' content={description} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />

      <link rel='icon' sizes='192x192' href='/touch-icon.png' />
      <link rel='apple-touch-icon' href='/touch-icon.png' />
      <link rel='mask-icon' href='/favicon-mask.svg' color='#49B882' />
      <link rel='icon' href='/favicon.ico' />

      <meta property='og:url' content={url} />
      <meta property='og:title' content={fullTitle} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={ogImage} />

      {(projectTwitterUsername) && (
        <meta name='twitter:creator' content={projectTwitterUsername} />
      )}
      <meta name='twitter:site' content={zooniverseTwitterUsername} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:image' content={ogImage} />

      <meta name='zooniverse:deployed_commit' content={process.env.COMMIT_ID} />
    </NextHead>
  )
}

Head.propTypes = {
  description: string,
  ogImage: string,
  projectTwitterUsername: string,
  siteName: string,
  title: string,
  url: string
}

Head.defaultProps = {
  description: counterpart('Head.defaultDescription'),
  siteName: counterpart('Head.siteName'),
  title: counterpart('Head.defaultTitle'),
  zooniverseTwitterUsername: '@the_zooniverse'
}

export default Head

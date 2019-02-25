import counterpart from 'counterpart'
import NextHead from 'next/head'
import { string } from 'prop-types'
import React from 'react'

import en from './locales/en'

counterpart.registerTranslations('en', en)

function Head (props) {
  const {
    description,
    ogImage,
    projectTwitterUsername,
    siteName,
    title,
    url,
    zooniverseTwitterUsername
  } = props

  return (
    <NextHead>
      <meta charSet='UTF-8' />

      <title>
        {title} | {siteName}
      </title>

      <meta name='description' content={description} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />

      <link rel='icon' sizes='192x192' href='/static/touch-icon.png' />
      <link rel='apple-touch-icon' href='/static/touch-icon.png' />
      <link rel='mask-icon' href='/static/favicon-mask.svg' color='#49B882' />
      <link rel='icon' href='/static/favicon.ico' />

      <meta property='og:url' content={url} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={ogImage} />

      {(projectTwitterUsername) && (
        <meta name='twitter:creator' content={projectTwitterUsername} />
      )}
      <meta name='twitter:site' content={zooniverseTwitterUsername} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:image' content={ogImage} />
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

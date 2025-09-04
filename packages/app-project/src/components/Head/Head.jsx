import NextHead from 'next/head'
import { string } from 'prop-types'
import { useTranslation } from 'next-i18next'

function Head (props) {
  const { t } = useTranslation('components')
  const {
    description = t('Head.defaultDescription'),
    ogImage,
    pageTitle,
    projectTwitterUsername,
    siteName = t('Head.siteName'),
    title = t('Head.defaultTitle'),
    url,
    zooniverseTwitterUsername = '@the_zooniverse'
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

      <link rel='icon' sizes='any' href='/projects/assets/icon.svg' />
      <link rel='apple-touch-icon' href='/projects/assets/apple-icon.png' />
      <link rel='icon' href='/projects/assets/favicon.ico' />
      {/*
        preload the classifier's subject placeholder
      */}
      <link rel='preload' as='image' href='https://static.zooniverse.org/www.zooniverse.org/assets/fe-project-subject-placeholder-800x600.png' fetchpriority='high' />

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
      <meta name='zooniverse:deployed_ref' content={process.env.GITHUB_REF_NAME} />
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

export default Head

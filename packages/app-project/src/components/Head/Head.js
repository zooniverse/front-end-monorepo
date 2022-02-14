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

export default Head

import NextHead from 'next/head'
import { string } from 'prop-types'
import { useTranslation } from 'next-i18next'

function Head (props) {
  const { t } = useTranslation('components')
  const {
    description = t('Head.defaultDescription'),
    siteName = t('Head.siteName'),
    title = t('Head.defaultTitle'),
    url,
    zooniverseTwitterUsername = '@the_zooniverse'
  } = props

  return (
    <NextHead>
      <meta charSet='UTF-8' />

      <title>
        {title} | {siteName}
      </title>

      <meta name='description' content={description} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />

      <link rel='icon' sizes='192x192' href='/touch-icon.png' />
      <link rel='apple-touch-icon' href='/touch-icon.png' />
      <link rel='mask-icon' href='/favicon-mask.svg' color='#49B882' />
      <link rel='icon' href='/favicon.ico' />

      <meta property='og:url' content={url} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />

      <meta name='twitter:site' content={zooniverseTwitterUsername} />
      <meta name='twitter:card' content='summary' />

      <meta name='zooniverse:deployed_commit' content={process.env.COMMIT_ID} />
    </NextHead>
  )
}

Head.propTypes = {
  description: string,
  siteName: string,
  title: string,
  url: string
}

export default Head

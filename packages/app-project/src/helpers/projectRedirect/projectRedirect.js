// the default API is staging for local development, production otherwise.
const defaultEnv = process.env.APP_ENV === 'development' ? 'staging' : 'production'

export default function projectRedirect({
  defaultLocale,
  locale,
  params,
  project,
  toHomePage = false
}) {
  if (!project?.redirect) return null

  if (!toHomePage) {
    return {
      redirect: {
        destination: project.redirect,
        permanent: false
      }
    }
  }

  const { panoptesEnv } = params
  const pathname = locale === defaultLocale ? `/${project.slug}` : `/${locale}/${project.slug}`
  const search = panoptesEnv === defaultEnv ? '' : `?env=${panoptesEnv}`

  return {
    redirect: {
      destination: `${pathname}${search}`,
      permanent: false
    }
  }
}

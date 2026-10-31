import getStaticPageProps from '@helpers/getStaticPageProps'

const environment = process.env.APP_ENV

const HOSTS = {
  production: 'https://www.zooniverse.org',
  staging: 'https://frontend.preview.zooniverse.org'
}

export default async function getDefaultPageProps({ locale, params }) {
  const { notFound, props: staticProps } = await getStaticPageProps({ locale, params })
  const {
    initialState,
    title,
    workflowID,
    workflows,
    subject
  } = staticProps
  const host = HOSTS[environment] || 'https://localhost:3000'

  const props = {
    host,
    initialState,
    workflows
  }

  if (title) {
    props.title = title
  }

  if (workflowID) {
    props.workflowID = workflowID
  }

  if (subject) {
    props.subject = subject
  }

  return { notFound, props }
}

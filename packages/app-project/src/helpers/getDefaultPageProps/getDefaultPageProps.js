import getStaticPageProps from '@helpers/getStaticPageProps'

const environment = process.env.APP_ENV

const HOSTS = {
  production: 'https://www.zooniverse.org',
  staging: 'https://frontend.preview.zooniverse.org'
}

export default async function getDefaultPageProps({ locale, params }) {
  const { props: staticProps } = await getStaticPageProps({ locale, params })
  const {
    project,
    notFound,
    title,
    workflowID,
    workflows,
    organization,
    subject
  } = staticProps
  const host = HOSTS[environment] || 'https://localhost:3000'
  /*
    snapshot for store hydration in the browser
  */
  const initialState = {
    project
  }

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

  if (organization) {
    props.initialState.organization = organization
  }

  if (subject) {
    props.subject = subject
  }

  return { notFound, props }
}

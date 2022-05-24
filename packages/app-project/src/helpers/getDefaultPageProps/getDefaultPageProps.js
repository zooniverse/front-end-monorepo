import getStaticPageProps from '@helpers/getStaticPageProps'

const environment = process.env.APP_ENV

const HOSTS = {
  production: 'https://www.zooniverse.org',
  staging: 'https://frontend.preview.zooniverse.org'
}

export default async function getDefaultPageProps({ locale, params, query }) {
  const { props: staticProps } = await getStaticPageProps({ locale, params, query })
  const { project, notFound, title, workflowID, workflows } = staticProps
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
    query,
    workflows
  }

  if (title) {
    props.title = title
  }

  if (workflowID) {
    props.workflowID = workflowID
  }

  return { notFound, props }
}

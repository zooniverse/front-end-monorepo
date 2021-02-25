import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ProjectAboutPage'
import initStore from '@stores'


export async function getServerSideProps({ params, query, req, res }) {
  const { props } = await getDefaultPageProps({ params, query, req, res })
  const { project } = props.initialState

  const isServer = true
  const store = initStore(isServer)

  const teamArray = await store.projectRoles.fetch(project.id)

  return {
    props: {
      pageType: 'team',
      project,
      teamArray
    }
  }
}

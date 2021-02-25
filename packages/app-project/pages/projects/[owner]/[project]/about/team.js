import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ProjectAboutPage'
import initStore from '@stores'


export async function getServerSideProps({ params, query, req, res }) {
  const { props } = await getDefaultPageProps({ params, query, req, res })
  const { project } = props.initialState

  const isServer = true
  const store = initStore(isServer)

  const rolesArray = await store.projectRoles.fetch(project.id)

  return {
    props: {
      project,
      pageType: 'team',
      rolesArray
    }
  }
}

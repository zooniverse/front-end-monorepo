import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ProjectHomePage'

export async function getServerSideProps({ params, query, req, res }) {
  const { notFound, props } = await getDefaultPageProps({ params, query, req, res })
  return ({ notFound, props })
}


import getDefaultPageProps from "@helpers/getDefaultPageProps"
export { default } from "@screens/ProjectAboutPage"

export async function getServerSideProps({ params, query, req, res }) {
  const { props } = await getDefaultPageProps({ params, query, req, res })

  return {
    props: {
      ...props,
      pageType: "results"
    }
  }
}

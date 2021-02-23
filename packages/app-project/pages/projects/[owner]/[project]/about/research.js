import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ProjectAboutPage'
import initStore from '@stores'
import { getSnapshot } from 'mobx-state-tree'

export async function getServerSideProps({ params, query, req, res }) {
  const { props } = await getDefaultPageProps({ params, query, req, res })

  return {
    props: {
      ...props,
      pageType: 'science_case'
    }
  }
}

// export async function getStaticPaths() {
//   return {
//     paths: [
//       { params: { owner: 'brooke', project: 'i-fancy-cats' } },
//       { params: { owner: 'goplayoutside3', project: 'test-bike-lane-uprising' } }
//     ],
//     fallback: true,
//   }
// }

// export async function getStaticProps({ params }) {
//   const store = initStore(false)

//   if (params.owner && params.project) {
//     const { owner, project } = params
//     const projectSlug = `${owner}/${project}`
//     await store.project.fetch(projectSlug)
//     if (!store.project.id) {
//       return notFoundError(`Project ${owner}/${project} was not found`)
//     }
//   }

//   const { project } = getSnapshot(store)
//   const aboutPages = project.about_pages

//   return {
//     props: {
//       aboutPages,
//       pageType: 'science_case',
//     },
//   }
// }


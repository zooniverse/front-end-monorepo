import { observer, MobXProviderContext } from 'mobx-react'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import Introduction from './Introduction'
import PFE_SLUGS from '../../../../../../helpers/slugList'

function useStores() {
  const { store } = useContext(MobXProviderContext)
  const { project } = store
  return {
    description: project.description,
    title: project['display_name']
  }
}

function IntroductionContainer() {
  const { description, title } = useStores()
  const router = useRouter()

  function getLinkProps() {
    const { owner, project } = router?.query || {}
    const isPFEProject = PFE_SLUGS.includes(`${owner}/${project}`)

    return {
      href: isPFEProject
        ? `https://www.zooniverse.org/projects/${owner}/${project}/about/research`
        : `/${owner}/${project}/about/research`,
      externalLink: isPFEProject
    }
  }
  const linkProps = getLinkProps()

  return <Introduction description={description} linkProps={linkProps} title={title} />
}

export default observer(IntroductionContainer)

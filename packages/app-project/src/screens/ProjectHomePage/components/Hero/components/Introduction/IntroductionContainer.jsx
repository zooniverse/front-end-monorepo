import { observer, MobXProviderContext } from 'mobx-react'
import { useRouter } from 'next/router'
import { useContext } from 'react'

import Introduction from './Introduction'

function useStores () {
  const { store } = useContext(MobXProviderContext)
  const { project } = store
  return {
    description: project.description,
    title: project['display_name']
  }
}

function IntroductionContainer () {
  const { description, title } = useStores()
  const router = useRouter()

  function getLinkProps () {
    const { owner, project } = router?.query || {}
    return {
      href: `/${owner}/${project}/about/research`
    }
  }
  const linkProps = getLinkProps()

  return (
    <Introduction
      description={description}
      linkProps={linkProps}
      title={title}
    />
  )
}

export default observer(IntroductionContainer)

import { MobXProviderContext, observer } from 'mobx-react'
import { useRouter } from 'next/router'

import FinishedForTheDay from './FinishedForTheDay'
import addQueryParams from '@helpers/addQueryParams'
import { useContext } from 'react'

function useStore () {
  const { store } = useContext(MobXProviderContext)
  const { project } = store

  return {
    imageSrc: project.background.src,
    projectName: project['display_name']
  }
}

const FinishedForTheDayContainer = () => {
  const { imageSrc = '', projectName = '' } = useStore()
  const router = useRouter()
  const owner = router?.query?.owner
  const project = router?.query?.project

  const linkHref = addQueryParams(`/projects/${owner}/${project}/stats`)

  return (
    <FinishedForTheDay
      imageSrc={imageSrc}
      linkHref={linkHref}
      projectName={projectName}
    />
  )
}

export default observer(FinishedForTheDayContainer)

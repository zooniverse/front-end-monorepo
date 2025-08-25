import { useContext } from 'react'
import { MobXProviderContext, observer } from 'mobx-react'
import { number } from 'prop-types'
import CompletionBar from './CompletionBar'

function useStore () {
  const { store } = useContext(MobXProviderContext)

  return {
    completeness: store?.project?.completeness
  }
}

const CompletionBarContainer = () => {
  const { completeness } = useStore()

  return (
    <CompletionBar className="test-completion-bar" completeness={completeness} />
  )
}

CompletionBarContainer.propTypes = {
  completeness: number.isRequired
}

export default observer(CompletionBarContainer)

import asyncStates from '@zooniverse/async-states'
import { MobXProviderContext, observer } from 'mobx-react'
import { bool } from 'prop-types'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'

import RecentSubjects from './RecentSubjects'
import RecentSubjectsCarousel from './RecentSubjectsCarousel'
import MessageBox from './components/MessageBox'
import fetchRecentSubjects from './helpers/fetchRecentSubjects'

function useStoreContext(stores) {
  const { store } = stores || useContext(MobXProviderContext)
  const { id: projectId, slug } = store?.project

  return {
    projectId,
    slug
  }
}

function RecentSubjectsContainer({ carousel, stores }) {
  const { t } = useTranslation('screens')
  const { projectId, slug } = useStoreContext(stores)
  const [loading, setLoading] = useState(asyncStates.initialized)
  const [subjects, setSubjects] = useState([])

  async function onMount() {
    setLoading(asyncStates.loading)
    try {
      const fetchedSubjects = await fetchRecentSubjects(projectId)
      if (fetchedSubjects) {
        setLoading(asyncStates.success)
        setSubjects(fetchedSubjects)
      }
    } catch (error) {
      console.error(error)
      setLoading(asyncStates.error)
    }
  }

  useEffect(() => {
    onMount()
  }, [])

  const href = `/projects/${slug}/talk`
  const ThumbnailComponent = carousel ? RecentSubjectsCarousel : RecentSubjects

  return (
    <>
      {loading === asyncStates.error && (
        <MessageBox children={t('Home.ZooniverseTalk.RecentSubjects.error')} />
      )}
      {loading === asyncStates.success && subjects.length < 1 ? (
        <MessageBox
          children={t('Home.ZooniverseTalk.RecentSubjects.noSubjects')}
        />
      ) : (
        <ThumbnailComponent href={href} subjects={subjects} />
      )}
    </>
  )
}

RecentSubjectsContainer.propTypes = {
  carousel: bool
}

RecentSubjectsContainer.defaultProps = {
  carousel: false
}

export default observer(RecentSubjectsContainer)
export { RecentSubjectsContainer }

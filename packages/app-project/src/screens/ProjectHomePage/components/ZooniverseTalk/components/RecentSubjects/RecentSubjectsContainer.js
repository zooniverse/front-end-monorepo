import asyncStates from '@zooniverse/async-states'
import { MobXProviderContext, observer } from 'mobx-react'
import { bool } from 'prop-types'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'

import RecentSubjects from './RecentSubjects'
import RecentSubjectsCarousel from './RecentSubjectsCarousel'
import MessageBox from './components/MessageBox'
import fetchRecentSubjects from './helpers/fetchRecentSubjects'

function useStores(store) {
  const stores = useContext(MobXProviderContext)
  store = store || stores.store
  const { id: projectId, slug } = store?.project

  return {
    projectId,
    slug
  }
}

function RecentSubjectsContainer({ carousel = false, stores }) {
  const { t } = useTranslation('screens')
  const { projectId, slug } = useStores(stores)
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
        <MessageBox>{t('Home.ZooniverseTalk.RecentSubjects.error')}</MessageBox>
      )}
      {loading === asyncStates.success && subjects.length < 1 ? (
        <MessageBox>
          {t('Home.ZooniverseTalk.RecentSubjects.noSubjects')}
        </MessageBox>
      ) : (
        <ThumbnailComponent href={href} subjects={subjects} />
      )}
    </>
  )
}

RecentSubjectsContainer.propTypes = {
  carousel: bool
}

export default observer(RecentSubjectsContainer)
export { RecentSubjectsContainer }

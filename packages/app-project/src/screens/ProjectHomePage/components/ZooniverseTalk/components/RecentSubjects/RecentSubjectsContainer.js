import asyncStates from '@zooniverse/async-states'
import { MobXProviderContext, observer } from 'mobx-react'
import { bool } from 'prop-types'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'

import RecentSubjects from './RecentSubjects'
import RecentSubjectsCarousel from './RecentSubjectsCarousel'
import MessageBox from './components/MessageBox'
import fetchRecentSubjects from './helpers/fetchRecentSubjects'

function useStores(mockStore) {
  const stores = useContext(MobXProviderContext)
  const store = mockStore || stores.store
  const { id: projectId, slug } = store?.project

  return {
    projectId,
    slug
  }
}

function RecentSubjectsContainer({ carousel = false, mockStore }) {
  const { t } = useTranslation('screens')
  const { projectId, slug } = useStores(mockStore)
  const [loading, setLoading] = useState(asyncStates.initialized)
  const [subjects, setSubjects] = useState([])

  useEffect(() => {
    async function fetchProjectTalkSubjects() {
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
    fetchProjectTalkSubjects()
  }, [projectId])

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

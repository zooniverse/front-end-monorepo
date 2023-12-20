import { MobXProviderContext, observer } from 'mobx-react'
import { bool } from 'prop-types'
import { useContext } from 'react'
import useSWR from 'swr'
import { useTranslation } from 'next-i18next'

import RecentSubjects from './RecentSubjects'
import RecentSubjectsCarousel from './RecentSubjectsCarousel'
import MessageBox from './components/MessageBox'
import fetchRecentSubjects from './helpers/fetchRecentSubjects'

const SWROptions = {
  revalidateIfStale: true,
  revalidateOnMount: true,
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  refreshInterval: 0
}

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
  const cacheKey = {
    name: 'project-talk-recent-subjects',
    projectId
  }
  const { data: subjects, error, isLoading } = useSWR(cacheKey, fetchRecentSubjects, SWROptions)
  const href = `/projects/${slug}/talk`
  const ThumbnailComponent = carousel ? RecentSubjectsCarousel : RecentSubjects

  return (
    <>
      {error && (
        <MessageBox>{t('Home.ZooniverseTalk.RecentSubjects.error')}</MessageBox>
      )}
      {!isLoading && subjects?.length < 1 ? (
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

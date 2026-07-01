import { MobXProviderContext, observer } from 'mobx-react'
import { bool, string } from 'prop-types'
import { useContext } from 'react'
import useSWR from 'swr'
import { useTranslation } from 'next-i18next'

import RecentSubjects from './RecentSubjects'
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
  const { id: userId, login } = store?.user

  return {
    login,
    projectId,
    projectSlug: slug,
    userId
  }
}

function RecentSubjectsContainer({ mockStore }) {
  const { t } = useTranslation('screens')
  const { login, projectId, projectSlug, userId } = useStores(mockStore)
  const cacheKey = {
    name: 'project-talk-recent-subjects',
    projectId
  }
  const { data: subjects, error, isLoading } = useSWR(cacheKey, fetchRecentSubjects, SWROptions)

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
        <RecentSubjects
          login={login}
          projectId={projectId}
          projectSlug={projectSlug}
          subjects={subjects}
          userId={userId}
        />
      )}
    </>
  )
}

RecentSubjectsContainer.propTypes = {
  size: string,
  mockStore: bool
}

export default observer(RecentSubjectsContainer)
export { RecentSubjectsContainer }

import UserStatsContextProvider from '../../../../components/UserStatsContextProvider'

export default function UserStatsLayout({ children }) {
  return (
    <UserStatsContextProvider>
      {children}
    </UserStatsContextProvider>
  )
}

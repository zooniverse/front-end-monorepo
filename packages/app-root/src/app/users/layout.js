import UserLayout from '@/components/UserLayout'

export default function Layout ({ children }) {
  return (
      <UserLayout>
        {children}
      </UserLayout>
    )
}

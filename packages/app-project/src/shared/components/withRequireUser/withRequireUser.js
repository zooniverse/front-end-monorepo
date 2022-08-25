import { Box, Stack } from 'grommet'
import { observer, MobXProviderContext } from 'mobx-react'
import { useContext } from 'react'
import { useTranslation } from 'next-i18next'

// function useStoreContext(stores) {
//   const { store } = stores || useContext(MobXProviderContext)
//   const {
//     user: { isLoggedIn }
//   } = store
//   return {
//     isLoggedIn
//   }
// }

function useStores(store) {
  const stores = useContext(MobXProviderContext)
  store = store || stores.store
  const {
    user: { isLoggedIn }
  } = store
  return {
    isLoggedIn
  }
}

export default function withRequireUser(WrappedComponent) {
  function ComponentConnector({ stores, ...props }) {
    const { t } = useTranslation('components')
    const { isLoggedIn } = useStores(stores)

    return (
      <Stack>
        <WrappedComponent {...props} />
        {!isLoggedIn && (
          <Box
            align='center'
            background='rgba(255,255,255,0.7)'
            fill
            justify='center'
          >
            <Box background='white' elevation='small' pad='medium'>
              {t('RequireUser.text')}
            </Box>
          </Box>
        )}
      </Stack>
    )
  }

  return observer(ComponentConnector)
}

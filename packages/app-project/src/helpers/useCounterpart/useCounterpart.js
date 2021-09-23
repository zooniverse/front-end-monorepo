import counterpart from 'counterpart'
import { useState } from 'react'

const useCounterpart = () => {
  const [currentLocale, setCurrentLocale] = useState(null)
  counterpart.onLocaleChange((newLocale, oldLocale) => {
    // this is like useEffect and called when counterpart has a new locale
    setCurrentLocale(newLocale)
  }, [])
  return currentLocale
}

export default useCounterpart

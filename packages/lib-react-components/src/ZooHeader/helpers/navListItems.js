import counterpart from 'counterpart'
import en from '../locales/en'
import getHost from './getHost'

counterpart.registerTranslations('en', en)

const host = getHost()

export const adminNavLinkLabel = 'Admin'

export const adminNavLinkURL = `${host}/admin`

export const mainHeaderNavListURLs = [
  `${host}/projects`,
  `${host}/about`,
  `${host}/get-involved`,
  `${host}/talk`,
  `${host}/lab`
]

export const mainHeaderNavListLabels = [
  counterpart('ZooHeader.mainHeaderNavListLabels.projects'),
  counterpart('ZooHeader.mainHeaderNavListLabels.about'),
  counterpart('ZooHeader.mainHeaderNavListLabels.getInvolved'),
  counterpart('ZooHeader.mainHeaderNavListLabels.talk'),
  counterpart('ZooHeader.mainHeaderNavListLabels.build')
]

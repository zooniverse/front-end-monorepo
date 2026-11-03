/*
  We must define static pathways here like @zooniverse/content/translations/en.json
  instead of dynamic like @zooniverse/content/translations/${locale}.json, otherwise
  webpack can't find the json file.
*/

/* lib-content */
const libContentDictionaries = {
  ar: () =>
    import('@zooniverse/content/translations/ar.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  bn: () =>
    import('@zooniverse/content/translations/bn.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  cs: () =>
    import('@zooniverse/content/translations/cs.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  da: () =>
    import('@zooniverse/content/translations/da.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  de: () =>
    import('@zooniverse/content/translations/de.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  el: () =>
    import('@zooniverse/content/translations/el.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  en: () =>
    import('@zooniverse/content/translations/en.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  es: () =>
    import('@zooniverse/content/translations/es.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  fi: () =>
    import('@zooniverse/content/translations/fi.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  fr: () =>
    import('@zooniverse/content/translations/fr.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  ha: () =>
    import('@zooniverse/content/translations/ha.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  he: () =>
    import('@zooniverse/content/translations/he.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  hi: () =>
    import('@zooniverse/content/translations/hi.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  hr: () =>
    import('@zooniverse/content/translations/hr.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  hu: () =>
    import('@zooniverse/content/translations/hu.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  hy: () =>
    import('@zooniverse/content/translations/hy.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  id: () =>
    import('@zooniverse/content/translations/id.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  it: () =>
    import('@zooniverse/content/translations/it.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  ja: () =>
    import('@zooniverse/content/translations/ja.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  kn: () =>
    import('@zooniverse/content/translations/kn.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  ko: () =>
    import('@zooniverse/content/translations/ko.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  mr: () =>
    import('@zooniverse/content/translations/mr.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  nl: () =>
    import('@zooniverse/content/translations/nl.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  pl: () =>
    import('@zooniverse/content/translations/pl.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  pt: () =>
    import('@zooniverse/content/translations/pt.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  ru: () =>
    import('@zooniverse/content/translations/ru.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  sw: () =>
    import('@zooniverse/content/translations/sw.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  sv: () =>
    import('@zooniverse/content/translations/sv.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  te: () =>
    import('@zooniverse/content/translations/te.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  test: () =>
    import('@zooniverse/content/translations/test.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  tr: () =>
    import('@zooniverse/content/translations/tr.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  uk: () =>
    import('@zooniverse/content/translations/uk.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  ur: () =>
    import('@zooniverse/content/translations/ur.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  ve: () =>
    import('@zooniverse/content/translations/ve.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  vi: () =>
    import('@zooniverse/content/translations/vi.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  zhCN: () =>
    import('@zooniverse/content/translations/zh-CN.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  zhTW: () =>
    import('@zooniverse/content/translations/zh-TW.json', { with: { type: 'json' } }).then(
      module => module.default
    )
}

/* lib-user */
const libUserDictionaries = {
  ar: () =>
    import('@zooniverse/user/translations/ar.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  bn: () =>
    import('@zooniverse/user/translations/bn.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  cs: () =>
    import('@zooniverse/user/translations/cs.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  da: () =>
    import('@zooniverse/user/translations/da.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  de: () =>
    import('@zooniverse/user/translations/de.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  el: () =>
    import('@zooniverse/user/translations/el.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  en: () =>
    import('@zooniverse/user/translations/en.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  es: () =>
    import('@zooniverse/user/translations/es.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  fi: () =>
    import('@zooniverse/user/translations/fi.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  fr: () =>
    import('@zooniverse/user/translations/fr.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  ha: () =>
    import('@zooniverse/user/translations/ha.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  he: () =>
    import('@zooniverse/user/translations/he.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  hi: () =>
    import('@zooniverse/user/translations/hi.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  hr: () =>
    import('@zooniverse/user/translations/hr.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  hu: () =>
    import('@zooniverse/user/translations/hu.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  hy: () =>
    import('@zooniverse/user/translations/hy.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  id: () =>
    import('@zooniverse/user/translations/id.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  it: () =>
    import('@zooniverse/user/translations/it.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  ja: () =>
    import('@zooniverse/user/translations/ja.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  kn: () =>
    import('@zooniverse/user/translations/kn.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  ko: () =>
    import('@zooniverse/user/translations/ko.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  mr: () =>
    import('@zooniverse/user/translations/mr.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  nl: () =>
    import('@zooniverse/user/translations/nl.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  pl: () =>
    import('@zooniverse/user/translations/pl.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  pt: () =>
    import('@zooniverse/user/translations/pt.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  ru: () =>
    import('@zooniverse/user/translations/ru.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  sw: () =>
    import('@zooniverse/user/translations/sw.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  sv: () =>
    import('@zooniverse/user/translations/sv.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  te: () =>
    import('@zooniverse/user/translations/te.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  test: () =>
    import('@zooniverse/user/translations/test.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  tr: () =>
    import('@zooniverse/user/translations/tr.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  uk: () =>
    import('@zooniverse/user/translations/uk.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  ur: () =>
    import('@zooniverse/user/translations/ur.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  ve: () =>
    import('@zooniverse/user/translations/ve.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  vi: () =>
    import('@zooniverse/user/translations/vi.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  zhCN: () =>
    import('@zooniverse/user/translations/zh-CN.json', { with: { type: 'json' } }).then(
      module => module.default
    ),
  zhTW: () =>
    import('@zooniverse/user/translations/zh-TW.json', { with: { type: 'json' } }).then(
      module => module.default
    )
}

// Dynamically imports the JSON files only when called during build time
export const getDictionary = async locale => {
  // remove '-' from locale when fetching from the Maps
  const sanitizedLocale = locale === 'zh-CN' ? 'zhCN' : locale === 'zh-TW' ? 'zhTW' : locale
  const libContentDictionary = await libContentDictionaries[sanitizedLocale]()
  const libUserDictionary = await libUserDictionaries[sanitizedLocale]()
  return {...libContentDictionary, ...libUserDictionary}
}

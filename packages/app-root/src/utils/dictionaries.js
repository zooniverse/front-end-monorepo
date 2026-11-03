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

// Dynamically imports the JSON files only when called during build time
export const getDictionary = async locale => {
  // remove '-' from locale when fetching from the Maps
  const sanitizedLocale = locale === 'zh-CN' ? 'zhCN' : locale === 'zh-TW' ? 'zhTW' : locale
  const dictionary = await libContentDictionaries[sanitizedLocale]()
  return dictionary
}

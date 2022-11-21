# react-i18next for Translations

The `/translations` folder contains json dictionary files for translatable strings in lib-react-components. `react-i18next` is an internationalization framework for React.


## Adding New Dictionary Keys

[en.json](en.json) is the primary dictionary for translated strings in this component library. It is the only dictionary that should be edited manually in a local dev environment. Nested objects in this file are organized and named in the same manner as each component in `/src`. An example of how to translate a component can be found below.


## Translating a Component

Import `useTranslation()` hook and config. Use `.` to indicate nested object keys.

```js
import { useTranslation } from '../translations/i18n'

const MyComponent = () => {
  const { t } = useTranslation()

  return (
    <p>{t('Path.To.Translation.Key')}</p>
  )
}
```

(More details to be added here about grabbing current locale and switching languages)


## Adding a Language

FEM is integrated with [Lokalise](https://app.lokalise.com) for translations management. Any dictionary other than [en.json](en.json) should be managed through the Lokalise Dashboard. Instructions on how to import and export dictionary files can be found in the how-to-zooniverse [Translations](https://github.com/zooniverse/how-to-zooniverse/tree/master/Translations) folder.

New languages must be added into the `supportedLngs` array in [i18n.js](i18n.js).

```js
const supportedLngs = ['en', 'fr']
```

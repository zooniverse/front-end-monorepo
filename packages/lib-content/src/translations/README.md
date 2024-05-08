# react-i18next for Translations

The `/translations` folder contains json dictionary files for translatable strings in lib-content. There's an i18n instance for each library in FEM.


## Adding New Dictionary Keys

`en.json` contains the primary dictionary for translated strings in this app. Dictionaries in this folder are the only ones that should be edited manually in a local dev environment. An example of how to translate a component can be found below.


## Translating a Component

Import `useTranslation()` hook. Use `.` to indicate nested object keys. Alternatively, [react-i18next docs](https://react.i18next.com/latest/withtranslation-hoc) show how to translate a class component.

```js
import { useTranslation } from 'react-i18next'
const MyComponent = () => {
  const { t } = useTranslation()
  return (
    <p>{t('Path.To.Translation.Key')}</p>
  )
}
```


## Adding a Language

FEM is integrated with [Lokalise](https://app.lokalise.com) for translations management. Any dictionary other than `en.json` should be managed through the Lokalise Dashboard. Instructions on how to import and export dictionary files can be found in the how-to-zooniverse [Translations](https://github.com/zooniverse/how-to-zooniverse/tree/master/Translations) folder.

New languages must be added into the `supportedLngs` array in i18n.js.

```js
const supportedLngs = ['en', 'fr']
```

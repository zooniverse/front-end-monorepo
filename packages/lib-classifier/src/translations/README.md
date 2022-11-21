# react-i18next for Translations

The `/translations` folder contains json dictionary files for translatable strings in lib-classifier. `react-i18next` is an internationalization framework for React.


## Adding New Dictionary Keys

`/en` contains the primary dictionaries for translated strings in this app. Dictionaries in this folder are the only ones that should be edited manually in a local dev environment. An example of how to translate a component can be found below.

`/en/components.json` contains translations for and is organized in the same manner as each component in `/src/components/Classifier/components`. 

`/en/plugins` contains translations for `/src/plugins`.


## Translating a Component

Import `useTranslation()` hook. Use `.` to indicate nested object keys. Alternatively, [react-i18next docs](https://react.i18next.com/latest/withtranslation-hoc) show how to translate a class component.

```js
import { useTranslation } from '@translations/i18n'

const MyComponent = () => {
  const { t } = useTranslation()
  return (
    <p>{t('Path.To.Translation.Key')}</p>
  )
}
```


## Adding a Language

FEM is integrated with [Lokalise](https://app.lokalise.com) for translations management. Any dictionary other than `/en` should be managed through the Lokalise Dashboard. Instructions on how to import and export dictionary files can be found in the how-to-zooniverse [Translations](https://github.com/zooniverse/how-to-zooniverse/tree/master/Translations) folder.

Check that added language is in the `supportedLngs` array in [i18n.js](i18n.js).

```js
  const supportedLngs = ['en', 'test']
```

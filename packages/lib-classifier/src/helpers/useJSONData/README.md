# useJSONData
  
A custom hook which loads JSON data for a Panoptes subject.

Usage:
```js
import { useJSONData } from '@helpers'


function MyDataComponent({ subject, onReady, onError }) {
  const JSONdata = useJSONData(
    subject,
    () => onReady(),
    (error) => onError(error)
  )
}
```
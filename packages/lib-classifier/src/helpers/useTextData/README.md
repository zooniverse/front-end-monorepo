# useTextData
  
A custom hook which loads text data for a Panoptes subject.

Usage:
```js
import { useTextData } from '@helpers'


function MyDataComponent({ subject, onReady, onError }) {
  const textData = useTextData(
    subject,
    () => onReady(),
    (error) => onError(error)
  )
}
```
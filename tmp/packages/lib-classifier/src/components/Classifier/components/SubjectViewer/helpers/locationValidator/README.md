# `locationValidator`

A custom prop type validator for subject locations, which are an array of objects each with a single key/value pair in the format `mimeType: uri`, e.g.:

```json
{
  "subject": {
    "locations": [
      {
        "image/jpg": "https://example.com/subject.jpg"
      }
    ]
  }
}
```

The function only tests for correctness, not whether the MIME type is supported, nor whether the URI exists.

## Usage

Use as an argument to `PropTypes.arrayOf`:

```js
import locationValidator from '../helpers/locationValidator'

MyComponent.propTypes = {
  subject: PropTypes.shape({
    locations: PropTypes.arrayOf(locationValidator)
  })
}
```

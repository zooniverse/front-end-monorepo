# formatTimeStamp

A helper function to convert a number to a string formatted as `mm:ss:ms` or `ss:ms`

The Zooniverse video player has a slider who's values are 0.0 to 1.0. As a video plays, the handle will progress from 0.0 (start of the video) to 1.0 (end of the video). This function converts the decimal number to a human readable timestamp and is used in the video controller and sent as a property for temporal drawing tools.

### accepts

**displayTime:** Required. This is a number between 0 and 1 having 3 decimal places. This represents the current position (time) on the video slider.

E.g. `0.287` or `0.962`

**duration:** Required. This is the total length of the video. This must be a number with 3 decimal places.

E.g. `4.025` or `8.480`

### returns

The function returns a string representing the current timestamp as `mm:ss:ms` or `ss:ms`

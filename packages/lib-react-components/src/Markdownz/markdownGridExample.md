# This is a Header #
Lorem ipsum etc

Mentions are embedded with an `@` sign eg. @eatyourgreens @team @support.

Subjects can be mentioned, in project contexts, with `^S` eg. ^S1234567.

Emojis should be supported via shortcodes `:smile:` :smile: or `:-)` :-).

Here's an embedded code example.
```
import { utils } from 'markdownz';

const testContent = `
## Test content

This is a code example, with [a link](https://www.zooniverse.org)
`;
const html = utils.getHTML({ content: testContent });
```

![J1003351.36-003340.8_sdss_decals.gif](https://panoptes-uploads.zooniverse.org/production/project_attached_image/7656d42d-4d25-42e1-9014-6b8876a5641f.gif =100x)
![J094402.93+004556.2_sdss_decals.gif](https://panoptes-uploads.zooniverse.org/production/project_attached_image/bb03674a-e03a-455b-9a4d-4aad7d718df1.gif =250x)
*This is an image label. The above two gifs will not pass through the thumbnail service because they're gifs not img*

![alt](https://static.zooniverse.org/fem-assets/home-video.mp4 =300x)

![alt](https://panoptes-uploads.zooniverse.org/production/subject_location/1c93591f-5d7e-4129-a6da-a65419b88048.mpga)

![JSON data subject](https://panoptes-uploads.zooniverse.org/subject_location/74fddc9b-790d-47c6-9eac-110c64022ea8.json)

Ordered list
1. One
2. Two
3. Three

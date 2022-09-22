import zooTheme from '@zooniverse/grommet-theme';
import { Grommet } from 'grommet';

import ContentBox from './ContentBox';

const CONTENT = (
  <div>
    A natoque elementum venenatis tempus nec vel placerat vehicula vestibulum platea, posuere eget
    quam donec magna sodales euismod parturient fermentum. Gravida suspendisse dictum consectetur
    nec convallis ridiculus nisi, integer proin condimentum urna in vestibulum adipiscing, lectus
    eros tempus metus primis fermentum. Maecenas torquent posuere sit lorem vehicula conubia
    habitant, vel est placerat semper hendrerit neque porta, parturient mi massa metus integer quam.
  </div>
);
const LINK_LABEL = 'A link';
const LINK_URL = '#';
const TITLE = 'Here is a title';

export default {
  title: 'Project App / Shared / ContentBox',
};

export const Plain = () => (
  <Grommet theme={zooTheme}>
    <ContentBox>{CONTENT}</ContentBox>
  </Grommet>
);

Plain.story = {
  name: 'plain',
};

export const ContentWithTitle = () => (
  <Grommet theme={zooTheme}>
    <ContentBox title={TITLE}>{CONTENT}</ContentBox>
  </Grommet>
);

ContentWithTitle.story = {
  name: 'content with title',
};

export const ContentWithTitleAndALink = () => (
  <Grommet theme={zooTheme}>
    <ContentBox linkLabel={LINK_LABEL} linkUrl={LINK_URL} title={TITLE}>{CONTENT}</ContentBox>
  </Grommet>
);

ContentWithTitleAndALink.story = {
  name: 'content with title and a link',
};

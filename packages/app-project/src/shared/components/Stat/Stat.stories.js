import zooTheme from '@zooniverse/grommet-theme';
import { Grommet } from 'grommet';
import Stat from './Stat';

export default {
  title: 'Project App / Shared / Stat',
};

export const Default = () => (
  <Grommet theme={zooTheme}>
    <Stat label="Volunteers" value={122} />
  </Grommet>
);

export const HugeNumber = () => (
  <Grommet theme={zooTheme}>
    <Stat label="Volunteers is a long word" value={122000000} />
  </Grommet>
);

HugeNumber.story = {
  name: 'Huge number',
};

export const Zero = () => (
  <Grommet theme={zooTheme}>
    <Stat label="Zero" value={0} />
  </Grommet>
);

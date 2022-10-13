import React from 'react';
import zooTheme from '@zooniverse/grommet-theme';
import { Box, Grommet } from 'grommet';
import * as d3 from 'd3';
import zip from 'lodash/zip';
import LightCurveViewer from './LightCurveViewer';
import kepler from '../../helpers/mockLightCurves/kepler';
import readme from './README.md';
import backgrounds from '../../../../../../../.storybook/lib/backgrounds';

const config = {
  notes: {
    markdown: readme,
  },
};
const mockData = kepler;

const darkThemeConfig = Object.assign({}, config, { backgrounds: backgrounds.darkDefault });

const dataPoints = zip(mockData.x, mockData.y);
const dataExtent = {
  x: d3.extent(mockData.x),
  y: d3.extent(mockData.y),
};

export default {
  title: 'Subject Viewers / LightCurveViewer',

  parameters: {
    component: LightCurveViewer,
  },
};

export const LightTheme = () => {
  return (
    <Grommet theme={zooTheme}>
      <Box height="medium" width="large">
        <LightCurveViewer
          dataExtent={dataExtent}
          dataPoints={dataPoints}
          setOnPan={() => {}}
          setOnZoom={() => {}}
        />
      </Box>
    </Grommet>
  );
};

LightTheme.story = {
  name: 'light theme',
  parameters: config,
};

export const DarkTheme = () => {
  const darkZooTheme = Object.assign({}, zooTheme, { dark: true });
  return (
    <Grommet theme={darkZooTheme}>
      <Box height="medium" width="large">
        <LightCurveViewer
          dataExtent={dataExtent}
          dataPoints={dataPoints}
          setOnPan={() => {}}
          setOnZoom={() => {}}
        />
      </Box>
    </Grommet>
  );
};

DarkTheme.story = {
  name: 'dark theme',
  parameters: darkThemeConfig,
};

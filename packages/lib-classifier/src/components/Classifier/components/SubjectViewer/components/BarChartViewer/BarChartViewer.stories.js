import zooTheme from '@zooniverse/grommet-theme';
import { Box, Grommet, base as baseTheme } from 'grommet';
import BarChartViewer from './BarChartViewer';
import mockData, {
  mockDataWithColor,
  variableStarAmplitudeMockData,
  variableStarPeriodMockData,
} from './mockData';
import { merge } from 'lodash';
import readme from './README.md';
import backgrounds from '../../../../../../../.storybook/lib/backgrounds';

const config = {
  notes: {
    markdown: readme,
  },
};

const darkThemeConfig = { ...config, backgrounds: backgrounds.darkDefault };

export default {
  title: 'Subject Viewers / BarChartViewer',
  component: BarChartViewer
}

export const LightTheme = () => {
  const {
    data,
    chartOptions: { margin, xAxisLabel, yAxisLabel },
  } = mockData;
  return (
    <Grommet theme={zooTheme}>
      <Box
        background='white'
        height="medium"
        pad="small"
        width="large"
      >
        <BarChartViewer
          data={data}
          margin={margin}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
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
  const {
    data,
    chartOptions: { margin, xAxisLabel, yAxisLabel },
  } = mockData;
  const darkZooTheme = { ...zooTheme, dark: true };
  return (
    <Grommet theme={darkZooTheme}>
      <Box
        background={darkZooTheme.global.colors['dark-3']}
        height="medium"
        pad="small"
        width="large"
      >
        <BarChartViewer
          data={data}
          margin={margin}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
        />
      </Box>
    </Grommet>
  );
};

DarkTheme.story = {
  name: 'dark theme',
  parameters: darkThemeConfig,
};

export const CustomThemeAndBarColor = () => {
  const {
    data,
    chartOptions: { margin, xAxisLabel, yAxisLabel },
  } = mockDataWithColor;
  const customTheme = merge({}, baseTheme, {
    global: {
      font: {
        family: 'Bitstream Vera Serif',
      },
    },
  });
  return (
    <Grommet theme={customTheme}>
      <Box
        background={text('container background', '#ffffff')}
        height="medium"
        pad="small"
        width="large"
      >
        <BarChartViewer
          data={data}
          margin={margin}
          xAxisLabel={xAxisLabel}
          yAxisLabel={yAxisLabel}
        />
      </Box>
    </Grommet>
  );
};

CustomThemeAndBarColor.story = {
  name: 'Custom theme and bar color',
  parameters: config,
};

export const VariableStarPeriodBarCharts = () => {
  return (
    <Grommet theme={zooTheme}>
      <Box
        background='#ffffff'
        direction="row"
        height='300px'
        gap="small"
        pad="small"
        width='300px'
      >
        <BarChartViewer
          data={variableStarPeriodMockData.data}
          margin={variableStarPeriodMockData.chartOptions.margin}
          xAxisLabel={variableStarPeriodMockData.chartOptions.xAxisLabel}
          yAxisLabel={variableStarPeriodMockData.chartOptions.yAxisLabel}
        />
        <BarChartViewer
          data={variableStarAmplitudeMockData.data}
          margin={variableStarAmplitudeMockData.chartOptions.margin}
          xAxisLabel={variableStarAmplitudeMockData.chartOptions.xAxisLabel}
          yAxisLabel={variableStarAmplitudeMockData.chartOptions.yAxisLabel}
        />
      </Box>
    </Grommet>
  );
};

VariableStarPeriodBarCharts.story = {
  name: 'Variable Star Period bar charts',
  parameters: config,
};

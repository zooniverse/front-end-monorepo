import { withKnobs, text, number, object } from '@storybook/addon-knobs';
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

const darkThemeConfig = Object.assign({}, config, { backgrounds: backgrounds.darkDefault });

export default {
  title: 'Subject Viewers / BarChartViewer',
  component: BarChartViewer,
  decorators: [withKnobs]
}

export const LightTheme = () => {
  const {
    data,
    chartOptions: { margin, xAxisLabel, yAxisLabel },
  } = mockData;
  return (
    <Grommet theme={zooTheme}>
      <Box
        background={text('container background', 'white')}
        height="medium"
        pad="small"
        width="large"
      >
        <BarChartViewer
          data={object('data', data)}
          margin={{
            bottom: number('bottom margin', margin.bottom),
            left: number('left margin', margin.left),
            right: number('right margin', margin.right),
            top: number('top margin', margin.top),
          }}
          xAxisLabel={text('x axis label', xAxisLabel)}
          yAxisLabel={text('y axis label', yAxisLabel)}
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
  const darkZooTheme = Object.assign({}, zooTheme, { dark: true });
  return (
    <Grommet theme={darkZooTheme}>
      <Box
        background={text('container background', darkZooTheme.global.colors['dark-3'])}
        height="medium"
        pad="small"
        width="large"
      >
        <BarChartViewer
          data={data}
          margin={margin}
          xAxisLabel={text('x axis label', xAxisLabel)}
          yAxisLabel={text('y axis label', yAxisLabel)}
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
          xAxisLabel={text('x axis label', xAxisLabel)}
          yAxisLabel={text('y axis label', yAxisLabel)}
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
        background={text('container background', '#ffffff')}
        direction="row"
        height={text('parent container height', '300px')}
        gap="small"
        pad="small"
        width={text('parent container width', '300px')}
      >
        <BarChartViewer
          data={object('period data', variableStarPeriodMockData.data)}
          margin={{
            bottom: number(
              'period bottom margin',
              variableStarPeriodMockData.chartOptions.margin.bottom
            ),
            left: number('period left margin', variableStarPeriodMockData.chartOptions.margin.left),
            right: number(
              'period right margin',
              variableStarPeriodMockData.chartOptions.margin.right
            ),
            top: number('period top margin', variableStarPeriodMockData.chartOptions.margin.top),
          }}
          xAxisLabel={text(
            'period x-axis label',
            variableStarPeriodMockData.chartOptions.xAxisLabel
          )}
          yAxisLabel={text(
            'period y-axis label',
            variableStarPeriodMockData.chartOptions.yAxisLabel
          )}
        />
        <BarChartViewer
          data={object('amplitude data', variableStarAmplitudeMockData.data)}
          margin={{
            bottom: number(
              'amplitude bottom margin',
              variableStarAmplitudeMockData.chartOptions.margin.bottom
            ),
            left: number(
              'amplitude left margin',
              variableStarAmplitudeMockData.chartOptions.margin.left
            ),
            right: number(
              'amplitude right margin',
              variableStarAmplitudeMockData.chartOptions.margin.right
            ),
            top: number(
              'amplitude top margin',
              variableStarAmplitudeMockData.chartOptions.margin.top
            ),
          }}
          xAxisLabel={text(
            'amplitude x-axis label',
            variableStarAmplitudeMockData.chartOptions.xAxisLabel
          )}
          yAxisLabel={text(
            'amplitude y-axis label',
            variableStarAmplitudeMockData.chartOptions.yAxisLabel
          )}
        />
      </Box>
    </Grommet>
  );
};

VariableStarPeriodBarCharts.story = {
  name: 'Variable Star Period bar charts',
  parameters: config,
};

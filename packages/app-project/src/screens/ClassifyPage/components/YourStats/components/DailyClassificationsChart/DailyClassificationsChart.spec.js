import { shallow } from 'enzyme'
import React from 'react'
import { AxisBottom, AxisLeft } from '@vx/axis'
import { Group } from '@vx/group'
import { Bar } from '@vx/shape'
import WidgetHeading from '../../../../../../shared/components/WidgetHeading'

import { DailyClassificationsChart } from './DailyClassificationsChart'

describe('Component > DailyClassificationsChart', function () {
  const MOCK_COUNTS = [
    {
      alt: "Sunday: 0",
      count: 0,
      period: "2019-10-6",
      label: "S",
      longLabel: "Sunday"
    },
    {
      alt: "Saturday: 0",
      count: 0,
      period: "2019-10-5",
      label: "S",
      longLabel: "Saturday"
    },
    {
      alt: "Friday: 0",
      count: 0,
      period: "2019-10-4",
      label: "F",
      longLabel: "Friday"
    },
    {
      alt: "Thursday: 0",
      count: 0,
      period: "2019-10-3",
      label: "T",
      longLabel: "Thursday"
    },
    {
      alt: "Wednesday: 0",
      count: 0,
      period: "2019-10-2",
      label: "W",
      longLabel: "Wednesday"
    },
    {
      alt: "Tuesday: 97",
      count: 97,
      period: "2019-10-1",
      label: "T",
      longLabel: "Tuesday"
    },
    {
      alt: "Monday: 85",
      count: 85,
      period: "2019-09-30",
      label: "M",
      longLabel: "Monday"
    }
  ]
  let wrapper

  before(function () {
    wrapper = shallow(
      <DailyClassificationsChart
        stats={MOCK_COUNTS}
        projectName="Test Project"
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should have a heading', function () {
    expect(wrapper.find(WidgetHeading).length).to.equal(1)
  })

  it('should have a left axis', function () {
    expect(wrapper.find(AxisLeft).length).to.equal(1)
  })

  it('should have a bottom axis', function () {
    expect(wrapper.find(AxisBottom).length).to.equal(1)
  })

  it('should have a bar group', function () {
    expect(wrapper.find(Group).length).to.equal(1)
  })

  describe('daily bars', function () {
    MOCK_COUNTS.forEach(function (count, i) {
      describe(count.longLabel, function () {
        let bar

        before(function () {
          bar = wrapper.find(Bar).find({ "aria-label": count.alt })
        })

        it('should exist', function () {
          expect(bar).to.be.ok()
        })

        it('should be an image', function () {
          expect(bar.prop('role')).to.equal('image')
        })

        it('should have an accessible description', function () {
          expect(bar.prop('aria-label')).to.equal(count.alt)
        })
      })
    })
  })
})

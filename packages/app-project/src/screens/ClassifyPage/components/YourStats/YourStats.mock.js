const YourStatsStoreMock = {
	project: {
		display_name: 'Stats Mock Project'
	},
	user: {
		personalization: {
			counts: {
				today: 10,
				total: 100
			},
			stats: {
				thisWeek: [
					{
						alt: 'Sunday: 0',
						count: 0,
						period: '2019-10-6',
						label: 'S',
						longLabel: 'Sunday'
					},
					{
						alt: 'Saturday: 0',
						count: 0,
						period: '2019-10-5',
						label: 'S',
						longLabel: 'Saturday'
					},
					{
						alt: 'Friday: 0',
						count: 0,
						period: '2019-10-4',
						label: 'F',
						longLabel: 'Friday'
					},
					{
						alt: 'Thursday: 0',
						count: 0,
						period: '2019-10-3',
						label: 'T',
						longLabel: 'Thursday'
					},
					{
						alt: 'Wednesday: 0',
						count: 0,
						period: '2019-10-2',
						label: 'W',
						longLabel: 'Wednesday'
					},
					{
						alt: 'Tuesday: 97',
						count: 97,
						period: '2019-10-1',
						label: 'T',
						longLabel: 'Tuesday'
					},
					{
						alt: 'Monday: 85',
						count: 85,
						period: '2019-09-30',
						label: 'M',
						longLabel: 'Monday'
					}
				]
			}
		}
	},
}

export { YourStatsStoreMock }

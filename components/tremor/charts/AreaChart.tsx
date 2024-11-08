'use client'

import { AreaChart, Card, Title } from '@tremor/react'

const weightData = [
	{ date: 'Jan 23', residuos: 130 },
	{ date: 'Feb 23', residuos: 162 },
	{ date: 'Mar 23', residuos: 165 },
	{ date: 'Apr 23', residuos: 158 },
	{ date: 'May 23', residuos: 170 },
	{ date: 'Jun 23', residuos: 172 },
	{ date: 'Jul 23', residuos: 175 },
	{ date: 'Aug 23', residuos: 178 },
	{ date: 'Sep 23', residuos: 250 }
]

const customTooltip = ({ payload, active }) => {
	if (!active || !payload) return null
	return (
		<div className='w-56 rounded-tremor-default text-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border'>
			{payload.map((category, idx) => (
				<div key={idx} className='flex flex-1 space-x-2.5'>
					<div className={`w-1 flex flex-col bg-${category.color}-500 rounded`} />
					<div className='space-y-1'>
						<p className='text-tremor-content'>{category.dataKey}</p>
						<p className='font-medium text-tremor-content-emphasis'>{category.value} lbs</p>
					</div>
				</div>
			))}
		</div>
	)
}

export const AreaChartCustomTooltip = ({ className = 'mt-5' }: { className?: string }) => {
	return (
		<div className={className}>
			<Card>
				<Title>Residuos procesados</Title>
				<AreaChart
					className='h-72 mt-4'
					data={weightData}
					index='date'
					categories={['residuos']}
					colors={['blue']}
					yAxisWidth={30}
					customTooltip={customTooltip}
				/>
			</Card>
		</div>
	)
}

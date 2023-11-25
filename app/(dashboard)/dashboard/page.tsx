import { AreaChartCustomTooltip } from '@/components/tremor/charts/AreaChart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DashboardPage({ data = [] }: { data?: any[] }) {
	const cardsData = [
		{
			title: 'Residuos reciclados',
			icon: (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='2'
					className='h-4 w-4 text-muted-foreground'
				>
					<path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
				</svg>
			),
			value: 200,
			percentage: '+20.1% desde el mes pasado'
		},
		{
			title: 'Nivel de CO2',
			icon: (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='2'
					className='h-4 w-4 text-muted-foreground'
				>
					<path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
					<circle cx='9' cy='7' r='4' />
					<path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
				</svg>
			),
			value: 10000,
			percentage: '+180.1% desde el mes pasado'
		},
		{
			title: 'Plantas procesadas',
			icon: (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='2'
					className='h-4 w-4 text-muted-foreground'
				>
					<rect width='20' height='14' x='2' y='5' rx='2' />
					<path d='M2 10h20' />
				</svg>
			),
			value: 5,
			percentage: '+19% desde el mes pasado'
		},
		{
			title: 'Residuos procesados',
			icon: (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
					fill='none'
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='2'
					className='h-4 w-4 text-muted-foreground'
				>
					<path d='M22 12h-4l-3 9L9 3l-3 9H2' />
				</svg>
			),
			value: 2000,
			percentage: '+10% desde el mes pasado'
		}
		// Add more card data objects as needed
	]

	return (
		<div className='p-20'>
			{/* Cards */}
			<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
				{cardsData.map((card, index) => (
					<Card key={index}>
						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
							<CardTitle className='text-sm font-medium'>{card.title}</CardTitle>
							{card.icon}
						</CardHeader>
						<CardContent>
							<div className='text-2xl font-bold'>{card.value}</div>
							<p className='text-xs text-muted-foreground'>{card.percentage}</p>
						</CardContent>
					</Card>
				))}
			</div>
			{/* Graph */}
			<AreaChartCustomTooltip />
		</div>
	)
}

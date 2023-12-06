export function NoDataAvailableMessage() {
	return (
		<div className='flex flex-col items-center justify-center'>
			<DatabaseIcon className='h-20 w-20 text-gray-400 dark:text-gray-600' />
			<h2 className='text-xl font-semibold text-gray-700 dark:text-gray-300 mt-4'>No se encontraron datos</h2>
			<p className='text-gray-500 dark:text-gray-400 text-center max-w-xl mt-2'>
				Lo sentimos, no pudimos encontrar ningún dato para mostrar en este momento.
				<p className='mt-2'>Si crees que esto es un error, por favor, contacta a soporte.</p>
			</p>
		</div>
	)
}

function DatabaseIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<ellipse cx='12' cy='5' rx='9' ry='3' />
			<path d='M3 5V19A9 3 0 0 0 21 19V5' />
			<path d='M3 12A9 3 0 0 0 21 12' />
		</svg>
	)
}

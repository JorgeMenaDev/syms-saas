'use client'

import { CardContent, Card } from '@/components/ui/card'
import React from 'react'
import { CommandMenu } from '@/components/CustomCommand'

export function SearchBox() {
	const [open, setOpen] = React.useState(false)

	return (
		<React.Fragment>
			<Card
				onClick={() => {
					setOpen(true)
				}}
				className='dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-50 w-full cursor-pointer max-w-md mx-auto bg-white m-1 px-5 py-2 max-w-[200px] lg:max-w-[300px]'
			>
				<CardContent
					className='bg-white p-0 border-none
					dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-50
				'
				>
					<div className='flex items-center justify-between bg-white rounded-md dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-50'>
						<div className='flex items-center space-x-2 bg-white'>
							<div className='bg-white text-gray-700 flex dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-50'>
								<IconSearch
									className='w-5 h-5 text-gray-700
								dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-50
								'
								/>
								<span className='sr-only'>Buscar</span>
								<span className='ml-2'>Buscar</span>
							</div>
						</div>
						<div className='flex items-center space-x-2 bg-white dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-50'>
							<IconCommand
								className='w-5 h-5 text-gray-700
								dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-50
							'
							/>
							<span className='text-gray-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-50'>+ K</span>
						</div>
					</div>
				</CardContent>
			</Card>
			<CommandMenu open={open} setOpen={setOpen} />
		</React.Fragment>
	)
}

function IconCommand(props: any) {
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
			<path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
		</svg>
	)
}

function IconSearch(props: any) {
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
			<circle cx='11' cy='11' r='8' />
			<path d='m21 21-4.3-4.3' />
		</svg>
	)
}

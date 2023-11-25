'use client'

import { useState, useEffect } from 'react'
import { CardContent, Card } from '@/components/ui/card'

const MONK_MODE_DAYS = 21 * 24 * 60 * 60 * 1000

export function CountdownComponent() {
	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

	function calculateTimeLeft() {
		const targetDate = new Date()
		targetDate.setDate(targetDate.getDate() + 21)

		const difference = targetDate - new Date()

		if (difference > 0) {
			const days = Math.floor(difference / (1000 * 60 * 60 * 24))
			const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
			const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
			const seconds = Math.floor((difference % (1000 * 60)) / 1000)

			return { days, hours, minutes, seconds }
		}

		return { days: 0, hours: 0, minutes: 0, seconds: 0 }
	}

	useEffect(() => {
		const intervalId = setInterval(() => {
			setTimeLeft(calculateTimeLeft())
		}, 1000)

		return () => {
			clearInterval(intervalId)
		}
	}, [])

	console.log({})

	return (
		<Card className='w-full max-w-sm mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden'>
			<CardContent className='p-4'>
				<h2 className='text-2xl font-semibold text-gray-800 dark:text-white'>Challenge Countdown: 21 Days</h2>
				<div className='mt-4 space-y-4'>
					{/* Days */}
					<div className='flex items-center justify-between'>
						<div className='text-gray-700 dark:text-gray-200'>
							<h3 className='text-lg'>Days Left</h3>
							<p className='text-4xl font-bold'>{timeLeft.days}</p>
						</div>
					</div>

					{/* Hours */}
					<div className='flex items-center justify-between'>
						<div className='text-gray-700 dark:text-gray-200'>
							<h3 className='text-lg'>Hours Left</h3>
							<p className='text-4xl font-bold'>{timeLeft.hours}</p>
						</div>
					</div>

					{/* Minutes */}
					<div className='flex items-center justify-between'>
						<div className='text-gray-700 dark:text-gray-200'>
							<h3 className='text-lg'>Minutes Left</h3>
							<p className='text-4xl font-bold'>{timeLeft.minutes}</p>
						</div>
					</div>

					{/* Seconds */}
					<div className='flex items-center justify-between'>
						<div className='text-gray-700 dark:text-gray-200'>
							<h3 className='text-lg'>Seconds Left</h3>
							<p className='text-4xl font-bold'>{timeLeft.seconds}</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

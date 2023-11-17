import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export function HomePageHero() {
	return (
		<div className='relative isolate px-6  lg:px-8'>
			<div className='mx-auto max-w-2xl py-10 sm:py-16'>
				<div className='hidden sm:mb-8 sm:flex sm:justify-center'>
					<div className='relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20'>
						Announcing our next round of funding.{' '}
						<a href='#' className='font-semibold text-indigo-600'>
							<span className='absolute inset-0' aria-hidden='true' />
							Read more <span aria-hidden='true'>&rarr;</span>
						</a>
					</div>
				</div>
				<div className='text-center'>
					<h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
						Fuel Your Fitness: Smart Insights, Strong Results.
					</h1>
					<p className='mt-6 text-lg leading-8 text-gray-600'>
						Transform Your Plate, Transform Your Fate: Achieve Your Ideal Weight with{' '}
						<span className='font-extrabold'>WellnessWizard.</span>
					</p>
					<div className='mt-10 flex items-center justify-center gap-x-6'>
						<Link href='/choose-goal' className={buttonVariants()}>
							Get started
						</Link>
						<Link href='/blog' className='text-sm font-semibold leading-6 text-gray-900'>
							Learn more <span aria-hidden='true'>→</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

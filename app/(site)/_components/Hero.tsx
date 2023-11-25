import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export function HomePageHero() {
	return (
		<div className='relative isolate px-6  lg:px-8'>
			<div className='mx-auto max-w-2xl py-10 sm:py-16'>
				<div className='hidden sm:mb-8 sm:flex sm:justify-center'>
					<div className='relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20'>
						Para saber mas acerca de Syms.{` `}
						<a
							target='_blank'
							rel='noopener noreferrer'
							href='https://syms-chile.vercel.app/'
							className='font-semibold text-indigo-600'
						>
							<span className='absolute inset-0' aria-hidden='true' />
							Leer más <span aria-hidden='true'>&rarr;</span>
						</a>
					</div>
				</div>
				<div className='text-center '>
					<h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
						<span className='text-primary font-extrabold'>Syms Residuos ♻️</span>
						<br /> Más que un software, una revolución ambiental.
					</h1>
					<p className='mt-6 text-lg leading-8 text-gray-600'>
						<span className='font-extrabold'>Desarrollado por Syms </span>
						para transformar residuos en sostenibilidad.
					</p>
					<div className='mt-10 flex items-center justify-center gap-x-6'>
						<Link href='/dashboard' className={buttonVariants()}>
							Comenzar
						</Link>
						<a
							target='_blank'
							rel='noopener noreferrer'
							href='https://syms-chile.vercel.app/'
							className='text-sm font-semibold leading-6 text-gray-900'
						>
							Leer más <span aria-hidden='true'>→</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

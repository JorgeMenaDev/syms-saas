import Link from 'next/link'
import { SearchBox } from './SearchBox'
import { type User } from '@supabase/supabase-js'

export function Navbar({ user, children }: { user: User; children: React.ReactNode }) {
	return (
		<div className='flex flex-col'>
			<header className='flex h-14 lg:h-[60px] items-center gap-4 border-b bg-zinc-100/40 px-6 dark:bg-zinc-800/40'>
				<Link className='lg:hidden' href='#'>
					<IconMenu className='h-6 w-6' />
				</Link>
				<SearchBox />
				<div className='ml-auto flex items-center gap-4'>
					{user.email}

					<span className='sr-only'>Toggle user menu</span>
				</div>
			</header>
			<div className='flex-1 flex items-center justify-center p-2 lg:p-4'>
				<div className='w-full h-full'>{children}</div>
			</div>
		</div>
	)
}

function IconMenu(props: any) {
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
			<line x1='4' x2='20' y1='12' y2='12' />
			<line x1='4' x2='20' y1='6' y2='6' />
			<line x1='4' x2='20' y1='18' y2='18' />
		</svg>
	)
}

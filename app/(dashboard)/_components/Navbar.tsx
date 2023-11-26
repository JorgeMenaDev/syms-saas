import Link from 'next/link'
import { SearchBox } from './SearchBox'
import { type User } from '@supabase/supabase-js'
import { LogoutButton } from './logout-button'

export function Navbar({ user }: { user: User }) {
	return (
		<>
			<header className='flex h-14 lg:h-[60px] items-center gap-4 border-b bg-zinc-100/40 px-6 dark:bg-zinc-800/40'>
				{/* TODO: this is the burgerMenu - need to have it working for mobile */}
				<Link className='lg:hidden' href='#'>
					<IconMenu className='h-6 w-6' />
				</Link>
				<SearchBox />
				<div className='ml-auto flex items-center gap-4'>
					<div className='hidden lg:block'>{user.email}</div>
					<LogoutButton />
				</div>
			</header>
		</>
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

'use client'
import { SearchBox } from './SearchBox'
import { type User } from '@supabase/supabase-js'
import { LogoutButton } from './logout-button'
import { useState } from 'react'
import Link from 'next/link'
import { menu } from './DesktopSidebar'
import { SubMenu } from './SubMenu'

export function Navbar({ user }: { user: User }) {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	return (
		<>
			<header className='flex h-14 lg:h-[60px] items-center gap-4 border-b bg-zinc-100/40 px-6 dark:bg-zinc-800/40'>
				<button
					onClick={() => {
						setSidebarOpen(!sidebarOpen)
					}}
					className='lg:hidden'
				>
					<IconMenu className='h-6 w-6' />
				</button>
				<SearchBox />
				<div className='ml-auto flex items-center gap-4'>
					<div className='hidden lg:block'>{user.email}</div>
					<LogoutButton />
				</div>
			</header>
			{sidebarOpen && <SidebarMobile />}
		</>
	)
}

const SidebarMobile = () => {
	return (
		<nav className='grid items-start px-4 text-sm font-medium'>
			{menu.map((item, index) =>
				item.subSections ? (
					<SubMenu key={index} item={item} />
				) : (
					<Link
						key={index}
						className='flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:text-zinc-50'
						href={item.href}
					>
						{item.icon}
						{item.text}
					</Link>
				)
			)}
		</nav>
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

import Link from 'next/link'
import { SubMenu } from './SubMenu'
import { menu } from '@/constants/sidebar-menus'

export function DesktopSidebar() {
	return (
		<div className='hidden border-r bg-zinc-100/40 lg:block dark:bg-zinc-800/40 max-w-[220px]'>
			<div className='flex h-full max-h-screen flex-col gap-2'>
				<div className='flex h-[60px] items-center border-b px-6'>
					<Link className='flex items-center gap-2 text-primary font-semibold' href='/dashboard'>
						<img src='/logo4.png' className='w-28' />
					</Link>
				</div>
				<div className='flex-1 overflow-auto py-2'>
					<nav className='grid items-start px-4 text-sm font-medium'>
						<div>
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
						</div>
					</nav>
				</div>
			</div>
		</div>
	)
}

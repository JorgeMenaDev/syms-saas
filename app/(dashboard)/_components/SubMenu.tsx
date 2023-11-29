'use client'

import { ChevronDownIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useState } from 'react'

export function SubMenu({ item }) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div>
			<button
				className='flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:text-zinc-50'
				onClick={() => {
					setIsOpen(!isOpen)
				}}
			>
				{item.icon}
				{item.text}
				<ChevronDownIcon className='h-4 w-4' />
			</button>
			<div className='ml-8'>
				{isOpen &&
					item.subSections.map((subItem, index) => (
						<Link
							key={index}
							href={subItem.href}
							className='flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-900 transition-all hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:text-zinc-50'
						>
							{subItem.text}
						</Link>
					))}
			</div>
		</div>
	)
}

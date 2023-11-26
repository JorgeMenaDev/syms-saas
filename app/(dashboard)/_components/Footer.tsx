import { ThemeToggle } from '@/components/ThemeToggle'

export function Footer() {
	return (
		<footer className='flex items-center justify-between px-4 py-2 border-t bg-zinc-100 dark:bg-zinc-800'>
			<span className='text-sm text-center text-gray-500'>
				© {new Date().getFullYear()} Syms Residuos. All rights reserved.
			</span>
			<ThemeToggle />
		</footer>
	)
}

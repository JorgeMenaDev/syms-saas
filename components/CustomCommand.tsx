'use client'

import React from 'react'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command'
import { useRouter } from 'next/navigation'
import { ExitIcon, GearIcon } from '@radix-ui/react-icons'

export function CommandMenu({
	open,
	setOpen
}: {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
	const router = useRouter()

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault()
				setOpen(open => !open)
			}
		}
		document.addEventListener('keydown', down)
		return () => {
			document.removeEventListener('keydown', down)
		}
	}, [])

	const paginas = [
		{
			name: 'Dashboard',
			path: '/dashboard',
			onSelect: () => {
				router.push('/dashboard')
				setOpen(false)
			}
		},
		{
			name: 'Data Importer',
			path: '/data-importer',
			onSelect: () => {
				router.push('/data-importer')
				setOpen(false)
			}
		}
	]

	const settings = [
		{
			icon: <GearIcon className='mr-2 h-4 w-4' />,
			name: 'Settings',
			path: '/settings',
			onSelect: () => {
				router.push('/settings')
				setOpen(false)
			}
		},
		{
			icon: <ExitIcon className='mr-2 h-4 w-4' />,
			name: 'Logout',
			path: '/logout',
			onSelect: () => {
				router.push('/logout')
				setOpen(false)
			}
		}
	]

	return (
		<CommandDialog open={open} onOpenChange={setOpen}>
			<CommandInput placeholder='Escribe algo para buscar..' />
			<CommandList>
				<CommandEmpty>No hay resultados para mostrar.</CommandEmpty>
				<CommandGroup heading='Paginas'>
					{paginas.map((pagina, i) => (
						<CommandItem key={i} onSelect={pagina.onSelect}>
							{pagina.name}
						</CommandItem>
					))}
				</CommandGroup>
				<CommandGroup heading='Settings'>
					{settings.map((setting, i) => (
						<CommandItem key={i} onSelect={setting.onSelect}>
							{setting.icon}
							<span>{setting.name}</span>
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	)
}

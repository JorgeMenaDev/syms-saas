'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export function TableModal({
	open,
	children,
	title = '¿Estás seguro?',
	description = 'Esta acción no se puede deshacer.',
	toggle,
	loading = false
}: {
	children: React.ReactNode
	open: boolean
	title?: string
	description?: string
	toggle: () => void
	loading?: boolean
}) {
	return (
		<Dialog open={open} onOpenChange={toggle}>
			<DialogContent className='"lg:max-w-screen-lg overflow-y-scroll max-h-screen w-full max-w-[90%]'>
				<DialogHeader>
					<DialogTitle className='text-2xl'>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				{loading ? <div>Cargando...</div> : children}
			</DialogContent>
		</Dialog>
	)
}

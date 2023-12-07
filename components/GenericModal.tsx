'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from '@/components/ui/dialog'

export function GenericModal({
	open,
	children,
	title = '¿Estás seguro?',
	description = 'Esta acción no se puede deshacer.',
	footer = 'Confirmar',
	toggle,
	onConfirm,
	isDisabled
}: {
	children: React.ReactNode
	open: boolean
	title?: string
	description?: string
	footer?: string
	toggle: () => void
	onConfirm: () => void
	isDisabled: boolean
}) {
	return (
		<Dialog open={open} onOpenChange={toggle}>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle className='text-2xl'>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				{children}
				<DialogFooter>
					<Button type='button' onClick={onConfirm} disabled={isDisabled}>
						{footer}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

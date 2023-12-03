'use client'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { type Row } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'

// Define an interface for the action object
export interface DataTableRowAction {
	label: string
	onSelect?: () => void
	redirectTo?: (id: string) => any
}

// Define props for the DataTableRowActions component
interface DataTableRowActionsProps<TData> {
	row: Row<TData>
	actions: DataTableRowAction[]
}

// DataTableRowActions component
export function DataTableRowActions<TData>({ row, actions }: DataTableRowActionsProps<TData>) {
	const router = useRouter()
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'>
					<DotsHorizontalIcon className='h-4 w-4' />
					<span className='sr-only'>Open menu</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-[160px]'>
				{/* Render actions based on the provided array */}
				{actions.map((action, index) => (
					<div key={index}>
						{action.label === 'Editar' ? (
							<DropdownMenuItem
								key={index}
								onSelect={async () => {
									// @ts-expect-error - TODO: check this later
									router.push((action.redirectTo as any)(row.original.id))
								}}
							>
								{action.label}
							</DropdownMenuItem>
						) : (
							<DropdownMenuItem key={index} onSelect={action.onSelect}>
								{action.label}
							</DropdownMenuItem>
						)}
					</div>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

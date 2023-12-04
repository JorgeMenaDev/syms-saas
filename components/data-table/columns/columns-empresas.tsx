'use client'

import { type ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '../data-table-column-header'
import { DataTableRowActions } from '../data-table-row-actions'

export const empresasColumns: Array<ColumnDef<any>> = [
	// {
	// 	id: 'select',
	// 	header: ({ table }) => (
	// 		<Checkbox
	// 			checked={table.getIsAllPageRowsSelected()}
	// 			onCheckedChange={value => {
	// 				table.toggleAllPageRowsSelected(!!value)
	// 			}}
	// 			aria-label='Select all'
	// 			className='translate-y-[2px]'
	// 		/>
	// 	),
	// 	cell: ({ row }) => (
	// 		<Checkbox
	// 			checked={row.getIsSelected()}
	// 			onCheckedChange={value => {
	// 				row.toggleSelected(!!value)
	// 			}}
	// 			aria-label='Select row'
	// 			className='translate-y-[2px]'
	// 		/>
	// 	),
	// 	enableSorting: false,
	// 	enableHiding: false
	// },
	{
		accessorKey: 'nombre',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Nombre' />,
		cell: ({ row }) => {
			return (
				<div className='flex items-center'>
					<span>{row.getValue('nombre')}</span>
				</div>
			)
		}
	},
	{
		accessorKey: 'industria',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Industria' />,
		cell: ({ row }) => {
			return (
				<div className='flex items-center'>
					<span>{row.getValue('industria')}</span>
				</div>
			)
		}
	},
	{
		accessorKey: 'ciiu',
		header: ({ column }) => <DataTableColumnHeader column={column} title='CIIU' />,
		cell: ({ row }) => {
			return (
				<div className='flex items-center'>
					<span>{row.getValue('ciiu')}</span>
				</div>
			)
		}
	},
	{
		accessorKey: 'rut',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Rut' />,
		cell: ({ row }) => {
			return (
				<div className='flex items-center'>
					<span>{row.getValue('rut')}</span>
				</div>
			)
		}
	},
	{
		accessorKey: 'representanteLegal',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Representante legal' />,
		cell: ({ row }) => {
			return (
				<div className='flex items-center'>
					<span>{row.getValue('representanteLegal')}</span>
				</div>
			)
		}
	},
	{
		accessorKey: 'email',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Email' />,
		cell: ({ row }) => {
			return (
				<div className='flex items-center'>
					<span>{row.getValue('email')}</span>
				</div>
			)
		}
	},
	{
		accessorKey: 'telefono',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Teléfono' />,
		cell: ({ row }) => {
			return (
				<div className='flex items-center'>
					<span>{row.getValue('telefono')}</span>
				</div>
			)
		}
	},
	{
		accessorKey: 'direccion',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Dirección' />,
		cell: ({ row }) => {
			return (
				<div className='flex items-center'>
					<span>{row.getValue('direccion')}</span>
				</div>
			)
		}
	},
	{
		accessorKey: 'region',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Región' />,
		cell: ({ row }) => {
			return (
				<div className='flex items-center'>
					<span>{row.getValue('region')}</span>
				</div>
			)
		}
	},
	{
		accessorKey: 'ciudad',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Comuna' />,
		cell: ({ row }) => {
			return (
				<div className='flex items-center'>
					<span>{row.getValue('ciudad')}</span>
				</div>
			)
		}
	},
	{
		accessorKey: 'estado',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Estado' />,
		cell: ({ row }) => {
			return (
				<div className='flex items-center'>
					<span>{row.getValue('estado')}</span>
				</div>
			)
		}
	},
	{
		id: 'actions',
		cell: ({ row }) => (
			<DataTableRowActions
				actions={[
					{
						label: 'Editar',
						redirectTo: id => `/configuracion/empresas/editar/${id}`
					},
					{
						label: 'Eliminar',
						onSelect: () => {
							console.log('Eliminar')
						}
					}
				]}
				row={row}
			/>
		)
	}
]

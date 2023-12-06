'use client'

import { type ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '../data-table-column-header'
import { DataTableRowActions } from '../data-table-row-actions'

export const empresasColumns: Array<ColumnDef<any>> = [
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
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
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
		accessorKey: 'correo',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Correo' />,
		cell: ({ row }) => {
			return (
				<div className='flex items-center'>
					<span>{row.getValue('correo')}</span>
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
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
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
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		}
	},
	{
		accessorKey: 'estado',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Estado' />,
		cell: ({ row }) => {
			const value = row.getValue('estado')
			// value is a boolean so if it's true I want to display 'Activo' and if it's false I want to display 'Inactivo'
			return (
				<div className='flex items-center'>
					<span>{value ? 'Activo' : 'Inactivo'}</span>
				</div>
			)
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
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

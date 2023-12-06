'use client'

import { type ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '../data-table-column-header'
import { DataTableRowActions } from '../data-table-row-actions'

export const establecimientosColumns: Array<ColumnDef<any>> = [
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
		accessorKey: 'tipo',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Tipo' />,
		cell: ({ row }) => {
			return (
				<div className='flex items-center'>
					<span>{row.getValue('tipo')}</span>
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
		accessorKey: 'encargado',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Encargado' />,
		cell: ({ row }) => {
			return (
				<div className='flex items-center'>
					<span>{row.getValue('encargado')}</span>
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
		accessorKey: 'nopel',
		header: ({ column }) => <DataTableColumnHeader column={column} title='NOPEL' />,
		cell: ({ row }) => {
			const value = row.getValue('nopel')
			return (
				<div className='flex items-center'>
					<span>
						<span>{value ? 'Activo' : 'Inactivo'}</span>
					</span>
				</div>
			)
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		}
	},
	{
		accessorKey: 'respel',
		header: ({ column }) => <DataTableColumnHeader column={column} title='RESPEL' />,
		cell: ({ row }) => {
			const value = row.getValue('respel')

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
		accessorKey: 'usuarios',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Usuarios' />,
		cell: ({ row }) => {
			return (
				<div className='flex items-center'>
					<span>{row.getValue('usuarios')}</span>
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
						redirectTo: id => `/configuracion/establecimientos/editar/${id}`
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

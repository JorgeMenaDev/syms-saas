'use client'

import { Fragment, useState } from 'react'
import { CamionesFilters } from './camiones-filters'
import { DataTable } from '@/components/data-table/DataTable'

import { type ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { DataTableRowActions } from '@/components/data-table/data-table-row-actions'
import { GenericModal } from '@/components/GenericModal'
import { toast } from 'sonner'

import { delay } from '@/utils/re-usable-functions/delay'
import { deleteCamionById } from '@/services/data/actions/server/camiones/delete-camion-by-id'

export default function ColumnsWrapper({ camiones }: any) {
	const [open, setOpen] = useState(false)
	const [id, setId] = useState('')
	const [isDeleting, setIsDeleting] = useState(false)

	function toggle() {
		setOpen(prev => !prev)
	}

	async function deleteTransportista() {
		const toastId = toast.loading('Eliminando camion...')
		setIsDeleting(true)

		const res = await deleteCamionById(id)

		if (res.ok) {
			await delay(1000) // <-- this is to wait for revalidatePath to finish.
			toast.success('Camion eliminado correctamente')
		} else {
			toast.error('Hubo un error al eliminar el camion')
		}

		toast.dismiss(toastId)
		setIsDeleting(false)
		toggle()
	}

	const camionesColumns: Array<ColumnDef<any>> = [
		{
			accessorKey: 'resolucion',
			header: ({ column }) => <DataTableColumnHeader column={column} title='Resolucion' />,
			cell: ({ row }) => {
				return (
					<div className='flex items-center'>
						<span>{row.getValue('resolucion')}</span>
					</div>
				)
			}
		},
		{
			accessorKey: 'añoResolucion',
			header: ({ column }) => <DataTableColumnHeader column={column} title='Año Resolucion' />,
			cell: ({ row }) => {
				return (
					<div className='flex items-center'>
						<span>{row.getValue('añoResolucion')}</span>
					</div>
				)
			}
		},
		{
			accessorKey: 'autoridad',
			header: ({ column }) => <DataTableColumnHeader column={column} title='Autoridad' />,
			cell: ({ row }) => {
				return (
					<div className='flex items-center'>
						<span>{row.getValue('autoridad')}</span>
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
			},
			filterFn: (row, id, value) => {
				return value.includes(row.getValue(id))
			}
		},
		{
			accessorKey: 'representanteLegal',
			header: ({ column }) => <DataTableColumnHeader column={column} title='Representante Legal' />,
			cell: ({ row }) => {
				return (
					<div className='flex items-center'>
						<span>{row.getValue('representanteLegal')}</span>
					</div>
				)
			},
			filterFn: (row, id, value) => {
				return value.includes(row.getValue(id))
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
			header: ({ column }) => <DataTableColumnHeader column={column} title='Telefono' />,
			cell: ({ row }) => {
				const value = row.getValue('telefono')
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
			accessorKey: 'camion',
			header: ({ column }) => <DataTableColumnHeader column={column} title='Camion' />,
			cell: ({ row }) => {
				return (
					<div className='flex items-center'>
						<span>{row.getValue('camion')}</span>
					</div>
				)
			},
			filterFn: (row, id, value) => {
				return value.includes(row.getValue(id))
			}
		},
		{
			accessorKey: 'modelo',
			header: ({ column }) => <DataTableColumnHeader column={column} title='Modelo' />,
			cell: ({ row }) => {
				return (
					<div className='flex items-center'>
						<span>{row.getValue('modelo')}</span>
					</div>
				)
			}
		},
		{
			accessorKey: 'añoCamion',
			header: ({ column }) => <DataTableColumnHeader column={column} title='Año Camion' />,
			cell: ({ row }) => {
				return (
					<div className='flex items-center'>
						<span>{row.getValue('añoCamion')}</span>
					</div>
				)
			}
		},
		{
			accessorKey: 'patente',
			header: ({ column }) => <DataTableColumnHeader column={column} title='Patente' />,
			cell: ({ row }) => {
				return (
					<div className='flex items-center'>
						<span>{row.getValue('patente')}</span>
					</div>
				)
			}
		},
		{
			accessorKey: 'capacidad',
			header: ({ column }) => <DataTableColumnHeader column={column} title='Capacidad' />,
			cell: ({ row }) => {
				return (
					<div className='flex items-center'>
						<span>{row.getValue('capacidad')}</span>
					</div>
				)
			}
		},
		{
			accessorKey: 'vigencia',
			header: ({ column }) => <DataTableColumnHeader column={column} title='Vigencia' />,
			cell: ({ row }) => {
				return (
					<div className='flex items-center'>
						<span>{row.getValue('vigencia')}</span>
					</div>
				)
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
			accessorKey: 'autoriza',
			header: ({ column }) => <DataTableColumnHeader column={column} title='Autoriza' />,
			cell: ({ row }) => {
				return (
					<div className='flex items-center'>
						<span>{row.getValue('autoriza')}</span>
					</div>
				)
			}
		},
		{
			accessorKey: 'comentario',
			header: ({ column }) => <DataTableColumnHeader column={column} title='Comentario' />,
			cell: ({ row }) => {
				return (
					<div className='flex items-center'>
						<span>{row.getValue('comentario')}</span>
					</div>
				)
			}
		},
		{
			accessorKey: 'documento',
			header: ({ column }) => <DataTableColumnHeader column={column} title='Documento' />,
			cell: ({ row }) => {
				return (
					<div className='flex items-center'>
						<span>{row.getValue('documento')}</span>
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
							redirectTo: id => `/configuracion/camiones/editar/${id}`
						},
						{
							label: 'Eliminar',
							delete: id => {
								toggle()
								setId(id)
							}
						}
					]}
					row={row}
				/>
			)
		}
	]

	return (
		<Fragment>
			<DataTable filters={CamionesFilters} data={camiones} columns={camionesColumns} />
			<GenericModal open={open} toggle={toggle} onConfirm={deleteTransportista} isDisabled={isDeleting}>
				<span className=' font-semibold'>Se eliminarán todos los datos relacionados a este transportista.</span>
			</GenericModal>
		</Fragment>
	)
}

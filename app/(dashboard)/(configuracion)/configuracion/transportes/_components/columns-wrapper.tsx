'use client'

import { Fragment, useState } from 'react'
import { TransportistasFilters } from './transportistas-filters'
import { DataTable } from '@/components/data-table/DataTable'

import { type ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { DataTableRowActions } from '@/components/data-table/data-table-row-actions'
import { GenericModal } from '@/components/GenericModal'
import { toast } from 'sonner'

import { delay } from '@/utils/re-usable-functions/delay'
import { deleteTransportistaById } from '@/services/data/actions/server/transportistas/delete-transportista-by-id'

export default function ColumnsWrapper({ transportistas }: any) {
	const [open, setOpen] = useState(false)
	const [id, setId] = useState('')
	const [isDeleting, setIsDeleting] = useState(false)

	function toggle() {
		setOpen(prev => !prev)
	}

	async function deleteTransportista() {
		const toastId = toast.loading('Eliminando empresa...')
		setIsDeleting(true)

		const res = await deleteTransportistaById(id)

		if (res.ok) {
			await delay(1000) // <-- this is to wait for revalidatePath to finish.
			toast.success('Empresa eliminada correctamente')
		} else {
			toast.error('Hubo un error al eliminar la empresa')
		}

		toast.dismiss(toastId)
		setIsDeleting(false)
		toggle()
	}

	const transportistasColumns: Array<ColumnDef<any>> = [
		{
			accessorKey: 'razonSocial',
			header: ({ column }) => <DataTableColumnHeader column={column} title='Razon Social' />,
			cell: ({ row }) => {
				return (
					<div className='flex items-center'>
						<span>{row.getValue('razonSocial')}</span>
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
			accessorKey: 'camiones',
			header: ({ column }) => <DataTableColumnHeader column={column} title='Camiones' />,
			cell: ({ row }) => {
				return (
					<div className='flex items-center'>
						<span>{row.getValue('camiones')}</span>
					</div>
				)
			},
			filterFn: (row, id, value) => {
				return value.includes(row.getValue(id))
			}
		},
		{
			accessorKey: 'autorizacion',
			header: ({ column }) => <DataTableColumnHeader column={column} title='Autorizacion' />,
			cell: ({ row }) => {
				return (
					<div className='flex items-center'>
						<span>{row.getValue('autorizacion')}</span>
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
							redirectTo: id => `/configuracion/transportistas/editar/${id}`
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
			<DataTable filters={TransportistasFilters} data={transportistas} columns={transportistasColumns} />
			<GenericModal open={open} toggle={toggle} onConfirm={deleteTransportista} isDisabled={isDeleting}>
				<span className=' font-semibold'>Se eliminarán todos los datos relacionados a este transportista.</span>
			</GenericModal>
		</Fragment>
	)
}

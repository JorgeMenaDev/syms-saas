'use client'

import { Fragment, useState } from 'react'
import { EstablecimientosFilters } from './establecimientos-filters'
import { DataTable } from '@/components/data-table/DataTable'

import { type ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { DataTableRowActions } from '@/components/data-table/data-table-row-actions'
import { GenericModal } from '@/components/GenericModal'
import { toast } from 'sonner'
import { delay } from '@/utils/re-usable-functions/delay'
import { deleteEstablecimientoById } from '@/services/data/actions/server/establecimientos/delete-establecimiento-by-id'
import { CsvButton } from '@/components/CsvButton'

export default function ColumnsWrapper({ establecimientos }: any) {
	const [open, setOpen] = useState(false)
	const [id, setId] = useState('')
	const [isDeleting, setIsDeleting] = useState(false)

	function toggle() {
		setOpen(prev => !prev)
	}

	async function deleteEstablecimiento() {
		const toastId = toast.loading('Eliminando establecimiento...')
		setIsDeleting(true)

		const res = await deleteEstablecimientoById(id)

		if (res.ok) {
			await delay(1000) // <-- this is to wait for revalidatePath to finish.
			toast.success('Establecimiento eliminado correctamente')
		} else {
			toast.error('Hubo un error al eliminar el establecimiento')
		}

		toast.dismiss(toastId)
		setIsDeleting(false)
		toggle()
	}

	const establecimientosColumns: Array<ColumnDef<any>> = [
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
			accessorKey: 'id_vu',
			header: ({ column }) => <DataTableColumnHeader column={column} title='ID VU' />,
			cell: ({ row }) => {
				return (
					<div className='flex items-center'>
						<span>{row.getValue('id_vu')}</span>
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
			<CsvButton name='Establecimientos' data={establecimientos} />
			<DataTable filters={EstablecimientosFilters} data={establecimientos} columns={establecimientosColumns} />
			<GenericModal open={open} toggle={toggle} onConfirm={deleteEstablecimiento} isDisabled={isDeleting}>
				<span className=' font-semibold'>Se eliminarán todos los datos relacionados a este establecimiento.</span>
			</GenericModal>
		</Fragment>
	)
}

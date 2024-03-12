'use client'

import { Fragment, useState } from 'react'
import { DataTable } from '@/components/data-table/DataTable'

import { type ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { DataTableRowActions } from '@/components/data-table/data-table-row-actions'
import { GenericModal } from '@/components/GenericModal'
import { toast } from 'sonner'

import { delay } from '@/utils/re-usable-functions/delay'
import { deleteUsuarioById } from '@/services/data/actions/server/usuarios/delete-usuario-by-id'
import { DownloadButtons } from '@/components/DownloadButtons'

export default function ColumnsWrapper({ usuarios }: any) {
	const [open, setOpen] = useState(false)
	const [id, setId] = useState('')
	const [isDeleting, setIsDeleting] = useState(false)

	function toggle() {
		setOpen(prev => !prev)
	}

	async function deleteEmpresa() {
		const toastId = toast.loading('Eliminando usuario...')
		setIsDeleting(true)

		const res = await deleteUsuarioById(id)

		if (res.ok) {
			await delay(1000) // <-- this is to wait for revalidatePath to finish.
			toast.success('Usuario eliminado correctamente')
		} else {
			toast.error('Hubo un error al eliminar el usuario')
		}

		toast.dismiss(toastId)
		setIsDeleting(false)
		toggle()
	}

	const usuariosColumns: Array<ColumnDef<any>> = [
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
			accessorKey: 'tipo',
			header: ({ column }) => <DataTableColumnHeader column={column} title='Tipo Usuario' />,
			cell: ({ row }) => {
				return (
					<div className='flex items-center'>
						<span>{row.getValue('tipo')}</span>
					</div>
				)
			},
			filterFn: (row, id, value) => {
				return value.includes(row.getValue(id))
			}
		},
		{
			accessorKey: 'empresas',
			header: ({ column }) => <DataTableColumnHeader column={column} title='Empresas' />,
			cell: ({ row }) => {
				return (
					<div className='flex items-center'>
						<span>{row.getValue('empresas')}</span>
					</div>
				)
			},
			filterFn: (row, id, value) => {
				return value.includes(row.getValue(id))
			}
		},
		{
			accessorKey: 'accion',
			header: ({ column }) => <DataTableColumnHeader column={column} title='Acción' />,
			cell: ({ row }) => {
				const value = row.getValue('accion')
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
			accessorKey: 'establecimientos',
			header: ({ column }) => <DataTableColumnHeader column={column} title='Establecimientos' />,
			cell: ({ row }) => {
				return (
					<div className='flex items-center'>
						<span>{row.getValue('establecimientos')}</span>
					</div>
				)
			},
			filterFn: (row, id, value) => {
				return value.includes(row.getValue(id))
			}
		},
		{
			accessorKey: 'activo',
			header: ({ column }) => <DataTableColumnHeader column={column} title='Activo' />,
			cell: ({ row }) => {
				const value = row.getValue('activo')
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
							redirectTo: id => `/configuracion/usuarios/editar/${id}`
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
			<DownloadButtons data={usuarios} name='usuarios' />
			<DataTable data={usuarios} columns={usuariosColumns} />
			<GenericModal open={open} toggle={toggle} onConfirm={deleteEmpresa} isDisabled={isDeleting}>
				<span className='font-semibold'>Se eliminarán todos los datos relacionados a esta empresa.</span>
			</GenericModal>
		</Fragment>
	)
}

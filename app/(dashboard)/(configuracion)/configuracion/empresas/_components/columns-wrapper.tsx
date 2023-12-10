'use client'

import { Fragment, useState } from 'react'
import { EmpresasFilters } from './empresas-filters'
import { DataTable } from '@/components/data-table/DataTable'

import { type ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { DataTableRowActions } from '@/components/data-table/data-table-row-actions'
import { GenericModal } from '@/components/GenericModal'
import { toast } from 'sonner'
import { deleteEmpresaById } from '@/services/data/actions/server/empresas/delete-empresa-by-id'
import { delay } from '@/utils/re-usable-functions/delay'

export default function ColumnsWrapper({ empresas }: any) {
	const [open, setOpen] = useState(false)
	const [id, setId] = useState('')
	const [isDeleting, setIsDeleting] = useState(false)

	function toggle() {
		setOpen(prev => !prev)
	}

	async function deleteEmpresa() {
		const toastId = toast.loading('Eliminando empresa...')
		setIsDeleting(true)

		const res = await deleteEmpresaById(id)

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

	const empresasColumns: Array<ColumnDef<any>> = [
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
			<DataTable filters={EmpresasFilters} data={empresas} columns={empresasColumns} />
			<GenericModal open={open} toggle={toggle} onConfirm={deleteEmpresa} isDisabled={isDeleting}>
				<span className=' font-semibold'>Se eliminarán todos los datos relacionados a esta empresa.</span>
			</GenericModal>
		</Fragment>
	)
}

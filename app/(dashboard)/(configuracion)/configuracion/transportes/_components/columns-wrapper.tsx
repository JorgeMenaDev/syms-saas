'use client'

import { Fragment, useState } from 'react'
import { TransportistasFilters } from './transportistas-filters'
import { DataTable } from '@/components/data-table/DataTable'

import { type ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { DataTableRowActions } from '@/components/data-table/data-table-row-actions'
import { GenericModal } from '@/components/GenericModal'
import { toast } from 'sonner'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'

import { delay } from '@/utils/re-usable-functions/delay'
import { deleteTransportistaById } from '@/services/data/actions/server/transportistas/delete-transportista-by-id'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function ColumnsWrapper({ transportistas }: any) {
	const router = useRouter()
	const [openDeleteModal, setOpenDeleteModal] = useState(false)
	const [openCamionesModal, setOpenCamionesModal] = useState(false)
	const [transportistaId, setTransportistaId] = useState('')

	const [id, setId] = useState('')
	const [isDeleting, setIsDeleting] = useState(false)

	function toggleDeleteModal() {
		setOpenDeleteModal(prev => !prev)
	}

	function toggleCamionesModal() {
		setOpenCamionesModal(prev => !prev)
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
		toggleDeleteModal()
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
				const length = (row as any).getValue('camiones').length
				return (
					<div className='flex items-center'>
						<span>
							{length > 0 ? (
								<span className='flex items-center'>
									<Button
										className='p-1 w-14 text-base'
										variant='outline'
										size='icon'
										onClick={async () => {
											setTransportistaId(row.original.id)

											toggleCamionesModal()
										}}
									>
										{length}
										<MagnifyingGlassIcon className='ml-2 w-6 h-6 ' />
									</Button>
								</span>
							) : (
								<span className='text-muted-foreground'>0</span>
							)}
						</span>
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
								toggleDeleteModal()
								setId(id)
							}
						}
					]}
					row={row}
				/>
			)
		}
	]

	function moveToCamionesPage() {
		router.push(`/tablas/camiones?id=${transportistaId}`)
	}

	return (
		<Fragment>
			<DataTable filters={TransportistasFilters} data={transportistas} columns={transportistasColumns} />
			<GenericModal
				open={openDeleteModal}
				toggle={toggleDeleteModal}
				onConfirm={deleteTransportista}
				isDisabled={isDeleting}
			>
				<span className=' font-semibold'>Se eliminarán todos los datos relacionados a este transportista.</span>
			</GenericModal>

			<GenericModal
				title='Ver camiones'
				description='Ver camiones relacionados a este transportista'
				open={openCamionesModal}
				toggle={toggleCamionesModal}
				onConfirm={moveToCamionesPage}
				isDisabled={isDeleting}
			>
				<span className=' font-semibold'>Este link te llevará a la página de camiones con los filtros aplicados.</span>
			</GenericModal>
		</Fragment>
	)
}

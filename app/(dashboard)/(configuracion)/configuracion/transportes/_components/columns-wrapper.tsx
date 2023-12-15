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
import { TableModal } from '@/components/TableModal'
import { CamionesFilters } from '@/app/(dashboard)/(otros-registros)/tablas/camiones/_components/camiones-filters'
import { fetchCamionesClientByIds } from '@/services/data/actions/client/get-camiones-client'
import { useRouter } from 'next/navigation'

export default function ColumnsWrapper({ transportistas }: any) {
	const router = useRouter()
	const [openDeleteModal, setOpenDeleteModal] = useState(false)
	const [openCamionesModal, setOpenCamionesModal] = useState(false)
	const [transportistaId, setTransportistaId] = useState('')
	const [camiones, setCamiones] = useState<any>([])
	const [loading, setLoading] = useState(false)

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
									<span className='mr-2'>{length}</span>
									<MagnifyingGlassIcon
										className='w-6 h-6 cursor-pointer text-primary font-bold'
										onClick={async () => {
											// setOpenCamionesModal(true)
											router.push(`/tablas/camiones?id=${row.original.id}`)
										}}
									/>
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
								// toggle()
								// setId(id)
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
			<GenericModal
				open={openDeleteModal}
				toggle={toggleDeleteModal}
				onConfirm={deleteTransportista}
				isDisabled={isDeleting}
			>
				<span className=' font-semibold'>Se eliminarán todos los datos relacionados a este transportista.</span>
			</GenericModal>

			<TableModal
				loading={loading}
				open={openCamionesModal}
				toggle={toggleCamionesModal}
				title='Camiones'
				description={`Registros de camiones para transportista ${
					transportistas.find((transportista: any) => transportista.id === transportistaId)?.razonSocial
				}`}
			>
				<DataTable filters={CamionesFilters} data={camiones} columns={camionesColumns} />
			</TableModal>
		</Fragment>
	)
}

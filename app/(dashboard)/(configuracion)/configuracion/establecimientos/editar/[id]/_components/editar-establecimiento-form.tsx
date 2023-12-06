'use client'

import { EditTableEntryForm } from '@/components/EditTableEntryForm'
import { updateEstablecimiento } from '@/services/data/actions/server/establecimientos/put-establecimiento-by-id'
import {
	composeEstablecimientoConfigParameters,
	createEstablecimientosFormSchema
} from '@/services/data/actions/server/establecimientos/utils'
import { toast } from 'sonner'
import { type z } from 'zod'

const formSchema = createEstablecimientosFormSchema()

export function EditarEstablecimientoForm({
	establecimiento,
	ciudadesOptions,
	regionesOptions,
	tiposDeEstablecimientos
}: {
	establecimiento: any // Initial values for pre-filling the form
	ciudadesOptions: Array<{ value: string; label: string }>
	regionesOptions: Array<{ value: string; label: string }>
	tiposDeEstablecimientos: Array<{ value: string; label: string }>
}) {
	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const { error } = await updateEstablecimiento(establecimiento.id, values)

			if (error) {
				toast.error(`Hubo un error al editar el establecimiento: ${error}`)
			} else {
				toast.success('Empresa editada correctamente.')
				return true
			}
		} catch (error) {
			console.error({ error })
			toast.error('Hubo un error al editar el establecimiento, si el error persiste contacte a soporte.')
		}
	}

	const configParameters = composeEstablecimientoConfigParameters({
		ciudadesOptions,
		regionesOptions,
		tiposDeEstablecimientos
	})

	// Format the establecimiento object from the db to match the form schema
	const formattedEstablecimiento = {
		...establecimiento,
		nopel: establecimiento.nopel ? 'activo' : 'inactivo',
		respel: establecimiento.respel ? 'activo' : 'inactivo'
	}

	console.log({ formattedEstablecimiento })

	return (
		<EditTableEntryForm
			initialValues={formattedEstablecimiento}
			configParameters={configParameters}
			onSubmit={onSubmit}
			tableSchema={formSchema}
		/>
	)
}

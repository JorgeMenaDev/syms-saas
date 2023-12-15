'use client'

import { EditTableEntryForm } from '@/components/EditTableEntryForm'
import { updateTransportista } from '@/services/data/actions/server/transportistas/put-transportista-by-id'
import {
	composeTransportistaConfigParameters,
	createTransportistaFormSchema
} from '@/services/data/actions/server/transportistas/utils'

import { toast } from 'sonner'
import { type z } from 'zod'

const formSchema = createTransportistaFormSchema()

export function EditarTransportistaForm({
	transportista,
	ciudadesOptions,
	regionesOptions
}: {
	transportista: any // Initial values for pre-filling the form
	ciudadesOptions: Array<{ value: string; label: string; idRegion: string }>
	regionesOptions: Array<{ value: string; label: string }>
}) {
	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const { error } = await updateTransportista(transportista.id, values)

			if (error) {
				toast.error(`Hubo un error al editar la transportista: ${error}`)
			} else {
				toast.success('transportista editada correctamente.')
				return true
			}
		} catch (error) {
			console.error({ error })
			toast.error('Hubo un error al editar la transportista, si el error persiste contacte a soporte.')
		}
	}

	const configParameters = composeTransportistaConfigParameters({
		ciudadesOptions,
		regionesOptions,
		camionesOptions: []
	})

	// Format the transportista object from the db to match the form schema
	const formattedtransportista = {
		...transportista,
		estado: transportista.estado ? 'activo' : 'inactivo'
	}

	return (
		<EditTableEntryForm
			initialValues={formattedtransportista}
			configParameters={configParameters}
			onSubmit={onSubmit}
			tableSchema={formSchema}
		/>
	)
}

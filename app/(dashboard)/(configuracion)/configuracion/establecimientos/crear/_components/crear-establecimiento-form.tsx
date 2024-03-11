'use client'

import { TableEntryForm } from '@/components/TableEntryForm'
import { createEstablecimiento } from '@/services/data/actions/server/establecimientos/post-establecimiento'
import {
	composeEstablecimientoConfigParameters,
	createEstablecimientosFormSchema
} from '@/services/data/actions/server/establecimientos/utils'
import { toast } from 'sonner'
import { type z } from 'zod'

const formSchema = createEstablecimientosFormSchema()

export function CrearEstablecimientoForm({
	ciudadesOptions,
	regionesOptions,
	empresasOptions,
	tiposDeEstablecimientos
}: {
	ciudadesOptions: Array<{ value: string; label: string }>
	regionesOptions: Array<{ value: string; label: string }>
	empresasOptions: Array<{ value: string; label: string }>
	tiposDeEstablecimientos: Array<{ value: string; label: string }>
}) {
	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const { error } = await createEstablecimiento(values)

			if (error) {
				toast.error(`Hubo un error al crear el establecimiento: ${error}`)
			} else {
				toast.success('Establecimiento creada correctamente.')
				return true
			}
		} catch (error) {
			console.error({ error })
			toast.error('Hubo un error al crear la Establecimiento, si el error persiste contacte a soporte.')
		}
	}

	const configParameters = composeEstablecimientoConfigParameters({
		ciudadesOptions,
		regionesOptions,
		tiposDeEstablecimientos,
		empresasOptions
	})

	// initial values are all empty strings
	const initialValues = Object.fromEntries(configParameters.map(config => [config.name, '']))

	return (
		<TableEntryForm
			initialValues={initialValues}
			tableSchema={formSchema}
			configParameters={configParameters}
			onSubmit={onSubmit}
		/>
	)
}

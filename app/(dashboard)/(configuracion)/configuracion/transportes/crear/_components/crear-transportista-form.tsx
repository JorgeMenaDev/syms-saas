'use client'

import { TableEntryForm } from '@/components/TableEntryForm'
import { createEmpresa } from '@/services/data/actions/server/empresas/post-empresa'
import {
	composeTransportistaConfigParameters,
	createTransportistaFormSchema
} from '@/services/data/actions/server/transportistas/utils'
import { toast } from 'sonner'
import { type z } from 'zod'

const formSchema = createTransportistaFormSchema()

export function CrearTransportistaForm({
	ciudadesOptions,
	regionesOptions
}: {
	ciudadesOptions: Array<{ value: string; label: string; idRegion: string }>
	regionesOptions: Array<{ value: string; label: string }>
}) {
	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const { error } = await createEmpresa(values)

			if (error) {
				toast.error(`Hubo un error al crear la empresa: ${error}`)
			} else {
				toast.success('Empresa creada correctamente.')
				return true
			}
		} catch (error) {
			console.error({ error })
			toast.error('Hubo un error al crear la empresa, si el error persiste contacte a soporte.')
		}
	}

	const configParameters = composeTransportistaConfigParameters({
		ciudadesOptions,
		regionesOptions,
		camionesOptions: []
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

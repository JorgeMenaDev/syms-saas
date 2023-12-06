'use client'

import { EditTableEntryForm } from '@/components/EditTableEntryForm'
import { updateEmpresa } from '@/services/data/actions/server/empresas/put-empresa-by-id'
import { composeEmpresaConfigParameters, createEmpresaFormSchema } from '@/services/data/actions/server/empresas/utils'
import { type Empresa } from '@/types/empresa'
import { toast } from 'sonner'
import { type z } from 'zod'

const formSchema = createEmpresaFormSchema()

export function EditarEmpresaForm({
	empresa,
	ciudadesOptions,
	regionesOptions,
	ciiusOptions
}: {
	empresa: Empresa // Initial values for pre-filling the form
	ciudadesOptions: Array<{ value: string; label: string }>
	regionesOptions: Array<{ value: string; label: string }>
	ciiusOptions: Array<{ value: string; label: string }>
}) {
	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const { error } = await updateEmpresa(empresa.id, values)

			if (error) {
				toast.error(`Hubo un error al editar la empresa: ${error}`)
			} else {
				toast.success('Empresa editada correctamente.')
				return true
			}
		} catch (error) {
			console.error({ error })
			toast.error('Hubo un error al editar la empresa, si el error persiste contacte a soporte.')
		}
	}

	const configParameters = composeEmpresaConfigParameters({
		ciudadesOptions,
		regionesOptions,
		ciiusOptions
	})

	// Format the empresa object from the db to match the form schema
	const formattedEmpresa = {
		...empresa,
		estado: empresa.estado ? 'activo' : 'inactivo'
	}

	return (
		<EditTableEntryForm
			initialValues={formattedEmpresa}
			configParameters={configParameters}
			onSubmit={onSubmit}
			tableSchema={formSchema}
		/>
	)
}

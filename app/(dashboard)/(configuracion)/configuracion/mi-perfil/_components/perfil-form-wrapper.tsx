'use client'

import { ReadOnlyTableEntryForm } from '@/components/ReadOnlyTableEntryForm'
import { type ConfigParameter } from '@/components/TableEntryForm'
import { type UserProfile } from '@/types/user'
import { z } from 'zod'

const formSchema = z.object({
	email: z.string(),
	tipo: z.string(),
	empresas: z.string(),
	imagen: z.string()
})

const configParameters: ConfigParameter[] = [
	{
		name: 'email',
		label: 'Email',
		type: 'input',
		placeholder: 'Email',
		description: 'Email del usuario'
	},
	{
		name: 'tipo',
		label: 'Tipo',
		type: 'input',
		placeholder: 'Tipo',
		description: 'Tipo de usuario'
	},
	{
		name: 'empresas',
		label: 'Empresas',
		type: 'input',
		placeholder: 'Empresas',
		description: 'Empresas del usuario'
	},
	{
		name: 'imagen',
		label: 'Imagen',
		type: 'input',
		placeholder: 'Imagen',
		description: 'Imagen del usuario'
	}
]

export function PerfilFormWrapper({ user }: { user: UserProfile }) {
	return <ReadOnlyTableEntryForm tableSchema={formSchema} configParameters={configParameters} initialValues={user} />
}

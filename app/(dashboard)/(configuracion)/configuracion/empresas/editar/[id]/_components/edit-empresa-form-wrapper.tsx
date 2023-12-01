'use client'

import { EditTableEntryForm } from '@/components/EditTableEntryForm'
import { type ConfigParameter } from '@/components/TableEntryForm'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
	direccion: z
		.string({
			required_error: 'La direccion es requerida.'
		})
		.min(3, {
			message: 'La direccion debe tener al menos 3 caracteres.'
		}),
	email: z
		.string({
			required_error: 'El email es requerido.'
		})
		.email({
			message: 'El email debe ser valido.'
		}),
	ciudad: z.string({
		required_error: 'La ciudad es requerida.'
	}),
	estado: z.string({
		required_error: 'El estado es requerido.'
	}),
	industria: z.string({
		required_error: 'La industria es requerida.'
	}),
	region: z.string({
		required_error: 'La region es requerida.'
	}),
	nombre: z
		.string({
			required_error: 'El nombre es requerido.'
		})
		.min(3, {
			message: 'El nombre debe tener al menos 3 caracteres.'
		}),
	representanteLegal: z
		.string({
			required_error: 'El representante legal es requerido.'
		})
		.min(3, {
			message: 'El representante legal debe tener al menos 3 caracteres.'
		}),
	rut: z
		.string({
			required_error: 'El rut es requerido.'
		})
		.min(6, {
			message: 'El rut debe tener al menos 6 caracteres.'
		}),
	telefono: z
		.string({
			required_error: 'El telefono es requerido.'
		})
		.min(9, {
			message: 'El telefono debe tener al menos 9 caracteres.'
		})
})

const ciudadesOptions = [
	{ value: '1', label: 'Santiago' },
	{ value: '2', label: 'Valparaiso' },
	{ value: '3', label: 'Concepcion' }
]

const estadosOptions = [
	{ value: '1', label: 'Activo' },
	{ value: '2', label: 'Inactivo' }
]

const industriasOptions = [
	{ value: '1', label: 'Mineria' },
	{ value: '2', label: 'Pesca' },
	{ value: '3', label: 'Agricultura' }
]

const regionesOptions = [
	{ value: '1', label: 'Metropolitana' },
	{ value: '2', label: 'Valparaiso' },
	{ value: '3', label: 'Bio Bio' },
	{ value: '4', label: 'Araucania' }
]

const configParameters: ConfigParameter[] = [
	{
		name: 'nombre',
		label: 'Nombre',
		type: 'input',
		placeholder: 'Nombre de la empresa',
		description: 'Nombre de la empresa'
	},
	{
		name: 'representanteLegal',
		label: 'Representante Legal',
		type: 'input',
		placeholder: 'Representante legal',
		description: 'Representante legal de la empresa'
	},
	{ name: 'rut', label: 'Rut', type: 'input', placeholder: 'Rut', description: 'Rut de la empresa' },
	{
		name: 'telefono',
		label: 'Telefono',
		type: 'input',
		placeholder: 'Telefono',
		description: 'Telefono de la empresa'
	},
	{ name: 'email', label: 'Email', type: 'input', placeholder: 'Email', description: 'Email de la empresa' },
	{
		name: 'direccion',
		label: 'Direccion',
		type: 'input',
		placeholder: 'Direccion',
		description: 'Direccion de la empresa'
	},
	{ name: 'ciudad', label: 'Ciudad', type: 'select', options: ciudadesOptions, description: 'Ciudad de la empresa' },
	{
		name: 'estado',
		label: 'Estado',
		type: 'select',
		options: estadosOptions,
		description: 'Estado de la empresa'
	},
	{
		name: 'industria',
		label: 'Industria',
		type: 'select',
		options: industriasOptions,
		description: 'Industria de la empresa'
	},
	{ name: 'region', label: 'Region', type: 'select', options: regionesOptions, description: 'Region de la empresa' }
]

export function EditEmpresaFormWrapper({
	empresa
}: {
	empresa: Record<string, any> // Initial values for pre-filling the form
}) {
	async function onSubmit(values: z.infer<typeof formSchema>) {
		toast(
			// show values
			JSON.stringify(values, null, 2)
		)
		// await updateEmpresa('1', values)
	}

	return (
		<EditTableEntryForm
			initialValues={empresa}
			configParameters={configParameters}
			onSubmit={onSubmit}
			tableSchema={formSchema}
		/>
	)
}

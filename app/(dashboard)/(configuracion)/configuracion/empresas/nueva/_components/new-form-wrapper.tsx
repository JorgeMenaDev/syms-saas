'use client'

import { TableEntryForm } from '@/components/TableEntryForm'
import { updateEmpresa } from '@/services/data/actions/server/empresas/editEmpresaById'
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

const selectOptions = [
	{ name: 'ciudad', options: ciudadesOptions },
	{ name: 'estado', options: estadosOptions },
	{ name: 'industria', options: industriasOptions }
]

export function NewEmpresaFormWrapper() {
	async function onSubmit(values: z.infer<typeof formSchema>) {
		await updateEmpresa('1', values)
	}

	return <TableEntryForm tableSchema={formSchema} selectOptions={selectOptions} onSubmit={onSubmit} />
}

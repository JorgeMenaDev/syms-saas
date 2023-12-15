import { type ConfigParameter } from '@/components/TableEntryForm'
import { z } from 'zod'

// this is really important, because is the order we have to follow.
// columns-wrapper follow this order.
export const transportistasColumns = [
	'Razon Social',
	'Rut',
	'Direccion',
	'Ciudad',
	'Region',
	'Representante Legal',
	'Estado',
	'Camiones',
	'Autorizacion'
]

export function createTransportistaFormSchema() {
	const formSchema = z.object({
		razonSocial: z.string().min(1, { message: 'La razon social es requerida.' }),
		rut: z.string().min(1, { message: 'El rut es requerido.' }),
		direccion: z.string().min(1, { message: 'La direccion es requerida.' }),
		ciudad: z.string().min(1, { message: 'La ciudad es requerida.' }),
		region: z.string().min(1, { message: 'La region es requerida.' }),
		representanteLegal: z.string().min(1, { message: 'El representante legal es requerido.' }),
		estado: z.string().min(1, { message: 'El estado es requerido.' }),
		camiones: z.string().min(1, { message: 'Los camiones son requeridos.' }),
		autorizacion: z.string().min(1, { message: 'La autorizacion es requerida.' })
	})

	return formSchema
}

export function composeTransportistaConfigParameters({
	regionesOptions,
	ciudadesOptions,
	camionesOptions
}: {
	regionesOptions: Array<{ value: string; label: string }>
	ciudadesOptions: Array<{ value: string; label: string; idRegion: string }>
	camionesOptions: Array<{ value: string; label: string }>
}) {
	const configParameters: ConfigParameter[] = [
		{
			name: 'razonSocial',
			label: 'Razon Social',
			type: 'input',
			placeholder: 'Razon Social',
			description: 'Razon Social de la empresa'
		},
		{
			name: 'rut',
			label: 'Rut',
			type: 'input',
			placeholder: 'Rut',
			description: 'Rut de la empresa'
		},
		{
			name: 'direccion',
			label: 'Direccion',
			type: 'input',
			placeholder: 'Direccion',
			description: 'Direccion de la empresa'
		},
		{
			name: 'ciudad',
			label: 'Ciudad',
			placeholder: 'Ciudad',
			type: 'select',
			options: ciudadesOptions,
			description: 'Ciudad de la empresa'
		},
		{
			name: 'region',
			placeholder: 'Region',
			label: 'Region',
			type: 'select',
			options: regionesOptions,
			description: 'Region de la empresa'
		},
		{
			name: 'representanteLegal',
			label: 'Representante Legal',
			type: 'input',
			placeholder: 'Representante legal',
			description: 'Representante legal de la empresa'
		},
		{
			name: 'estado',
			label: 'Estado',
			type: 'select',
			placeholder: 'Estado',
			options: [
				{
					value: 'activo',
					label: 'Activo'
				},
				{
					value: 'inactivo',
					label: 'Inactivo'
				}
			],
			description: 'Estado de la empresa'
		},
		{
			name: 'camiones',
			label: 'Camiones',
			type: 'select',
			placeholder: 'Camiones',
			options: camionesOptions,
			description: 'Camiones de la empresa'
		},
		{
			name: 'autorizacion',
			label: 'Autorizacion',
			type: 'input',
			placeholder: 'Autorizacion',
			description: 'Autorizacion de la empresa'
		}
	]

	return configParameters
}

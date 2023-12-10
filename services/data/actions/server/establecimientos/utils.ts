import { type ConfigParameter } from '@/components/TableEntryForm'
import { z } from 'zod'

// this is really important, because is the order we have to follow.
// columns-wrapper follow this order.
export const establecimientosColumns = [
	'Nombre',
	'Correo',
	'Telefono',
	'Direccion',
	'Encargado',
	'ID VU',
	'NOPEL',
	'RESPEL',
	'Tipo',
	'Region',
	'Ciudad'
]

export function composeEstablecimientoConfigParameters({
	regionesOptions,
	ciudadesOptions,
	tiposDeEstablecimientos
}: {
	regionesOptions: Array<{ value: string; label: string }>
	ciudadesOptions: Array<{ value: string; label: string }>
	tiposDeEstablecimientos: Array<{ value: string; label: string }>
}) {
	const configParameters: ConfigParameter[] = [
		{
			name: 'nombre',
			label: 'Nombre',
			type: 'input',
			inputType: 'text',
			placeholder: 'Nombre del establecimiento',
			description: 'Nombre del establecimiento'
		},
		{
			name: 'correo',
			label: 'Correo',
			type: 'input',
			inputType: 'email',
			placeholder: 'Correo',
			description: 'Correo electronico del Establecimiento'
		},
		{
			name: 'telefono',
			label: 'Telefono',
			type: 'input',
			inputType: 'text',
			placeholder: 'Telefono',
			description: 'Telefono del establecimiento'
		},
		{
			name: 'direccion',
			label: 'Direccion',
			type: 'input',
			inputType: 'text',
			placeholder: 'Direccion',
			description: 'Direccion del establecimiento'
		},
		{
			name: 'encargado',
			label: 'Encargado',
			type: 'input',
			inputType: 'text',
			placeholder: 'Encargado',
			description: 'Encargado del Establecimiento'
		},
		{
			name: 'id_vu',
			label: 'ID VU',
			type: 'input',
			inputType: 'number',
			placeholder: 'ID VU',
			description: 'ID VU del Establecimiento'
		},
		{
			name: 'nopel',
			label: 'NOPEL',
			type: 'select',
			placeholder: 'NOPEL',
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
			description: 'NOPEL del Establecimiento'
		},
		{
			name: 'respel',
			label: 'RESPEL',
			type: 'select',
			placeholder: 'RESPEL',
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
			description: 'RESPEL del Establecimiento'
		},
		{
			name: 'tipo',
			label: 'Tipo de Establecimiento',
			placeholder: 'Tipo de Establecimiento',
			type: 'select',
			options: tiposDeEstablecimientos,
			description: 'Tipo de Establecimiento'
		},

		{
			name: 'region',
			label: 'Region',
			type: 'select',
			placeholder: 'Region',
			options: regionesOptions,
			description: 'Region del establecimiento'
		},
		{
			name: 'ciudad',
			label: 'Ciudad',
			type: 'select',
			placeholder: 'Ciudad',
			options: ciudadesOptions,
			description: 'Ciudad del establecimiento'
		}
	]

	return configParameters
}

export function createEstablecimientosFormSchema() {
	const formSchema = z.object({
		direccion: z.string().min(1, {
			message: 'La direccion es requerida.'
		}),
		correo: z
			.string()
			.min(1, {
				message: 'El correo es requerido.'
			})
			.email({
				message: 'El correo debe ser valido.'
			}),
		ciudad: z.string().min(1, {
			message: 'La ciudad es requerida.'
		}),
		region: z.string().min(1, {
			message: 'La region es requerida.'
		}),
		nombre: z.string().min(1, {
			message: 'El nombre es requerido.'
		}),
		telefono: z.string().min(1, {
			message: 'El telefono es requerido.'
		}),
		encargado: z.string().min(1, {
			message: 'El encargado es requerido.'
		}),
		tipo: z.string().min(1, {
			message: 'El tipo de establecimiento es requerido.'
		}),
		id_vu: z.number({ coerce: true }).int().min(1, {
			message: 'El id vu es requerido.'
		}),
		nopel: z.string().min(1, {
			message: 'El nopel es requerido.'
		}),
		respel: z.string().min(1, {
			message: 'El respel es requerido.'
		})
	})

	return formSchema
}

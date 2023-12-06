import { type ConfigParameter } from '@/components/TableEntryForm'
import { z } from 'zod'

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
			placeholder: 'Nombre del establecimiento',
			description: 'Nombre del establecimiento'
		},
		{
			name: 'correo',
			label: 'Correo',
			type: 'input',
			placeholder: 'Correo',
			description: 'Correo electronico del Establecimiento'
		},
		{
			name: 'telefono',
			label: 'Telefono',
			type: 'input',
			placeholder: 'Telefono',
			description: 'Telefono del establecimiento'
		},
		{
			name: 'direccion',
			label: 'Direccion',
			type: 'input',
			placeholder: 'Direccion',
			description: 'Direccion del establecimiento'
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
			name: 'encargado',
			label: 'Encargado',
			type: 'input',
			placeholder: 'Encargado',
			description: 'Encargado del Establecimiento'
		},
		{
			name: 'tipo_establecimiento_id',
			label: 'Tipo de Establecimiento',
			placeholder: 'Tipo de Establecimiento',
			type: 'select',
			options: tiposDeEstablecimientos,
			description: 'Tipo de Establecimiento'
		},
		{
			name: 'id_vu',
			label: 'ID VU',
			type: 'input',
			placeholder: 'ID VU',
			description: 'ID VU del Establecimiento'
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
		tipo_establecimiento_id: z.string().min(1, {
			message: 'El tipo de establecimiento es requerido.'
		}),
		id_vu: z.string().min(1, {
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

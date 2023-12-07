import { type ConfigParameter } from '@/components/TableEntryForm'
import { z } from 'zod'

export function composeEmpresaConfigParameters({
	ciiusOptions,
	regionesOptions,
	ciudadesOptions
}: {
	ciiusOptions: Array<{ value: string; label: string }>
	regionesOptions: Array<{ value: string; label: string }>
	ciudadesOptions: Array<{ value: string; label: string; idRegion: string }>
}) {
	const configParameters: ConfigParameter[] = [
		{
			name: 'nombre',
			label: 'Nombre',
			type: 'input',
			placeholder: 'Nombre de la empresa',
			description: 'Nombre de la empresa'
		},
		{
			name: 'industria',
			label: 'Industria',
			type: 'input',
			placeholder: 'Industria',
			description: 'Industria de la empresa'
		},
		{ name: 'rut', label: 'Rut', type: 'input', placeholder: 'Rut', description: 'Rut de la empresa' },
		{
			name: 'representanteLegal',
			label: 'Representante Legal',
			type: 'input',
			placeholder: 'Representante legal',
			description: 'Representante legal de la empresa'
		},
		{ name: 'correo', label: 'Correo', type: 'input', placeholder: 'Correo', description: 'Correo de la empresa' },
		{
			name: 'telefono',
			label: 'Telefono',
			type: 'input',
			placeholder: 'Telefono',
			description: 'Telefono de la empresa'
		},
		{
			name: 'direccion',
			label: 'Direccion',
			type: 'input',
			placeholder: 'Direccion',
			description: 'Direccion de la empresa'
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
			name: 'ciiu',
			label: 'Ciiu',
			type: 'select',
			placeholder: 'Ciiu',
			options: ciiusOptions,
			description: 'Ciiu de la empresa'
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
			name: 'ciudad',
			label: 'Ciudad',
			placeholder: 'Ciudad',
			type: 'select',
			options: ciudadesOptions,
			description: 'Ciudad de la empresa'
		}
	]

	return configParameters
}

export function createEmpresaFormSchema() {
	const formSchema = z.object({
		direccion: z.string().min(1, {
			message: 'La direccion es requerida.'
		}),
		ciiu: z.string().min(1, {
			message: 'El ciiu es requerido.'
		}),
		correo: z
			.string()
			.min(1, {
				message: 'El email es requerido.'
			})
			.email({
				message: 'El email debe ser valido.'
			}),
		ciudad: z.string().min(1, {
			message: 'La ciudad es requerida.'
		}),
		estado: z.string().min(1, {
			message: 'El estado es requerido.'
		}),
		industria: z.string().min(1, {
			message: 'La industria es requerida.'
		}),
		region: z.string().min(1, {
			message: 'La region es requerida.'
		}),
		nombre: z.string().min(1, {
			message: 'El nombre es requerida.'
		}),
		representanteLegal: z.string().min(1, {
			message: 'El representante legal es requerido.'
		}),
		rut: z.string().min(1, {
			message: 'El rut es requerido.'
		}),
		telefono: z.string().min(9, {
			message: 'El telefono debe tener al menos 9 caracteres.'
		})
	})

	return formSchema
}

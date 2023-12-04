import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const fetchEmpresaById = async (id: string): Promise<{ empresa: any | null }> => {
	const supabase = createServerComponentClient<Database>({ cookies })

	const { data } = await supabase
		.from('empresas')
		.select(
			`
			*,
			industria: industria_id(nombre),
			region: region_id(nombre),
			ciudad: ciudad_id(nombre),
			estado: estado_id(nombre)
		`
		)
		.eq('id', id)

	if (!data || data.length === 0 || data?.[0] === null) {
		return {
			empresa: null
		}
	}

	const empresaDetails = data?.[0]

	console.log({ empresaDetails })

	const empresa = {
		id: empresaDetails.id,
		rut: empresaDetails.rut,
		nombre: empresaDetails.nombre,
		// @ts-expect-error supabase wasn't able to infer the type of this property
		industria: empresaDetails.industria_id,
		// @ts-expect-error supabase wasn't able to infer the type of this property
		ciiu: empresaDetails.ciiu_id.toString(),
		representanteLegal: empresaDetails.representante_legal,
		email: empresaDetails.email,
		telefono: empresaDetails.telefono,
		// @ts-expect-error supabase wasn't able to infer the type of this property
		direccion: empresaDetails.ubicacion,
		// @ts-expect-error supabase wasn't able to infer the type of this property
		region: empresaDetails.region_id.toString(),
		// @ts-expect-error supabase wasn't able to infer the type of this property
		ciudad: empresaDetails.ciudad_id.toString(),
		// @ts-expect-error supabase wasn't able to infer the type of this property
		estado: empresaDetails.estado_id
	}

	console.log({ empresa })

	return { empresa }
}

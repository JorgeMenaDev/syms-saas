import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const fetchEmpresaById = async (id: string): Promise<any | null> => {
	const supabase = createServerComponentClient<Database>({ cookies })
	const { data } = await supabase
		.from('empresas')
		.select(
			`*,
			region: region_id(nombre),
			ciudad: ciudad_id(nombre),
			ciiu: ciiu_id(codigo)
		`
		)
		.eq('id', id)

	if (!data || data.length === 0 || data?.[0] === null) {
		return null
	}

	const empresaDetails = data?.[0]

	const empresa = {
		id: empresaDetails.id,
		rut: empresaDetails.rut,
		nombre: empresaDetails.nombre,
		industria: empresaDetails.industria,
		ciiu: empresaDetails.ciiu_id.toString(),
		representanteLegal: empresaDetails.representante_legal,
		correo: empresaDetails.correo,
		telefono: empresaDetails.telefono,
		direccion: empresaDetails.direccion,
		region: empresaDetails.region_id.toString(),
		ciudad: empresaDetails.ciudad_id.toString(),
		estado: empresaDetails.estado
	}

	return empresa
}

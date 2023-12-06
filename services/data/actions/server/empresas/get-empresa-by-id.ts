import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const delay = async (ms: number) => await new Promise(res => setTimeout(res, ms))

export const fetchEmpresaById = async (id: string): Promise<any | null> => {
	// await delay(1000000000)

	const supabase = createServerComponentClient<Database>({ cookies })
	console.log({ id })
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

	console.log({ data })

	if (!data || data.length === 0 || data?.[0] === null) {
		return null
	}

	const empresaDetails = data?.[0]

	console.log({ empresaDetails })

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

	console.log({ empresa })

	return empresa
}

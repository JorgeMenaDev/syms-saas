import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const fetchEmpresas = async () => {
	const supabase = createServerComponentClient<Database>({ cookies })

	const { data, error } = await supabase.from('empresas').select(
		`*,
			region: region_id(nombre),
			ciudad: ciudad_id(nombre),
			ciiu: ciiu_id(codigo)
		`
	)

	if (error) {
		console.error(error)
		return null
	}

	console.log({ data })

	if (!data || data.length === 0) {
		return null
	}

	const empresas = data.map(empresa => {
		return {
			id: empresa.id,
			rut: empresa.rut,
			nombre: empresa.nombre,
			industria: empresa.industria,
			// @ts-expect-error supabase wasn't able to infer the type of this property
			ciiu: empresa.ciiu.codigo,
			representanteLegal: empresa.representante_legal,
			email: empresa.email,
			telefono: empresa.telefono,
			direccion: empresa.ubicacion,
			// @ts-expect-error supabase wasn't able to infer the type of this property
			region: empresa.region.nombre,
			// @ts-expect-error supabase wasn't able to infer the type of this property
			ciudad: empresa.ciudad.nombre,
			estado: empresa.estado
		}
	})

	console.log({ empresas })

	return empresas
}

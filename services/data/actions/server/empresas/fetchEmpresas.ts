import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { type Empresa } from '@/types/empresa'

export const fetchEmpresas = async (): Promise<{ empresas: Empresa[] | null }> => {
	const supabase = createServerComponentClient<Database>({ cookies })

	const { data: empresaDetails } = await supabase.from('empresas').select(
		`*,
			industria: industria_id(nombre),
			region: region_id(nombre),
			ciudad: ciudad_id(nombre),
			estado: estado_id(nombre),
			ciiu: ciiu_id(codigo)
			`
	)

	console.log({ empresaDetails })

	if (!empresaDetails || empresaDetails.length === 0) {
		return { empresas: null }
	}

	const data = empresaDetails.map(empresa => {
		return {
			id: empresa.id,
			rut: empresa.rut,
			nombre: empresa.nombre,
			// @ts-expect-error supabase wasn't able to infer the type of this property
			industria: empresa.industria.nombre,
			// @ts-expect-error supabase wasn't able to infer the type of this property
			ciiu: empresa.ciiu.codigo,
			representanteLegal: empresa.representante_legal,
			email: empresa.email,
			telefono: empresa.telefono,
			// @ts-expect-error supabase wasn't able to infer the type of this property
			direccion: empresa.ubicacion,
			// @ts-expect-error supabase wasn't able to infer the type of this property
			region: empresa.region.nombre,
			// @ts-expect-error supabase wasn't able to infer the type of this property
			ciudad: empresa.ciudad.nombre,
			// @ts-expect-error supabase wasn't able to infer the type of this property
			estado: empresa.estado.nombre
		}
	})

	console.log(data)

	return {
		empresas: data
	}
}

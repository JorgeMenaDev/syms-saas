import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function fetchTransportistas() {
	const supabase = createServerComponentClient<Database>({ cookies })

	const { data, error } = await supabase.from('transportistas').select(
		`*,
			region: region_id(nombre),
			ciudad: ciudad_id(nombre)
		`
	)

	console.log({ data, error })
	if (error) {
		console.error(error)
		return null
	}

	if (!data || data.length === 0) {
		return null
	}

	const transportistas = data.map(transportista => {
		const { razon_social, rut, direccion, region, ciudad, representante_legal, estado, autorizacion, camiones } =
			transportista

		return {
			razonSocial: razon_social,
			rut,
			direccion,
			// @ts-expect-error error
			region: region.nombre,
			// @ts-expect-error error
			ciudad: ciudad.nombre,
			representanteLegal: representante_legal,
			estado,
			autorizacion,
			camiones: camiones ?? 0
		}
	})

	console.log({ transportistas })

	return transportistas
}

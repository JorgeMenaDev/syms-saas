import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

type Transportista = Database['public']['Tables']['transportistas']['Row']

export const fetchTransportistaById = async (id: string): Promise<any | null> => {
	const supabase = createServerComponentClient<Database>({ cookies })

	const { data } = await supabase
		.from('transportistas')
		.select(
			`*,
			region: region_id(nombre),
			ciudad: ciudad_id(nombre)
		`
		)
		.eq('id', id)

	if (!data || data.length === 0 || data?.[0] === null) {
		return null
	}

	const transportista = transformTransportista(data[0])
	console.log({ transportista })

	return transportista
}

function transformTransportista(transportista: Transportista) {
	const {
		id,
		autorizacion,
		camiones,
		direccion,
		estado,
		representante_legal,
		razon_social,
		rut,
		ciudad_id,
		region_id
	} = transportista

	return {
		id,
		representanteLegal: representante_legal,
		autorizacion,
		camiones,
		ciudad: ciudad_id.toString(),
		direccion,
		estado,
		region: region_id.toString(),
		razonSocial: razon_social,
		rut
	}
}

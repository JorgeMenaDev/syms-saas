import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const fechEstablecimientoById = async (id: string) => {
	const supabase = createServerComponentClient<Database>({ cookies })
	const { data, error } = await supabase
		.from('establecimientos')
		.select(
			`*,
      region: region_id(nombre),
      ciudad: ciudad_id(nombre),
      tipo_establecimiento: tipo_establecimiento_id(nombre)
    `
		)
		.eq('id', id)

	if (!data || data.length === 0 || data?.[0] === null) {
		return null
	}

	const establecimientoDetails = data?.[0]

	const establecimiento = {
		id: establecimientoDetails.id,
		nombre: establecimientoDetails.nombre,
		correo: establecimientoDetails.correo,
		telefono: establecimientoDetails.telefono,
		direccion: establecimientoDetails.direccion,
		region: establecimientoDetails.region_id.toString(),
		ciudad: establecimientoDetails.ciudad_id.toString(),
		encargado: establecimientoDetails.encargado,
		nopel: establecimientoDetails.nopel,
		respel: establecimientoDetails.respel,
		id_vu: establecimientoDetails.id_vu,
		usuarios: establecimientoDetails.usuarios,
		tipo: establecimientoDetails.tipo_establecimiento_id
	}

	return establecimiento
}

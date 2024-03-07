import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const fetchEstablecimientos = async () => {
	const supabase = createServerComponentClient<Database>({ cookies })

	const { data, error } = await supabase.from('establecimientos').select(
		`*,
      region: region_id(nombre),
      ciudad: ciudad_id(nombre),
      tipo_establecimiento: tipo_establecimiento_id(nombre)
    `
	)

	if (error) {
		return null
	}

	if (!data || data.length === 0) {
		return null
	}

	const establecimientos = data.map(item => {
		return {
			id: item.id,
			nombre: item.nombre,
			tipo: item.tipo_establecimiento.nombre,
			direccion: item.direccion,
			ciudad: item.ciudad.nombre,
			region: item.region.nombre,
			encargado: item.encargado,
			correo: item.correo,
			telefono: item.telefono,
			nopel: item.nopel,
			respel: item.respel,
			id_vu: item.id_vu,
			usuarios: item.usuarios
		}
	})

	return establecimientos
}

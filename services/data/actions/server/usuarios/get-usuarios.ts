import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const fetchUsuarios = async () => {
	const supabase = createServerComponentClient<Database>({ cookies })

	const { data, error } = await supabase.from('usuarios').select(
		`*,
      tipo: tipo_de_usuario_id(nombre_tipo)
		`
	)

	if (error) {
		console.error(error)
		return null
	}

	if (!data || data.length === 0) {
		return null
	}

	const formattedData = data.map(item => {
		return {
			id: item.id,
			nombre: item.nombre,
			correo: item.email,
			telefono: item.telefono,
			tipo: item.tipo.nombre_tipo,
			empresas: item.empresas ?? 0,
			establecimientos: item.establecimientos ?? 0,
			usuario: item.usuario,
			accion: item.accion,
			activo: item.activo
		}
	})

	return formattedData
}

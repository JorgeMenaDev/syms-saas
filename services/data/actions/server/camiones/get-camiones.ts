import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

type Camion = Database['public']['Tables']['camiones']['Row']

export async function fetchCamioness() {
	const supabase = createServerComponentClient<Database>({ cookies })

	const { data, error } = await supabase.from('camiones').select()

	if (error) {
		console.error(error)
		return null
	}

	if (!data || data.length === 0) {
		return null
	}

	const camiones = data.map(transformCamionData)

	return camiones
}

export async function fetchCamionesByTransportistaId(id: string) {
	const supabase = createServerComponentClient<Database>({ cookies })

	const { data, error } = await supabase.from('transportistas').select().eq('id', id)

	if (error) {
		console.error(error)
		return null
	}

	if (!data || data.length === 0) {
		return null
	}

	const ids = data.map(item => item.camiones)

	const { data: camionesData } = await supabase.from('camiones').select().in('id', ids)

	if (!camionesData || camionesData.length === 0) {
		return null
	}

	const camiones = camionesData.map(transformCamionData)

	return camiones
}

function transformCamionData(vehicle: Camion) {
	const {
		id,
		created_at,
		resolucion,
		año_resolucion,
		autoridad,
		rut,
		representante_legal,
		correo,
		telefono,
		camion,
		modelo,
		año_camion,
		patente,
		capacidad_carga,
		vigencia,
		estado,
		autoriza,
		comentario,
		documento
	} = vehicle

	return {
		id,
		created_at,
		resolucion,
		añoResolucion: año_resolucion,
		autoridad,
		rut,
		representanteLegal: representante_legal,
		correo,
		telefono,
		camion,
		modelo,
		añoCamion: año_camion,
		patente,
		capacidad: capacidad_carga,
		vigencia,
		estado,
		autoriza,
		comentario,
		documento
	}
}

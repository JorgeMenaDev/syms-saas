'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function fetchCamionesClientByIds(ids: string[]) {
	console.log({ ids })
	const supabase = createClientComponentClient<Database>()

	const { data, error } = await supabase.from('camiones').select().in('id', ids)

	console.log({ data, error })
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

function transformCamionData(vehicle: any) {
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

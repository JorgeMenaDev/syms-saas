'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// this is the type to insert a new row <- from supabase
type Establecimiento = Database['public']['Tables']['establecimientos']['Insert']

export async function createEstablecimiento(values: any) {
	console.log({ values })
	const supabase = createServerComponentClient<Database>({ cookies })

	// transform values to match database schema
	const establecimiento: Establecimiento = {
		ciudad_id: Number(values.ciudad),
		nombre: values.nombre,
		telefono: values.telefono,
		region_id: Number(values.region),
		correo: values.correo,
		direccion: values.direccion,
		encargado: values.encargado,
		id_vu: Number(values.id_vu),
		nopel: values.nopel === 'activo',
		respel: values.respel === 'activo',
		tipo_establecimiento_id: values.tipo_establecimiento_id
	}

	console.log({ establecimiento })

	try {
		const { error } = await supabase.from('establecimientos').insert(establecimiento)
		if (error) {
			console.log({ error })
			if (error.message.includes('establecimientos_id_vu_key')) return { error: 'El ID VU ya existe.' }
			return { error: 'Si el problema persiste, contacte a soporte.' }
		}

		return { error: null }
	} catch (error) {
		console.log({ error })
		return { error: 'Si el problema persiste, contacte a soporte.' }
	}
}

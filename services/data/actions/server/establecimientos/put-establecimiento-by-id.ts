'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// this is the type to update a row <- from supabase
type Establecimiento = Database['public']['Tables']['establecimientos']['Update']

export async function updateEstablecimiento(id: string, values: any) {
	console.log({ id, values })
	const supabase = createServerComponentClient<Database>({ cookies })

	// transform values to match database schema
	const establecimiento: Establecimiento = {
		ciudad_id: Number(values.ciudad),
		correo: values.correo,
		nombre: values.nombre,
		telefono: values.telefono,
		direccion: values.direccion,
		region_id: Number(values.region)
	}

	console.log({ establecimiento })

	try {
		const { error } = await supabase.from('establecimientos').update(establecimiento).eq('id', id)
		if (error) {
			console.log({ error })
			// if (error.message.includes('establecimientos_id_vu_key')) return { error: 'El RUT ya existe.' }
			return { error: 'Si el problema persiste, contacte a soporte.' }
		}

		return { error: null }
	} catch (error) {
		console.log({ error })
		return { error: 'Si el problema persiste, contacte a soporte.' }
	}
}

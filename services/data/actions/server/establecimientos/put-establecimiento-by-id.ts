'use server'

import { handleSupabaseError } from '@/lib/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

// this is the type to update a row <- from supabase
type Establecimiento = Database['public']['Tables']['establecimientos']['Update']

export async function updateEstablecimiento(id: string, values: any) {
	const supabase = createServerComponentClient<Database>({ cookies })

	// transform values to match database schema
	const establecimiento: Establecimiento = {
		ciudad_id: Number(values.ciudad),
		correo: values.correo,
		nombre: values.nombre,
		telefono: values.telefono,
		direccion: values.direccion,
		region_id: Number(values.region),
		encargado: values.encargado,
		tipo_establecimiento_id: values.tipo,
		id_vu: Number(values.id_vu),
		nopel: values.nopel === 'activo',
		respel: values.respel === 'activo'
	}

	try {
		const { error } = await supabase.from('establecimientos').update(establecimiento).eq('id', id)
		if (error) return handleSupabaseError(error)

		// revalidate cache for this path
		revalidatePath('/configuracion/establecimientos')

		// return null if no error
		return { error: null }
	} catch (error) {
		return handleSupabaseError(error)
	}
}

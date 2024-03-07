'use server'

import { handleSupabaseError } from '@/lib/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

// this is the type to update a row <- from supabase
type Transportista = Database['public']['Tables']['transportistas']['Update']

export async function updateTransportista(id: string, values: any): Promise<{ error: string | null }> {
	const supabase = createServerComponentClient<Database>({ cookies })

	// transform values to match database schema
	// TODO: add camiones, etc
	const transportista: Transportista = {
		ciudad_id: Number(values.ciudad),
		estado: values.estado === 'activo',
		representante_legal: values.representanteLegal,
		rut: values.rut,
		direccion: values.direccion,
		region_id: Number(values.region)
	}

	try {
		const { error } = await supabase.from('transportistas').update(transportista).eq('id', id)
		if (error) return handleSupabaseError(error)

		// revalidate cache for this path
		revalidatePath('/configuracion/transportes')

		// return null if no error
		return { error: null }
	} catch (error) {
		return handleSupabaseError(error)
	}
}

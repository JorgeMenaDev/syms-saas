'use server'

import { handleSupabaseError } from '@/lib/supabase'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

// this is the type to update a row <- from supabase
type Empresa = Database['public']['Tables']['empresas']['Update']

export async function updateEmpresa(id: string, values: any): Promise<{ error: string | null }> {
	const supabase = createServerComponentClient<Database>({ cookies })

	// transform values to match database schema
	const empresa: Empresa = {
		ciiu_id: values.ciiu,
		ciudad_id: Number(values.ciudad),
		correo: values.correo,
		estado: values.estado === 'activo',
		industria: values.industria,
		nombre: values.nombre,
		representante_legal: values.representanteLegal,
		rut: values.rut,
		telefono: values.telefono,
		direccion: values.direccion,
		region_id: Number(values.region)
	}

	try {
		const { error } = await supabase.from('empresas').update(empresa).eq('id', id)
		if (error) return handleSupabaseError(error)

		// revalidate cache for this path
		revalidatePath('/configuracion/empresas')

		// return null if no error
		return { error: null }
	} catch (error) {
		return handleSupabaseError(error)
	}
}

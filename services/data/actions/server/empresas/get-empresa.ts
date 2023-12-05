'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

type Empresa = Database['public']['Tables']['empresas']['Insert']

export async function createEmpresa(values: any): Promise<{ error: string | null }> {
	const supabase = createServerComponentClient<Database>({ cookies })

	console.log({ values })

	// transform values to match database schema
	const valuesTransformed: Empresa = {
		ciiu_id: values.ciiu,
		ciudad_id: Number(values.ciudad),
		email: values.email,
		estado: values.estado === 'activo',
		industria: values.industria,
		nombre: values.nombre,
		representante_legal: values.representanteLegal,
		rut: values.rut,
		telefono: values.telefono,
		ubicacion: values.direccion,
		region_id: Number(values.region)
	}

	console.log({ valuesTransformed })

	try {
		const { error } = await supabase.from('empresas').insert(valuesTransformed)
		if (error) {
			console.log({ error })
			if (error.message.includes('empresas_rut_key')) return { error: 'El RUT ya existe.' }
			return { error: 'Si el problema persiste, contacte a soporte.' }
		}

		return { error: null }
	} catch (error) {
		console.log({ error })
		return { error: 'Si el problema persiste, contacte a soporte.' }
	}
}

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const fetchRegiones = async (): Promise<{ regiones: any | null }> => {
	const supabase = createServerComponentClient<Database>({ cookies })

	const { data } = await supabase.from('regiones').select()

	if (!data || data.length === 0) {
		return {
			regiones: null
		}
	}

	const regiones = data.map(region => ({ value: region.id, label: region.nombre }))

	console.log({ regiones })

	return { regiones }
}

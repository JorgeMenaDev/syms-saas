import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const fetchCiudades = async (): Promise<{ ciudades: any | null }> => {
	const supabase = createServerComponentClient<Database>({ cookies })

	const { data } = await supabase.from('ciudades').select()

	if (!data || data.length === 0) {
		return {
			ciudades: null
		}
	}

	const ciudades = data.map(city => ({ value: city.id, label: city.nombre }))

	console.log({ ciudades })

	return { ciudades }
}

export const fetchCiudadesByRegionId = async (regionId: string): Promise<{ ciudades: any | null }> => {
	const supabase = createServerComponentClient<Database>({ cookies })

	const { data } = await supabase.from('ciudades').select().eq('region_id', regionId)

	if (!data || data.length === 0) {
		return {
			ciudades: null
		}
	}

	const ciudades = data.map(city => ({ value: city.id, label: city.nombre }))

	console.log({ ciudades })

	return { ciudades }
}

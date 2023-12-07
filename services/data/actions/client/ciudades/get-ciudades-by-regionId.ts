import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export async function fetchCitiesForRegion(regionId: number) {
	const supabase = createClientComponentClient<Database>()

	const { data: ciudades } = await supabase.from('ciudades').select().eq('id_region', regionId)

	if (!ciudades || ciudades.length === 0) return null

	const ciudadesForSelect = ciudades.map(city => ({ value: city.id.toString(), label: city.nombre }))

	return ciudadesForSelect
}

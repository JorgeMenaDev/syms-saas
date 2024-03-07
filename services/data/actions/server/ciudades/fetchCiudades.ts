import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const fetchCiudades = async () => {
	const supabase = createServerComponentClient<Database>({ cookies })

	const { data: ciudades } = await supabase.from('ciudades').select()

	if (!ciudades || ciudades.length === 0) return null

	return ciudades
}

/**
 * 	Function de utilidad, para obtener las ciudades en formato para select/dropdowns
 */
export const fetchCiudadesForSelect = async () => {
	const ciudades = await fetchCiudades()
	if (!ciudades) return null

	const ciudadesForSelect = ciudades.map(city => ({
		value: city.id.toString(),
		label: city.nombre,
		idRegion: city.id_region.toString()
	}))

	// sort city options by name by alphabetical order.
	const sortedArray = ciudadesForSelect.toSorted((a, b) => a.label.localeCompare(b.label))

	return sortedArray
}

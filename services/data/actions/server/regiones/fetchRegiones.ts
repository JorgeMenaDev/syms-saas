import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const fetchRegiones = async (): Promise<any[] | null> => {
	const supabase = createServerComponentClient<Database>({ cookies })

	const { data: regiones } = await supabase.from('regiones').select()

	if (!regiones || regiones.length === 0) {
		return null
	}

	return regiones
}

/**
 * 	Function de utilidad, para obtener las regiones en formato para select/dropdowns
 */
export const fetchRegionesForSelect = async () => {
	const regiones = await fetchRegiones()
	if (!regiones) return null

	const regionesForSelect = regiones.map(region => ({ value: region.id.toString(), label: region.nombre }))

	return regionesForSelect
}

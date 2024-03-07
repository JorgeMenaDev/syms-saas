import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const fetchTiposDeEstablecimientos = async () => {
	const supabase = createServerComponentClient<Database>({ cookies })

	const { data: ciius } = await supabase.from('tipoEstablecimientos').select('*')

	if (!ciius || ciius.length === 0) return null

	return ciius
}
/**
 * 	Function de utilidad, para obtener las ciius en formato para select/dropdowns
 */
export const fetchTiposDeEstablecimientosForSelect = async () => {
	const tiposDeEstablecimientos = await fetchTiposDeEstablecimientos()
	if (!tiposDeEstablecimientos) return null

	const tiposDeEstablecimientosForSelect = tiposDeEstablecimientos.map(ciiu => ({ value: ciiu.id, label: ciiu.nombre }))

	return tiposDeEstablecimientosForSelect
}

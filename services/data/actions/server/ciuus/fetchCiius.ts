import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const fetchCiius = async () => {
	const supabase = createServerComponentClient<Database>({ cookies })

	const { data: ciius } = await supabase.from('ciius').select('*')

	if (!ciius || ciius.length === 0) return null

	return ciius
}
/**
 * 	Function de utilidad, para obtener las ciius en formato para select/dropdowns
 */
export const fetchCiiusForSelect = async () => {
	const ciius = await fetchCiius()
	if (!ciius) return null

	const ciiusForSelect = ciius.map(ciiu => ({ value: ciiu.id, label: ciiu.nombre }))

	return ciiusForSelect
}

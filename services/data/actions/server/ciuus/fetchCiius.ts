import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const fetchCiius = async (): Promise<{ ciius: any | null }> => {
	const supabase = createServerComponentClient<Database>({ cookies })

	const { data } = await supabase.from('ciius').select('*')

	if (!data || data.length === 0) {
		return { ciius: null }
	}

	const ciius = data.map(ciiu => ({ value: ciiu.id.toString(), label: ciiu.codigo }))

	return {
		ciius
	}
}

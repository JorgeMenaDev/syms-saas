import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const fetchIndustrias = async (): Promise<{ industrias: any | null }> => {
	const supabase = createServerComponentClient<Database>({ cookies })

	const { data } = await supabase.from('industrias').select()

	if (!data || data.length === 0) {
		return {
			industrias: null
		}
	}

	const industrias = data.map(industry => ({ value: industry.id.toString(), label: industry.nombre }))

	console.log({ industrias })

	return { industrias }
}

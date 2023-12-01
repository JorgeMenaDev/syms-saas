'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function updateEmpresa(id: string, values: any) {
	const supabase = createServerComponentClient<Database>({ cookies })

	try {
		const { data, error } = await supabase.from('empresas').update(values).eq('id', id).select()

		console.log({ data, error })
		if (error) console.error(error)
		return {
			data,
			error: error?.message
		}
	} catch (error) {
		console.error(error)
		return {
			data: null,
			error: error?.message
		}
	}
}

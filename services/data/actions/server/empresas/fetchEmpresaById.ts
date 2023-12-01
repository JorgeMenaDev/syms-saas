import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// const { data } = await supabase.from('tweets').select('*, author: profiles(*), likes(user_id)')
export const fetchEmpresaById = async (id: string) => {
	const supabase = createServerComponentClient<Database>({ cookies })

	const { data } = await supabase.from('empresas').select().eq('id', id)

	return {
		empresa: data?.[0] ?? null
	}
}

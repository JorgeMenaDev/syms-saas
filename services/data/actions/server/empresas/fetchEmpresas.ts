import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// const { data } = await supabase.from('tweets').select('*, author: profiles(*), likes(user_id)')
export const fetchEmpresas = async () => {
	const supabase = createServerComponentClient<Database>({ cookies })

	const { data } = await supabase.from('empresas').select()

	return {
		empresas: data
	}
}

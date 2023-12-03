import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const fetchEstadoDeEmpresas = async (): Promise<{ estados: any | null }> => {
	const supabase = createServerComponentClient<Database>({ cookies })

	const { data } = await supabase.from('estadoEmpresas').select()

	if (!data || data.length === 0) {
		return {
			estados: null
		}
	}

	const estados = data.map(state => ({ value: state.id, label: state.nombre }))

	console.log({ estados })

	return { estados }
}

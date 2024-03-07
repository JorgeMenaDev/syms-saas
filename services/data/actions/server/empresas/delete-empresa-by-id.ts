'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function deleteEmpresaById(id: string) {
	const supabase = createServerComponentClient<Database>({ cookies })

	const { status, data, error } = await supabase.from('empresas').delete().eq('id', id)

	if (error) return { ok: false }

	// revalidate cache for this path
	revalidatePath('/configuracion/empresas')

	return { ok: true }
}
